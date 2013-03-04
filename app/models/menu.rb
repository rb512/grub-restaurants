class Menu < ActiveRecord::Base
  has_many :menu_items
  accepts_nested_attributes_for :menu_items, :reject_if => :all_blank, :allow_destroy => true
  attr_accessible :menu_type, :name, :menu_items_attributes
  validates_uniqueness_of :name
  validates_presence_of :menu_type, :name
end
