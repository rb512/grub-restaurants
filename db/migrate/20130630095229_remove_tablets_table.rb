class RemoveTabletsTable < ActiveRecord::Migration
  def up
    drop_table :tablets
  end

  def down
  end
end
