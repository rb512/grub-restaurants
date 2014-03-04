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
    @order_count = 0
    @servers = {}
    @order_sales = 0.0 
    @restaurants = current_owner.restaurants
    @trending_item = "Beer"
    @most_ordered = "Guiness"
    @most_ordered_sales = 770.34
    @trending_item_sales = 1233.55
      current_owner.restaurants.each do |restaurant| 
        @order_count += restaurant.orders.count 
        @order_sales += restaurant.orders.sum(:total)
        @servers = restaurant.employees.where(:category => 'Server')
      end
    today = Time.now
  
    restaurant = current_owner.restaurants.first
    order_chart = restaurant.orders.sum(:total, :group => "DATE(created_at)", :conditions => {:created_at => today.beginning_of_month..today}) unless restaurant.nil?
    data_table = GoogleVisualr::DataTable.new
    data_table.new_column('string', 'Date' )
    data_table.new_column('number', 'Total Sales')

    # Add Rows and Values
    order_chart.each do |order|
      data_table.add_row([(order[0]).strftime("%m/%d"), order[1].round(5)])
    end
# 
#     option = { width: 1000, height: 340, title: 'Sales this month' }
#     @chart = GoogleVisualr::Interactive::ColumnChart.new(data_table, option)
  end
end











































