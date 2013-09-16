class ItemOptions < ActiveRecord::Migration
  def change
    create_table :item_options do |t|
      t.float :price
      t.string :size
      t.integer :menu_item_id
      t.timestamps
    end
  end

end
