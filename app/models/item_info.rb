# == Schema Information
#
# Table name: item_infos
#
#  id          :integer          not null, primary key
#  item_id     :integer
#  description :text
#  authors     :string(255)
#  url         :string(255)
#  created_at  :datetime
#  updated_at  :datetime
#

class ItemInfo < ActiveRecord::Base
  belongs_to :item
end
