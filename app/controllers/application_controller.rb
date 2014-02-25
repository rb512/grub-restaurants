class ApplicationController < ActionController::Base
  include Devise::Controllers::Helpers
  protect_from_forgery
  
  
  def authenticate_owner_from_token!
    tablet = Tablet.where(serial_no: params[:serial_number]).first
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#{tablet.serial_no}"
    puts "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#{params[:auth_token]}"
    owner = tablet.owner
    puts "~~~~~~~~~~~~~~~~~~~~ OWNER !! " if owner
    puts "~~~~~~~~~~~~~~~~~~~ DEVISE !!" if Devise
    auth_token = params[:auth_token].to_s
    sign_in(:owner, owner) if Devise.secure_compare(owner.authentication_token, auth_token)
    if owner_signed_in?
      puts "~~~~~~~~~~~~~~~~~~~~ RB SUCCESS !!" 
    else
      puts "~~~~~~~~~~~~~~~~~~~~ RB FAIL AGAIN!!" 
    end
  end 
end
