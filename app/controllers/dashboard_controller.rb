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
    @auth_token = current_owner.authentication_token
  end
  
  def home
    @restaurants = current_owner.restaurants
    if @restaurants.blank?
      @orders = [] 
      @order_total = 0
      no_record = {label: "No Orders", value: 0}
      @orders_by_tablet = []
      @order_by_category = []
      @orders_by_tablet << no_record
      @order_by_category << no_record
    else
      create_dashboard
    end
  end
  
  def create_dashboard
    @orders = @restaurants.first.orders
    order_detail = @orders.group("date(created_at)").sum(:total)
    @order_details = []
    order_detail.each do |order|
      hash = {created_at: order[0], total: order[1]}
      @order_details << hash
    end
    @orders_by_tablet = []
    i=1
    @order_total = 0
    @orders.group(:tablet_id).count.each do |order|
      order_data = {label: "Tablet #{i}", value: order[1]}
      @order_total += order[1]
      i+=1
      @orders_by_tablet << order_data
    end
    
    @order_by_category = []
    items = OrderItem.where(order_id: @orders).group(:category).count
    items.each do |item|
      order_data = {label: item[0], value: item[1]}
      @order_by_category << order_data  
    end
  end
end











































