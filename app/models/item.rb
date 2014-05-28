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
#  clicks     :integer
#

class Item < ActiveRecord::Base
  belongs_to :cat
  has_one :item_info, class_name: "ItemInfo", foreign_key: :item_id
  has_many :comments
  before_save :default_values


  def default_values
    self.rating ||= 0
  end

  def calcRating
    rating = 0;
    comments = self.comments
    comments.each do |c|
      rating += c.user_rating
    end
    if comments.count > 0
      self.rating = rating / comments.count
    else
      self.rating = 0
    end
    self.save
  end

  def updateRating(new_comment)
    self.rating = self.rating + (new_comment.user_rating - self.rating) / self.comments.count
    self.save
  end
end
