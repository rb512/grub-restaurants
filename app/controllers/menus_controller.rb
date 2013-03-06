class MenusController < ApplicationController
  before_filter :authenticate_user_restaurant!
  # GET /menus
  # GET /menus.json
  def index
    @menus = current_user_restaurant.menus.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @menus }
    end
  end

  # GET /menus/1
  # GET /menus/1.json
  def show
    @menu = current_user_restaurant.menus.find(params[:id])
    @menu_items = @menu.menu_items
  end

  # GET /menus/new
  # GET /menus/new.json
  def new
    session[:menu_params] ||= {}
    @menu = current_user_restaurant.menus.new
    @menu = current_user_restaurant.menus.new(session[:menu_params])
    categories = @menu.categories
    @categories =[]
    categories.each {|category| @categories << category}
    @menu.current_step = session[:menu_step]
  end

  # GET /menus/1/edit
  def edit
    @menu = current_user_restaurant.menus.find(params[:id])
  end

  # POST /menus
  # POST /menus.json
  def create
    session[:menu_params].deep_merge!(params[:menu]) if params[:menu]
    @menu = current_user_restaurant.menus.new(session[:menu_params])
    categories = @menu.categories
    @categories =[]
    categories.each {|category| @categories << category}
    @menu.current_step = session[:menu_step]
    if params[:back_button]
      @menu.previous_step
    elsif @menu.last_step?
      @menu.save
    else
      @menu.next_step
    end
    session[:menu_step] = @menu.current_step
    if @menu.new_record?
      render "new"
    else
      session[:menu_steps]=session[:menu_params] = nil
      redirect_to @menu, notice: "Menu was successfully created."
    end
    # respond_to do |format|
    #   if @menu.save
    #     format.html { redirect_to @menu, notice: 'Menu was successfully created.' }
    #     format.json { render json: @menu, status: :created, location: @menu }
    #   else
    #     format.html { render action: "new" }
    #     format.json { render json: @menu.errors, status: :unprocessable_entity }
    #     format.js
    #   end
    # end
  end

 
  # PUT /menus/1
  # PUT /menus/1.json
  def update
    @menu = current_user_restaurant.menus.find(params[:id])
    respond_to do |format|
      if @menu.update_attributes(params[:menu])
        format.html { redirect_to @menu, notice: 'Menu was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @menu.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy_menu_item
    @menu = current_user_restaurant.menus.find(params[:menu_id])
    @menu_item = @menu.menu_items.find(params[:id])
    @menu_item.destroy
    respond_to do |format|
      format.html {redirect_to @menu}
      format.json {head :no_content}
    end
  end
  
  # DELETE /menus/1
  # DELETE /menus/1.json
  def destroy
    @menu = current_user_restaurant.menus.find(params[:id])
    @menu.destroy

    respond_to do |format|
      format.html { redirect_to menus_url }
      format.json { head :no_content }
      format.js
    end
  end
end
