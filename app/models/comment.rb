# == Schema Information
#
# Table name: comments
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  item_id     :integer
#  title       :string(255)
#  body        :text
#  user_rating :integer
#  created_at  :datetime
#  updated_at  :datetime
#

class Comment < ActiveRecord::Base
  has_one :author, class_name: "User", foreign_key: user_id
  belongs_to :item
end
