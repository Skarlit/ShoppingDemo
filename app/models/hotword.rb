# == Schema Information
#
# Table name: hotwords
#
#  id         :integer          not null, primary key
#  query      :string(255)
#  result     :text
#  rank       :integer
#  created_at :datetime
#  updated_at :datetime
#

class Hotword < ActiveRecord::Base
end
