class CreateUserInfos < ActiveRecord::Migration
  def change
    create_table :user_infos do |t|
      t.integer :user_id
      t.string :country
      t.string :state
      t.string :address
      t.string :zipcode

      t.timestamps
    end
  end
end
