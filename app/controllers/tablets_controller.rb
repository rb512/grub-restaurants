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

  # GET /tablets/1
  # GET /tablets/1.json
  def show
    @tablet = current_owner.tablets.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tablet }
    end
  end

  # GET /tablets/1/edit
  def edit
    @tablet = current_owner.tablets.find(params[:id])
  end

  # PUT /tablets/1
  # PUT /tablets/1.json
  def update
    @tablet = current_owner.tablets.find(params[:id])

    respond_to do |format|
      if @tablet.update_attributes(params[:tablet])
        format.html { redirect_to @tablet, notice: 'Tablet was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @tablet.errors, status: :unprocessable_entity }
      end
    end
  end
 
end
