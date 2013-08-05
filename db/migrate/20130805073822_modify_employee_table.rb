class ModifyEmployeeTable < ActiveRecord::Migration
  def up
    add_column :employees, :rating, :float
    add_column :employees, :rating_count, :integer
    remove_column :employees, :feedback_score
  end

  def down
  end
end
