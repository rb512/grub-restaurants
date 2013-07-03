class DashboardController < ApplicationController
  
  def authenticate
    @user = UserRestaurant.authenticate(params[:user_name],params[:password])
    respond_to do |format|
      format.html {@user}
      format.json {@user}
    end
  end
  
  def my_account
    current_owner.ensure_authentication_token!
    @auth_token = current_owner.authentication_token
  end
end
