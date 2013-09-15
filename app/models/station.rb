class Station < ActiveRecord::Base
  belongs_to :restaurant
  attr_accessible :name, :printer_ip, :menu_id, :restaurant_id
  
  def get_menu()
    return name = Menu.find(self.menu_id).name
  end
end
