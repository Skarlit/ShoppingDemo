# == Schema Information
#
# Table name: orders
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  total      :integer
#  status     :integer
#  created_at :datetime
#  updated_at :datetime
#

class Order < ActiveRecord::Base
end
