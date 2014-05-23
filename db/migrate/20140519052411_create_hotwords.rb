class CreateHotwords < ActiveRecord::Migration
  def change
    create_table :hotwords do |t|
      t.string :query
      t.text :result
      t.integer :rank

      t.timestamps
    end
  end
end
