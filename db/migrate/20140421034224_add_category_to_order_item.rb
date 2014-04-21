class AddCategoryToOrderItem < ActiveRecord::Migration
  def change
    add_column :order_items, :category, :string
  end
end
