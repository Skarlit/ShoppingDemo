class AddColumnToItem < ActiveRecord::Migration
  def change
    add_column :items, :clicks, :integer
  end
end
