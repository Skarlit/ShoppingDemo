class CreateItemInfos < ActiveRecord::Migration
  def change
    create_table :item_infos do |t|
      t.integer :item_id
      t.text :description

      t.timestamps
    end
  end
end
