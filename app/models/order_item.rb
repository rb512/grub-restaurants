class OrderItem < ActiveRecord::Base
  belongs_to :order
  belongs_to :menu_item
  attr_accessible :menu_item_id, :name, :order_id, :quantity
end
