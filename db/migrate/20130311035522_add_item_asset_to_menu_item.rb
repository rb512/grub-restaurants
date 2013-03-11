class AddItemAssetToMenuItem < ActiveRecord::Migration
  def change
    add_column :menu_items, :item_asset, :string
  end
end
