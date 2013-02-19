class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.boolean :is_default
      t.string :menu_type

      t.timestamps
    end
  end
end
