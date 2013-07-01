class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def current_user
    return current_user_restuarant
  end
  
end
