class GrubshireApi::V1::TokensController < ApplicationController
  skip_before_filter :verify_authenticity_token
  respond_to :json
  
  def create
    email = params[:email]
    password = params[:password]
    if request.format != :json
      render :status => 406, :json => {:message => "The request must be json"}
      return
    end
    
    if email.nil? or password.nil?
      render :status => 400, :json => {:message => 'The request must contain email and password'}
      return
    end
    
    @owner = Owner.find_by_email(email.downcase)
    
    if @owner.nil?
      logger.info("User with #{email} failed authentication, invalid email")
      render :status =>401, :json =>{:message => "Invalid email or password"}
      return
    end
    
    @owner.ensure_authentication_token!
    
    if not @owner.valid_password?(password)
      logger.info("User with #{email} failed authentication, invalid password")
      render :status => 400, :json => {:message => 'Invalid email or password'}
    else
      render :status => 200, :json => {:token => @owner.authentication_token}
    end
  end
  
  def destroy
    @owner = Owner.find_by_authentication_token(params[:id])
    if @owner.nil?
      logger.info("Token not found")
      render :status => 404, :json => {:message => "Invalid token."}
    else
      @user.reset_authentication_token!
      render :status => 200, :json => {:token => params[:id]}
    end
  end
  
end