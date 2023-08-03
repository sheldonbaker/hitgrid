class BlogPostsController < ApplicationController
  def index
    @blog_posts = policy_scope(BlogPost)

    @blog_posts.includes!(:author)
    @blog_posts.limit!(params[:limit]) if params[:limit]

    render json: @blog_posts, include: 'author'
  end
end
