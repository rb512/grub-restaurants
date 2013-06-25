class TabletsController < ApplicationController
  
  def index
    @current_user_restaurant = current_user_restaurant
    respond_to do |format|
      format.html # index.html.erb
      # format.json { render json: @restaurants }
    end
  end
end
