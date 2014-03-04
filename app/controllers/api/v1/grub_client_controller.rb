class Api::V1::GrubClientController < ApplicationController
  require 'json'
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }
  before_filter :authenticate_owner_from_token!
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
  
  def get_menu_items
    serial_no = params[:serial_number]
    tablet = current_owner.tablets.where(:serial_no => serial_no).first
    if tablet.nil?
      render :status => 400, :json => {:message => 'This tablet is not registered with your restaurant'}
    else
      restaurant = current_owner.restaurants.find(tablet.restaurant_id)
      menu = current_owner.menus.find(restaurant.menu_id)
      menu_items = menu.menu_items
      options =[]
      menu.menu_items.each {|item| options << item.item_options unless item.item_options.empty?}
      @options = options.flatten(2)
      render :status => 200, :json =>{restaurant_id: restaurant.id, menu_items: menu_items, item_options: @options}
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
      order_total = 0.0
      order = restaurant.orders.new(:total => orduh["total"], :server_id => server.id, :tablet_id =>tablet.id)
      order_items = orduh["order_items"]
      order_items.each do |order_item|
        menu_item = MenuItem.find_by_name(order_item["name"])
        order.order_items.build(:name => order_item["name"], :quantity => order_item["quantity"], :menu_item_id => menu_item.id)
        order_total += menu_item.price*order_item["quantity"]
      end
      order.total = order_total
      if order.save
        render :status => 200, :json => {:message => 'Order Submitted Successfully!'}
      else
        render :status => 400, :json => {:message => "Access Denied!"}
      end
    end
  end
  
  def order
    temp_order = params["order"].as_json
    order = eval(temp_order.gsub(":","=>"))
    serial_number = params["serial_number"]
    tablet = current_owner.tablets.where(:serial_no => serial_number).first
    if tablet.nil?
      render :status => 400, :json => {:message => 'This tablet is not registered with your restaurant'}
    else
      restaurant = tablet.restaurant
      final_order = restaurant.orders.new(total: order["total"], tablet_id: tablet.id)
      order_items = order["order_items"]["itemArray"]
      if order_items[0].nil?
        menu_item = MenuItem.where(name: order_items["itemName"]).first
        final_order.order_items.build(name: order_items["itemName"], quantity: order_items["quantity"], menu_item_id: menu_item.id)
      else
        order_items.each do |order_item|
          menu_item = MenuItem.where(name: item["itemName"]).first
          final_order.order_items.build(name: order_item["itemName"], quantity: order_item["quantity"], menu_item_id: menu_item.id)
        end
      end
      if final_order.save
        render status: 200, json: {message: "Order Submitted Successfully!"}
      else
        render status: 400, json: {message: "Access Denied!"}
      end
    end
  end
  
  private 
  def is_authorized?(serial_no)
    return tablet = current_owner.tablets.where(:serial_no => serial_no).first
  end
  
end