class Owner < ActiveRecord::Base
  require 'devise'
  has_many :menus
  has_many :restaurants
  has_many :employees
  has_many :tablets
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :invitable

  before_save :ensure_authentication_token
  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body
  
  validates :name, presence: true
  
  def ensure_authentication_token
     if authentication_token.blank?
       self.authentication_token = generate_authentication_token
     end
   end
 
   private
  
   def generate_authentication_token
     loop do
       token = Devise.friendly_token
       break token unless User.where(authentication_token: token).first
     end
   end
end
