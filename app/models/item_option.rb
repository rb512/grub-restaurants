class ItemOption < ActiveRecord::Base
  belongs_to :menu_item
  attr_accessible :size, :price
end
