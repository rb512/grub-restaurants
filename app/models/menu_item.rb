class MenuItem < ActiveRecord::Base
  belongs_to :menu
  mount_uploader :item_asset, ItemAssetUploader
  attr_accessible :category, :description, :menu_id, :name, :price, :item_asset

  validates :name, :description, :price, :presence => true
end
