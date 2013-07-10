class CreateTablets < ActiveRecord::Migration
  def change
    create_table :tablets do |t|
      t.integer :restaurant_id
      t.string :ip_address
      t.boolean :is_server
      t.integer :owner_id
      t.string :serial_no

      t.timestamps
    end
  end
end
