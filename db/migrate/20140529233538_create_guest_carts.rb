class CreateGuestCarts < ActiveRecord::Migration
  def change
    create_table :guest_carts do |t|
      t.string :guest_id
      t.string :item_id

      t.timestamps
    end
  end
end
