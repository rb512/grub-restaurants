class CreateTablets < ActiveRecord::Migration
  def change
    create_table :tablets do |t|
      t.integer :restaurant_id
      t.string :wifi_name
      t.string :unique_id

      t.timestamps
    end
  end
end
