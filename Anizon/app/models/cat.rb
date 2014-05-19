# == Schema Information
#
# Table name: cats
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Cat < ActiveRecord::Base
end
