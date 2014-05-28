Anizon::Application.routes.draw do

  get "tests/test"
  resources :users, only: [:create]
  resource :sessions, only: [:create, :destroy]
  post '/sessions/auto', to: 'sessions#auto'

  namespace :api do
    delete '/cart_items/:id', to: 'cart_items#destroy'
    post '/cart_items', to: 'cart_items#create'
    get '/cart_items', to: 'cart_items#index'
    put '/cart_items/:id', to: 'cart_items#update'
    get '/feeds', to: 'infos#feeds'
    get '/userinfo', to: 'infos#user_info'
    get '/items/:id/comments', to: 'comments#index'
    patch '/items/:id', to: 'items#update'
    put '/items/:id', to: 'items#update'
    get '/items/:id', to: 'items#show'
    get '/:cat', to: 'items#book_by_category'
  end

  root 'static#index'
end
