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
        'ho' => { 'bad' => 0, 'good' => 0 , 'offered' => 0 },
        'tmc' => { 'bad' => 0, 'good' => 0 , 'offered' => 0 },
      },
      'first_reply_status' => {
        'ho' => { '0-1' => 0, '1-8' => 0 , '8-24' => 0, '24+' => 0 },
        'tmc' => { '0-1' => 0, '1-8' => 0 , '8-24' => 0, '24+' => 0 },
      },
      'ho' => [],
      'tmc' => [],
      'comments' => []
    }
  end

  def get_tickets
    minimum_date = Date.parse(Time.now.to_s).prev_month.strftime("%Y-%m-01")

    tickets = @client.search(:query => "created>=#{minimum_date} type:ticket group:Support*")

    tickets.all do |ticket|
      if has_good_comment_on_previous_month(ticket)
        @support_tickets['comments'] << ticket.satisfaction_rating.comment
      elsif is_ho_tickets_in_last_7days(ticket)
        generate(ticket, 'ho')
      elsif is_tmc_tickets_in_last_7days(ticket)
        generate(ticket, 'tmc')
      end
    end

    @support_tickets
  end

  def generate(ticket, group)
    @support_tickets[group] << ticket

    @support_tickets['status_total']['new'][group] += 1
    categorize_created_date(ticket.created_at, 'new', group)

    ticket_first_reply = ticket.metrics.reply_time_in_minutes

    @support_tickets[group].last['reply_time_in_minutes'] = ticket_first_reply

    unless ticket_first_reply.business == nil
      categorize_first_reply(ticket_first_reply.business, group)
    end

    if is_solved(ticket)
      @support_tickets['status_total']['solved'][group] += 1
      categorize_created_date(ticket.created_at, 'solved', group)
      categorize_satisfaction(ticket.satisfaction_rating.score, group)
    end
  end

  def categorize_created_date(ticket_created_time, type, group)
    key = ticket_created_time.getlocal.strftime("%Y-%m-%d")

    if (@support_tickets['status_daily'][type][group][key])
      @support_tickets['status_daily'][type][group][key] += 1
    else
      @support_tickets['status_daily'][type][group][key] = 1
    end
  end

  def categorize_first_reply(ticket_first_reply_min, group)
    first_reply_hour = ticket_first_reply_min / 60

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
      @support_tickets['satisfaction_total'][group]['offered'] += 1
    elsif ticket_satisfaction == 'good'
      @support_tickets['satisfaction_total'][group]['good'] += 1
    elsif ticket_satisfaction == 'bad'
      @support_tickets['satisfaction_total'][group]['bad'] += 1
    end
  end

  def is_solved(ticket)
    ticket.status == 'solved' || ticket.status == 'closed'
  end

  def is_in_last_7days(created_time)
    now_utc = Date.parse(Time.now.utc.to_s)
    min_date = now_utc - 7
    created_date = Date.parse(created_time.to_s)

    created_date >= min_date
  end

  def is_ho_tickets_in_last_7days(ticket)
    #"id"=>25906657, "name"=>"Support - HO"
    ticket.group_id == 25906657 && is_in_last_7days(ticket.created_at)
  end

  def is_tmc_tickets_in_last_7days(ticket)
    #"id"=>25931578, "name"=>"Support - TMC"
    ticket.group_id == 25931578 && is_in_last_7days(ticket.created_at)
  end

  def has_good_comment_on_previous_month(ticket)
    is_tune_support_tickets(ticket.group_id) && is_previous_month(ticket.created_at) && has_good_comment(ticket.satisfaction_rating)
  end

  def is_previous_month(created_time)
    previous_month = Date.parse(Time.now.to_s).prev_month.month
    created_month = Date.parse(created_time.getlocal.to_s).month

    created_month == previous_month
  end

  def is_tune_support_tickets(ticket_group_id)
    ticket_group_id == 25906657 || ticket_group_id == 25931578
  end

  def has_good_comment(ticket_satisfaction)
    ticket_satisfaction.score.include?('good') && ticket_satisfaction.comment != nil
  end
end
