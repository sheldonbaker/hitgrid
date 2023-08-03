class BlogPost < ActiveRecord::Base
  belongs_to :author, class_name: 'Profile'
  has_many :comments, as: :commentable
end
