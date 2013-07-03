class DashboardController < ApplicationController
  
  def authenticate
    @user = UserRestaurant.authenticate(params[:user_name],params[:password])
    respond_to do |format|
      format.html {@user}
      format.json {@user}
    end
  end
  
  def my_account
    @auth_token = current_owner.authentication_token
  end
end
