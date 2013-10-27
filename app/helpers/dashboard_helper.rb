module DashboardHelper
  
  def get_orders_by_server(server_id)
    Order.where(:server_id => server_id).count
  end
  def get_sales_by_server(server_id)
    Order.sum(:total, :conditions => {:server_id => server_id}).round(5)
  end
  
  def get_orders_by_week(orders)
    start = Time.now
    today = start.beginning_of_week
    orders.where(:created_at => (start..today))
  end
  
  def get_sales_by_week(orders)
    start = Time.now
    today = start.beginning_of_week
    sales = orders.sum(:total, :conditions => {:created_at => (start..today)})
  end
  
end
