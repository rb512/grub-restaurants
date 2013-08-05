class AddDefaultValuesToEmployee < ActiveRecord::Migration
  def change
    change_column_default :employees, :rating, 0.0
    change_column_default :employees, :rating_count, 0
  end
end
