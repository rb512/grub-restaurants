class DashboardController < ApplicationController
  
  def authenticate
    @user = UserRestaurant.authenticate(params[:user_name],params[:password])
    respond_to do |format|
      format.html {@user}
      format.json {@user}
    end
  end
end
