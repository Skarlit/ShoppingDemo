class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title
      t.float :price
      t.string :img
      t.integer :cat_id

      t.timestamps
    end
  end
end
