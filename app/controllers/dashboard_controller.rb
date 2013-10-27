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
    @servers = {}
    @order_sales = 0.0 
    @restaurants = current_owner.restaurants
    current_owner.restaurants.each do |restaurant| 
      @order_count += restaurant.orders.count
      @order_sales += restaurant.orders.sum(:total)
      @servers = restaurant.employees.where(:category => 'Server')
    end
    today = Time.now
  
    restaurant = current_owner.restaurants.first
    order_chart = restaurant.orders.where(:created_at => (today.beginning_of_month..today)).reverse
    data_table = GoogleVisualr::DataTable.new
    data_table.new_column('string', 'Date' )
    data_table.new_column('number', 'Sales')

    # Add Rows and Values
    order_chart.each do |order|
      data_table.add_row([(order.created_at.to_date).to_s, order.total])
    end

    option = { width: 700, height: 340, title: 'Sales this month' }
    @chart = GoogleVisualr::Interactive::ColumnChart.new(data_table, option)
  end
end











































