# == Schema Information
#
# Table name: item_infos
#
#  id          :integer          not null, primary key
#  item_id     :integer
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class ItemInfo < ActiveRecord::Base
  belongs_to :item
end
