# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Include the Sprockets helpers for Rails 3.1+ asset pipeline compatibility:
  # include Sprockets::Helpers::RailsHelper
  # include Sprockets::Helpers::IsolatedHelper

  # Choose what kind of storage to use for this uploader:
  #storage :file
  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "tmp/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
     version :small do
       process :resize_to_limit => [30,30]
     end
     version :medium do
       process :resize_to_limit => [161, 161]
     end
     version :large do 
       process :resize_to_limit => [267,267]
     end
     
    def extension_white_list
         %w(jpg jpeg gif png)
       end
  
      def cache_dir
       "#{Rails.root}/tmp/uploads"
      end
  
      def default_url
        ActionController::Base.helpers.asset_path("fallback/" + [version_name, "waiter.jpg"].compact.join('_'))
      end
end
