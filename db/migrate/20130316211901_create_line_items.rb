class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :order_id
      t.string :item_name
      t.float :item_price
      t.integer :menu_item_id

      t.timestamps
    end
  end
end
