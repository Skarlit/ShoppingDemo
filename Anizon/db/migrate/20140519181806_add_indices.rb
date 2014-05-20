class AddIndices < ActiveRecord::Migration
  def change
    add_index :users, :session_token
    add_index :hotwords, :query
  end
end
