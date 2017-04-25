require 'sinatra'
require 'pry'
require 'json'
require_relative 'app/config/zendesk'
require_relative 'ticket_manager'

set :root, 'lib/app'

get '/' do
  render :html, :index
end

get '/zd_data' do
  client = ZendeskAPIClient.create_client
  zd_data = TicketManager.new(client).get_tickets
  zd_data.to_json
end
