class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.integer :restaurant_id
      t.integer :owner_id
      t.string :name
      t.string :category
      t.string :phone
      t.string :email
      t.float :feedback_score
      t.string :avatar

      t.timestamps
    end
  end
end