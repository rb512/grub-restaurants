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
    @menu = current_user_restaurant.menus.new
    @menu.menu_items.build
    @menu.categories.build
  end

  # GET /menus/1/edit
  def edit
    @menu = current_user_restaurant.menus.find(params[:id])
  end

  # POST /menus
  # POST /menus.json
  def create
    @menu = current_user_restaurant.menus.new(params[:menu])
    @menu.next_step
    render "new"
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
