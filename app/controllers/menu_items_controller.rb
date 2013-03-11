class MenuItemsController < ApplicationController
  before_filter :authenticate_user_restaurant!


  # GET /menu_items/1
  # GET /menu_items/1.json
  def show
    @menu = current_user_restaurant.menus.find(params[:menu_id])
    @menu_item = @menu.menu_items.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @menu_item }
    end
  end


  # GET /menu_items/1/edit
  def edit
    @menu = current_user_restaurant.menus.find(params[:id])
    @menu_item = @menu.menu_items.find(params[:menu_id])
  end

  # PUT /menu_items/1
  # PUT /menu_items/1.json
  def update
    @menu = current_user_restaurant.menus.find(params[:id])
    @menu_item = @menu.menu_items.find(params[:menu_id])

    respond_to do |format|
      if @menu_item.update_attributes(params[:menu_item])
        format.html { redirect_to menu_path(@menu_item.menu), notice: 'Menu item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @menu_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /menu_items/1
  # DELETE /menu_items/1.json
  def destroy
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #{params}"
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #{params[:menu_id]}"
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #{params[:id]}"
    @menu = current_user_restaurant.menus.find(params[:id])
    @menu_item = @menu.menu_items.find(params[:menu_id])
    @menu_item.destroy

    respond_to do |format|
      format.html { redirect_to menu_path(@menu_item.menu) }
      format.json 
    end
  end
end
