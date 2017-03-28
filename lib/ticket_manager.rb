require 'date'
require 'pry'

class TicketManager
  def initialize(client)
    @client = client
    @support_tickets = {
      'status_total' => {
        'new' => { 'ho' => 0 , 'tmc' => 0 },
        'solved' => { 'ho' => 0 , 'tmc' => 0 }
      },
      'status_daily' => {
        'new' => { 'ho' => {} , 'tmc' => {} },
        'solved' => { 'ho' => {} , 'tmc' => {} }
      },
      'satisfaction_total' => {
        'ho' => { 'total' => 0, 'bad' => 0, 'good' => 0 , 'offered' => 0 },
        'tmc' => { 'total' => 0, 'bad' => 0, 'good' => 0 , 'offered' => 0 },
      },
      'first_reply_status' => {
        'ho' => { 'total' => 0, '0-1' => 0, '1-8' => 0 , '8-24' => 0, '24+' => 0 },
        'tmc' => { 'total' => 0, '0-1' => 0, '1-8' => 0 , '8-24' => 0, '24+' => 0 },
      },
      'ho' => [],
      'tmc' => [],
      'comments' => []
    }
  end

  def get_tickets
    minimum_date = (Date.parse(Time.now.to_s) - 7).strftime("%Y-%m-%d")

    tickets = @client.search(:query => "updated>=#{minimum_date} type:ticket group:Support*")

    tickets.all do |ticket|
      if is_good_comment(ticket)
        @support_tickets['comments'] << ticket.satisfaction_rating.comment
      elsif is_ho_tickets_in_last_7days(ticket)
        generate(ticket, 'ho')
      elsif is_tmc_tickets_in_last_7days(ticket)
        generate(ticket, 'tmc')
      end
    end
    sort_daily_status
    calculate_ratio
    @support_tickets
  end

  def calculate_ratio
    parent_keys = ['first_reply_status', 'satisfaction_total']
    groups = ['tmc', 'ho']

    parent_keys.each do | parent_key |
      groups.each do |group|
        if parent_key == 'satisfaction_total'
          group_total =  @support_tickets[parent_key][group]['total']
          calculate_percentage(parent_key, group, group_total)
        else
          group_total = @support_tickets[parent_key][group]['total']
          calculate_percentage(parent_key, group, group_total)
        end
      end
    end
  end

  def calculate_percentage(parent_key, group, group_total)

    @support_tickets[parent_key][group].each do |key, value|
      @support_tickets[parent_key][group][key] = group_total > 0 ? (value / group_total.to_f * 100).round(2) : 0
    end
  end

  def sort_daily_status
    @support_tickets['status_daily']['new']['tmc'] = @support_tickets['status_daily']['new']['tmc'].sort.to_h
    @support_tickets['status_daily']['new']['ho'] = @support_tickets['status_daily']['new']['ho'].sort.to_h
    @support_tickets['status_daily']['solved']['tmc'] = @support_tickets['status_daily']['solved']['tmc'].sort.to_h
    @support_tickets['status_daily']['solved']['ho'] = @support_tickets['status_daily']['solved']['ho'].sort.to_h
  end

  def generate(ticket, group)
    @support_tickets[group] << ticket

    ticket_first_reply = ticket.metrics.reply_time_in_minutes
    @support_tickets[group].last['reply_time_in_minutes'] = ticket_first_reply

		if is_solved(ticket)
			@support_tickets['status_total']['solved'][group] += 1
			categorize_date(ticket.updated_at, 'solved', group)
			categorize_satisfaction(ticket.satisfaction_rating.score, group)
		end

    if is_new(ticket)
      @support_tickets['status_total']['new'][group] += 1

      unless ticket_first_reply.business == nil
        categorize_first_reply(ticket_first_reply.business, group)
      end

      categorize_date(ticket.created_at, 'new', group)
    end
  end

  def categorize_date(date, type, group)
    key = date.getlocal.strftime("%Y-%m-%d")

    if (@support_tickets['status_daily'][type][group][key])
      @support_tickets['status_daily'][type][group][key] += 1
    else
			create_date_key(group, key)
      @support_tickets['status_daily'][type][group][key] = 1
    end
  end

	def create_date_key(group, key)
    @support_tickets['status_daily']['new'][group][key] = 0
    @support_tickets['status_daily']['solved'][group][key] = 0
	end

  def categorize_first_reply(ticket_first_reply_min, group)
    first_reply_hour = ticket_first_reply_min / 60
    @support_tickets['first_reply_status'][group]['total'] += 1

    if first_reply_hour < 1
      @support_tickets['first_reply_status'][group]['0-1'] += 1
    elsif first_reply_hour < 8
      @support_tickets['first_reply_status'][group]['1-8'] += 1
    elsif first_reply_hour < 24
      @support_tickets['first_reply_status'][group]['8-24'] += 1
    else
      @support_tickets['first_reply_status'][group]['24+'] += 1
    end
  end

  def categorize_satisfaction(ticket_satisfaction, group)
    if ticket_satisfaction == 'offered'
      @support_tickets['satisfaction_total'][group]['total'] += 1
      @support_tickets['satisfaction_total'][group]['offered'] += 1
    elsif ticket_satisfaction == 'good'
      @support_tickets['satisfaction_total'][group]['total'] += 1
      @support_tickets['satisfaction_total'][group]['good'] += 1
    elsif ticket_satisfaction == 'bad'
      @support_tickets['satisfaction_total'][group]['total'] += 1
      @support_tickets['satisfaction_total'][group]['bad'] += 1
    end
  end

  def is_solved(ticket)
    now = Date.parse(Time.now.to_s)
    min_date = now - 7
    updated_date = Date.parse(ticket.updated_at.getlocal.to_s)

    (ticket.status == 'solved' || ticket.status == 'closed')  && (updated_date >= min_date && updated_date < now)
  end

	def is_new(ticket)
    is_in_last_7days(ticket.created_at, false)
	end

  def is_in_last_7days(created_time, updated_time)
    now = Date.parse(Time.now.to_s)
    min_date = now - 7
    created_date = Date.parse(created_time.getlocal.to_s)

    if updated_time
      updated_date = Date.parse(updated_time.getlocal.to_s)
      return created_date < now || ( updated_date >= min_date && updated_date < now )
    end

    created_date >= min_date && created_date < now
  end

  def is_ho_tickets_in_last_7days(ticket)
    #"id"=>25906657, "name"=>"Support - HO"
    ticket.group_id == 25906657 && is_in_last_7days(ticket.created_at, ticket.updated_at)
  end

  def is_tmc_tickets_in_last_7days(ticket)
    #"id"=>25931578, "name"=>"Support - TMC"
    ticket.group_id == 25931578 && is_in_last_7days(ticket.created_at, ticket.updated_at)
  end

  def is_good_comment(ticket)
    is_tune_support_tickets(ticket.group_id) && has_good_comment(ticket.satisfaction_rating)
  end

  def is_tune_support_tickets(ticket_group_id)
    ticket_group_id == 25906657 || ticket_group_id == 25931578
  end

  def has_good_comment(ticket_satisfaction)
    ticket_satisfaction.score.include?('good') && ticket_satisfaction.comment != nil
  end
end
