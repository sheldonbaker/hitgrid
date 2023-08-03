class BlogPostSerializer < ApplicationSerializer
  attributes :id, :slug, :title, :body, :image_url, :created_at

  has_one :author
end
