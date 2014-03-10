class MenuStepsController < ApplicationController
  include Wicked::Wizard
  
  steps :add_items
  
  def show
    @menu = current_owner.menus.find(session[:menu_id])
    render_wizard
  end
  
end
