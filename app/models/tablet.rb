class Tablet < ActiveRecord::Base
  belongs_to :owner
  belongs_to :restaurant
  attr_accessible :ip_address, :is_server, :owner_id, :restaurant_id, :serial_no
end
