
Anizon::Application.routes.draw do

  resources :users, only: [:create]
  resource :sessions, only: [:create, :destroy]
  post '/sessions/auto', to: 'sessions#auto'

  namespace :api do
    delete '/cart_items/:id', to: 'cart_items#destroy'
    post '/cart_items', to: 'cart_items#create'
    get '/cart_items', to: 'cart_items#index'
    put '/cart_items/:id', to: 'cart_items#update'
    get '/feeds', to: 'infos#feeds'
    post '/cc/sink', to: 'orders#sink'
    get '/userinfo', to: 'infos#user_info'
    post '/hotwords/search', to: 'hotwords#search'
    get '/hotwords/index', to: 'hotwords#index'
    post 'orders', to: 'orders#create'
    post 'comments', to: 'comments#create'
    get '/items/popular', to: 'items#popular'
    get '/items/ranking', to: 'items#ranking'
    get '/items/:id/comments', to: 'comments#index'
    patch '/items/:id', to: 'items#update'
    put '/items/:id', to: 'items#update'
    get '/items/:id', to: 'items#show'
    get '/:cat', to: 'items#book_by_category'
  end

  root 'static#index'
end
