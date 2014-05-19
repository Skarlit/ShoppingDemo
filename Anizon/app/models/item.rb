# == Schema Information
#
# Table name: items
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  price      :float
#  img        :string(255)
#  cat_id     :integer
#  created_at :datetime
#  updated_at :datetime
#

class Item < ActiveRecord::Base
end
