# == Schema Information
#
# Table name: feeds
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  url        :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Feed < ActiveRecord::Base

end
