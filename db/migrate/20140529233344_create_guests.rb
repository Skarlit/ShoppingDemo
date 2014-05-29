class CreateGuests < ActiveRecord::Migration
  def change
    create_table :guests do |t|
      t.string :session

      t.timestamps
    end
  end
end
