# == Schema Information
#
# Table name: item_stats
#
#  id         :integer          not null, primary key
#  item_id    :integer
#  rating     :integer
#  stocks     :integer
#  released   :boolean
#  created_at :datetime
#  updated_at :datetime
#

class ItemStat < ActiveRecord::Base
end
