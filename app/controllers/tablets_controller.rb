class TabletsController < ApplicationController
  
  def index
    @current_owner = current_owner
    respond_to do |format|
      format.html # index.html.erb
      # format.json { render json: @restaurants }
    end
  end
end
