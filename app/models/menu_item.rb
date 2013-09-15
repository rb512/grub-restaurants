class MenuItem < ActiveRecord::Base
  belongs_to :menu
  has_many :item_options
  mount_uploader :item_asset, ItemAssetUploader
  attr_accessible :category, :description, :menu_id, :name, :price, :item_asset
  attr_accessible :item_options_attributes
  accepts_nested_attributes_for :item_options, :reject_if => :all_blank, :allow_destroy => true
  validates :name, :description, :price, :presence => true
end
