# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  email           :string(255)
#  password_digest :string(255)
#  session_token   :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  attr_reader :password
  validates :name, presence: true, allow_nil: true
  validates :email, presence: true, format: { with: /[\w\.\_]+@[\w\.\_]+/ } , uniqueness: true

  validates :password, length: { minimum: 6 , allow_nil: true}

  has_one :user_info
  has_many :cart_items
  has_many :comments
  has_many :orders


  def password=(plaintext)
    self.password_digest = BCrypt::Password.create(plaintext)
  end

  def reset_session_token!
    new_token = SecureRandom.hex(64)
    self.session_token = new_token
    self.save!
    new_token
  end
end
