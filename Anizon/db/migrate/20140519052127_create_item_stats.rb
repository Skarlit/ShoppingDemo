class CreateItemStats < ActiveRecord::Migration
  def change
    create_table :item_stats do |t|
      t.integer :item_id
      t.integer :rating
      t.integer :stocks
      t.boolean :released

      t.timestamps
    end
  end
end
