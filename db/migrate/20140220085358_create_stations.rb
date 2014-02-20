class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.string :name
      t.string :printer_ip
      t.integer :menu_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
