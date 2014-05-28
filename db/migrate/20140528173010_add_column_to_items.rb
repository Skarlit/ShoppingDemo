class AddColumnToItems < ActiveRecord::Migration
  def change
    add_column :items, :rating, :float
  end
end
