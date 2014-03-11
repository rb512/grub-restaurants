class MenusController < ApplicationController
  before_filter :authenticate_owner!
  # GET /menus
  # GET /menus.json
  def index
    @menus = current_owner.menus.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @menus }
    end
  end

  # GET /menus/1
  # GET /menus/1.json
  def show
    @menu = current_owner.menus.find(params[:id])
    @menu_items = @menu.menu_items
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => {:menu => @menu, :menu_items => @menu_items} }
    end
  end


  def new
    @menu = current_owner.menus.new
  end
  
  def create
    @menu = current_owner.menus.new(params[:menu])
    if @menu.save
      session[:menu_id] = @menu.id
      redirect_to menu_steps_path
    else
      render "new"
    end
  end
  
  def update
    @menu = current_owner.menus.find(params[:id])
    if session[:updated] == true
      @menu.update_attributes(params[:menu])
      session[:updated] = nil
      redirect_to @menu
    else
      session[:menu_id] = @menu.id
      if @menu.update_attributes(params[:menu])
        redirect_to menu_steps_path
      else
        render "edit"
      end
    end
  end
  
  # GET /menus/new
  # GET /menus/new.json
  def new_old
    session[:menu_params] ||= {}
    @menu = current_owner.menus.new(session[:menu_params])
    @categories = @menu.categories
    @menu.current_step = session[:menu_step]
  end

  # GET /menus/1/edit
  def edit
    session[:menu_params] ||= {}
    @menu = current_owner.menus.find(params[:id])
    @categories = @menu.categories
    @menu.current_step = session[:menu_step]
  end

  # POST /menus
  # POST /menus.json
  def create_old
    session[:menu_params].deep_merge!(params[:menu]) if params[:menu]
    @menu = current_owner.menus.new(session[:menu_params])
    @categories = @menu.categories
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
  end

 
  # PUT /menus/1
  # PUT /menus/1.json
  def update_old
    @menu = current_owner.menus.find(params[:id])
    session[:menu_params].deep_merge!(params[:menu]) if params[:menu]
    @categories = @menu.categories
    @menu.current_step = session[:menu_step]
    updated = false
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~FIRST CHECK : #{@menu.current_step}"
    if params[:back_button]
      @menu.previous_step
    elsif @menu.last_step?
      puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~LAST STEP : #{@menu.current_step}"
      @menu.update_attributes(session[:menu_params])
      updated = true
    else
      puts "~~~~~~~~~~~~~~~~~~~~~~~~~~BEFORE: NEXT STEP BLOCK #{@menu.current_step}"
      @menu.next_step
      puts "~~~~~~~~~~~~~~~~~~~~~~~~~~AFTER : NEXT STEP BLOCK #{@menu.current_step}"
    end
    session[:menu_step] = @menu.current_step
    
    if updated
      session[:menu_steps]=session[:menu_params] = nil
      redirect_to @menu, notice: "Menu was successfully updated."
    else
      render "edit"
    end
  end

  def destroy_menu_item
    @menu = current_owner.menus.find(params[:menu_id])
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
    @menu = current_owner.menus.find(params[:id])
    @menu.destroy

    respond_to do |format|
      format.html { redirect_to menus_url }
      format.json { head :no_content }
      format.js
    end
  end
  
  def daily_special
    
  end
  
  private
  def get_categories(menu)
    categories = []
    menu.categories.each {|category| categories << category.name}
  end
    
end
