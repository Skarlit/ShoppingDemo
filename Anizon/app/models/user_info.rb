# == Schema Information
#
# Table name: user_infos
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  country    :string(255)
#  state      :string(255)
#  address    :string(255)
#  zipcode    :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class UserInfo < ActiveRecord::Base


  belongs_to :user
end
