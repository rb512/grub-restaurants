class RestaurantsController < ApplicationController
  before_filter :authenticate_owner!
  
  # GET /restaurants
  # GET /restaurants.json
  def index
    @restaurants = current_owner.restaurants
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @restaurants }
    end
  end

  # GET /restaurants/1
  # GET /restaurants/1.json
  def show
    @restaurant = current_owner.restaurants.find(params[:id])
    @menu_name = get_menu_name(@restaurant.menu_id)
    @menu = current_owner.menus.find(@restaurant.menu_id)
    @menu_items = @menu.menu_items
    
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => {:restaurant => @restaurant, :menu => @menu, :menu_items => @menu_items} }
    end
  end

  # GET /restaurants/new
  # GET /restaurants/new.json
  def new
    @restaurant = current_owner.restaurants.new
    @menus = get_menus()
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @restaurant }
    end
  end

  # GET /restaurants/1/edit
  def edit
    @restaurant = current_owner.restaurants.find(params[:id])
    @menus = get_menus()
  end

  # POST /restaurants
  # POST /restaurants.json
  def create
    @restaurant = current_owner.restaurants.new(params[:restaurant])

    respond_to do |format|
      if @restaurant.save
        format.html { redirect_to @restaurant, notice: 'Restaurant was successfully created.' }
        format.json { render json: @restaurant, status: :created, location: @restaurant }
      else
        format.html { render action: "new" }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /restaurants/1
  # PUT /restaurants/1.json
  def update
    menu_name = params["restaurant"]["menu_id"]
    params["restaurant"]["menu_id"] = get_menu_id(menu_name)
    @restaurant = current_owner.restaurants.find(params[:id])

    respond_to do |format|
      if @restaurant.update_attributes(params[:restaurant])
        format.html { redirect_to @restaurant, notice: 'Restaurant was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaurants/1
  # DELETE /restaurants/1.json
  def destroy
    @restaurant = current_owner.restaurants.find(params[:id])
    @restaurant.destroy

    respond_to do |format|
      format.html { redirect_to restaurants_url }
      format.json { head :no_content }
    end
  end
  
  private
  
  def get_menu_id(menu_name)
    return current_owner.menus.find_by_name(menu_name).id
  end
  
  def get_menu_name(menu_id)
    return current_owner.menus.find(menu_id).name
  end
  
  def get_menus()
    menus = []
    current_owner.menus.each {|menu| menus << menu.name}
  end
end
