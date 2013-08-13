class Api::V1::GrubClientController < ApplicationController
  require 'json'
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }
  before_filter :authenticate_owner!
  respond_to :json
  
  def register_tablet
    serial_no = params[:serial_number]
    ip_address = params[:ip_address]
    is_server = params[:is_server]
    tablet = current_owner.tablets.where(:serial_no => serial_no).first
    if tablet.nil?
     render :status => 400, :json => {:message => 'This tablet is not registered with your restaurant'}
   else
      if tablet.update_attributes(:ip_address => ip_address, :is_server => is_server)
        render :status => 200, :json =>{:restaurant_id => tablet.restaurant_id}
      else
        render :status => 400, :json =>{:message => 'Error occured while registering the tablet, please try again'}
      end
    end
    
  end
  
  def get_server_ip
    serial_no = params[:serial_number]
    tablet = current_owner.tablets.where(:serial_no => serial_no).first
    if tablet.nil?
     render :status => 400, :json => {:message => 'This tablet is not registered with your restaurant'}
   else
     server_ip = current_owner.tablets.where(:is_server => true).first
     render :status => 200, :json => {:server_ip => server_ip.ip_address}
   end
  end
  
  def get_data
    serial_no = params[:serial_number]
    tablet = current_owner.tablets.where(:serial_no => serial_no).first
    if tablet.nil?
      render :status => 400, :json => {:message => 'This tablet is not registered with your restaurant'}
    else
      restaurant = current_owner.restaurants.find(tablet.restaurant_id)
      menu = current_owner.menus.find(restaurant.menu_id)
      menu_items = menu.menu_items
      employees = current_owner.employees.where(:restaurant_id => restaurant.id)
      if menu.nil? or menu_items.empty? or employees.empty?
        render :status => 400, :json => {:message => "You haven't added a menu or employees yet.  Please login to your grubshire account to add missing information."}
      else
        render :status => 200, :json =>{:restaurant_id =>restaurant.id, :menu_items => menu_items, :employees => employees}
      end
    end
  end
  
  def rate_server
    serial_no = params[:serial_number]
    rating = params[:rating].to_f
    server = current_owner.employees.find_by_name(params[:server_name])
    tablet = current_owner.tablets.where(:serial_no => serial_no).first
    if tablet.nil?
      render :status => 400, :json => {:message => 'This tablet is not registered with your restaurant'}
    else
      server.rating+=rating
      server.rating_count+=1
      if server.save
        render :status => 200, :json => {:message => 'Rating submitted'}
      else
        render :status => 400, :json => {:message => 'Error occured while saving record'}
      end
    end
  end
   
  def submit_order
    temp_order = params["order"].as_json
    ordah = temp_order.gsub(':','=>')
    orduh = eval(ordah)
    serial_number = orduh["serial_number"]
    tablet = current_owner.tablets.where(:serial_no => serial_number).first
    server = current_owner.employees.where(:name => orduh["server_name"]).first
    if server.nil?
      render :status => 400, :json => {:message => "Access Denied!"}
    else
      restaurant = server.restaurant
      order = restaurant.orders.new(:total => orduh["total"], :server_id => server.id, :tablet_id =>tablet.id)
      order_items = orduh["order_items"]
      order_items.each do |order_item|
        puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#{order_item}"
        menu_item = MenuItem.find_by_name(order_item["name"])
        order.order_items.build(:name => order_item["name"], :quantity => order_item["quantity"], :menu_item_id => menu_item.id)
      end
      if order.save
        render :status => 200, :json => {:message => 'Order Submitted Successfully!'}
      else
        render :status => 400, :json => {:message => "Access Denied!"}
      end
    end
    
    
  end
   
end