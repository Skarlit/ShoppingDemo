# == Schema Information
#
# Table name: cart_items
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  item_id    :integer
#  quantity   :integer
#  created_at :datetime
#  updated_at :datetime
#

class CartItem < ActiveRecord::Base

  belongs_to :user
  belongs_to :item
end
