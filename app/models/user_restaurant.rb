class UserRestaurant < ActiveRecord::Base
  has_many :menus
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body
  
  def self.authenticate(username,password)
    user = UserRestaurant.find_for_authentication(:email => username)
    user.valid_password?(password) ? user:nil
  end
end
