class User < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :username, presence: true, uniqueness: { case_sensitive: false }
end
