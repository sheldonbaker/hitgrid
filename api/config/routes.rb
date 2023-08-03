Rails.application.routes.draw do
  scope 'api/v1' do
    resources :access_tokens, only: [:create]
    resources :users, only: [:show, :create, :update]

    resources :s3_policies, only: [:create]
    resources :push_keys, only: [:create]

    resources :email_confirmations, only: [:create, :update]
    resources :profiles, only: [:show, :update] do
      resources :teams, only: [:index]
    end

    resources :teams, only: [:index]
    resources :calculations, only: [:index]

    resources :assets, only: [:index]
    resources :allocations, only: [:index]
    resources :obligations, only: [:index]
    resources :ltir_reliefs, only: [:index]

    resources :team_claims, only: [:create]

    resources :notification_subscriptions, only: [:index, :create, :update]
    
    resources :push_notification_receipts, only: [:create]

    resources :push_registrations, only: [:create, :update]
    resources :sms_registrations, only: [:create, :update]

    resources :activities, only: [:index]
    # resources :blog_posts, only: [:index]

    resources :trade_deadlines, only: [:index, :show] do
      resources :teams, only: [:index]
      resources :comments, only: [:index]
      resources :chat_posts, only: [:index]
    end

    resources :messages, only: [:index, :create, :update]
    resources :comments, only: [:create]
    resources :news_items, only: [:index]
    resources :chat_posts, only: [:create]

    resources :unread_items, only: [:index]

    resources :trades, only: [:index, :show, :update] do
      resources :comments, only: [:index]
    end
    resources :proposals, only: [:index, :show, :create, :update]

    resources :negotiable_participations, only: [:update]

    resources :players, only: [:show]

    resources :notices, only: [:create]
  end
end
