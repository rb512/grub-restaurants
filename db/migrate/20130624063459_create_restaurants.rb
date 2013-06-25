class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.integer :owner_id
      t.string :address
      t.string :city
      t.string :state
      t.string :country
      t.string :phone
      t.string :email
      t.integer :zip
      t.integer :menu_id

      t.timestamps
    end
  end
end
