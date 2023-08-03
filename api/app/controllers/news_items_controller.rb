class NewsItemsController < ApplicationController
  def index
    @news_items = policy_scope(NewsItem)
    @news_items.limit!(100)

    @news_items.where!(trade_deadline_id: params.require(:trade_deadline_id))
    @news_items.includes!(:trade_deadline)

    render json: @news_items
  end
end
