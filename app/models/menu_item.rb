class MenuItem < ActiveRecord::Base
  belongs_to :menu
  attr_accessible :category, :description, :menu_id, :name, :price

end
