class Menu < ActiveRecord::Base
  has_many :menu_items
  attr_accessible :menu_type, :name, :menu_items_attributes
  accepts_nested_attributes_for :menu_items
  validates_uniqueness_of :name
  validates_presence_of :menu_type, :name
end
