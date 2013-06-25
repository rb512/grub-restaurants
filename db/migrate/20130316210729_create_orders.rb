class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.integer :table_id
      t.integer :user_id
      t.integer :server_id
      t.integer :restaurant_id
      t.float :total

      t.timestamps
    end
  end
end
