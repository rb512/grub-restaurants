class Restaurant < ActiveRecord::Base
  belongs_to :owner
  has_many :tablets
  has_many :employees
  has_many :orders
  has_many :stations
  attr_accessible :address, :city, :country, :email, :menu_id, :name, :owner_id, :phone, :state, :zip, :stations_attributes
  accepts_nested_attributes_for :stations
  validates_presence_of :address, :city, :country, :email, :name, :owner_id, :phone, :state
  validates :zip, :presence => true, :numericality => {:only_integer => true}
  
  def get_menus()
    menus = []
    if self.owner.menus.empty?
      menus = [" "]
    else
      self.owner.menus.each {|menu| menus << menu.name}
    end
  end
    
end
