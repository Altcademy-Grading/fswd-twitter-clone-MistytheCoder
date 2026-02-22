class User < ApplicationRecord
  has_many :sessions
  has_many :tweets

  validates :username, presence: true, length: { minimum: 3, maximum: 64 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }
  validates :email, presence: true, length: { minimum: 5, maximum: 500 }

  validates_uniqueness_of :username
  validates_uniqueness_of :email

  before_save :hash_password, if: :will_save_change_to_password?

  def authenticate_password(raw_password)
    return false if password.blank? || raw_password.blank?

    ::BCrypt::Password.new(password) == raw_password
  rescue ::BCrypt::Errors::InvalidHash
    false
  end

  private

  def hash_password
    return if password.blank?

    self.password = ::BCrypt::Password.create(password)
  end

end
