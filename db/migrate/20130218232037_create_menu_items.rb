class CreateMenuItems < ActiveRecord::Migration
  def change
    create_table :menu_items do |t|
      t.string :name
      t.text :description
      t.float :price
      t.string :category
      t.integer :menu_id

      t.timestamps
    end
  end
end
