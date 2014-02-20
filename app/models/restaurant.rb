class Restaurant < ActiveRecord::Base
  belongs_to :owner
  has_many :tablets
  has_many :employees
  has_many :orders
  has_many :stations
  attr_accessible :location,:email, :menu_id, :name, :owner_id, :phone, :stations_attributes
  # accepts_nested_attributes_for :stations
  validates_presence_of :location, :email, :name, :owner_id, :phone
  
  def get_menus()
    menus = []
    if self.owner.menus.empty?
      menus = [" "]
    else
      self.owner.menus.each {|menu| menus << menu.name}
    end
  end
    
end
