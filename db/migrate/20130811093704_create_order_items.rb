class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|
      t.integer :order_id
      t.string :name
      t.integer :quantity
      t.integer :menu_item_id

      t.timestamps
    end
  end
end
