class Tablet < ActiveRecord::Base
  belongs_to :restaurant
  attr_accessible :restaurant_id, :unique_id, :wifi_name
end
