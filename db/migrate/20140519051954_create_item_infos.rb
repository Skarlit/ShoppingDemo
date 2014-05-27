class CreateItemInfos < ActiveRecord::Migration
  def change
    create_table :item_infos do |t|
      t.integer :item_id
      t.text :overview
      t.string :publisher
      t.string :published
      t.string :author
      t.string :isbn
      t.string :edition

      t.timestamps
    end
  end
end
