class TabletsController < ApplicationController
  before_filter :authenticate_owner!
  
  # GET /tablets
  # GET /tablets.json
  def index
    @tablets = current_owner.tablets

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tablets }
    end
  end
 
end
