class EmployeesController < ApplicationController
  before_filter :authenticate_owner!
  # GET /employees
  # GET /employees.json
  def index
    @employees = current_owner.employees.all
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @employees }
    end
  end

  # GET /employees/1
  # GET /employees/1.json
  def show
    @employee = current_owner.employees.find(params[:id])
    @rating = 0.0
    if @employee.category == 'Server'
      @rating = (@employee.rating/@employee.rating_count)
      @rating = (@rating*100).round/100.0 if @rating > 0.0
      @rating_count = @employee.rating_count
    end
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @employee }
    end
  end

  # GET /employees/new
  # GET /employees/new.json
  def new
    @employee = current_owner.employees.new
    @category = category
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @employee }
    end
  end

  # GET /employees/1/edit
  def edit
    @employee = current_owner.employees.find(params[:id])
    @category = category
  end

  # POST /employees
  # POST /employees.json
  def create
    @employee = current_owner.employees.new(params[:employee])

    respond_to do |format|
      if @employee.save
        format.html { redirect_to @employee, notice: 'Employee was successfully created.' }
        format.json { render json: @employee, status: :created, location: @employee }
      else
        format.html { render action: "new" }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /employees/1
  # PUT /employees/1.json
  def update
    @employee = current_owner.employees.find(params[:id])
    puts "#{params}"
    respond_to do |format|
      if @employee.update_attributes(params[:employee])
        format.html { redirect_to @employee, notice: 'Employee was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee = current_owner.employees.find(params[:id])
    @employee.destroy

    respond_to do |format|
      format.html { redirect_to employees_url }
      format.json { head :no_content }
    end
  end
  
  
  private
  def category
    category = ["Server", "Manager", "Kitchen Staff", "Cashier"]
  end
  
end
