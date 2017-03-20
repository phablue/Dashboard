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
  # write the results of zd_data to a file and then for testing just read from that file instead of pulling data every time
  # File.open('./zd_data.json', 'w') { |file| file.write(zd_data)

  zd_data.to_json
end

def self.get_test_tickets
  filez = File.read("./zd_data")
  JSON.parse(filez)
end
