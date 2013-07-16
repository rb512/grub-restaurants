module ApplicationHelper

  def get_restaurant(id)
    restaurant = Restaurant.find(id)
    restaurant.name
  end
end
