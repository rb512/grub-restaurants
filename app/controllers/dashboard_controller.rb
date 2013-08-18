class DashboardController < ApplicationController
  before_filter :authenticate_owner!
  # def authenticate
#     @user = UserRestaurant.authenticate(params[:user_name],params[:password])
#     respond_to do |format|
#       format.html {@user}
#       format.json {@user}
#     end
#   end
  
  def my_account
    current_owner.ensure_authentication_token!
    @auth_token = current_owner.authentication_token
  end
  
  def home
    @order_count = 0
    @order_sales = 0.0
    @servers = {}
    current_owner.restaurants.each do |restaurant| 
      @order_count += restaurant.orders.count
      restaurant.orders.each {|order| @order_sales += order.total}
      @servers = restaurant.employees.where(:category => 'Server')
    end
  end
  
end











































