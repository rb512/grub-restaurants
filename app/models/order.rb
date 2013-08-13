class Order < ActiveRecord::Base
  belongs_to :restaurant
  has_many :order_items
  attr_accessible :restaurant_id, :server_id, :tablet_id, :total, :user_id
end
