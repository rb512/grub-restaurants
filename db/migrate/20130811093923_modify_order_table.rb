class ModifyOrderTable < ActiveRecord::Migration
  def up
    add_column :orders, :tablet_id, :integer
    add_column :orders, :restaurant_id, :integer
    remove_column :orders, :table_id
  end

  def down
  end
end
