Anizon::Application.routes.draw do

  get "tests/test"
  resources :users, only: [:create]
  resource :sessions, only: [:create, :destroy]
  post '/sessions/auto', to: 'sessions#auto'

  namespace :api do
    get '/feeds', to: 'infos#feeds'
    get '/:cat', to: 'items#book_by_category'
    patch '/items/:id', to: 'items#update'
    put '/items/:id', to: 'items#update'
    get '/items/:id', to: 'items#show'
  end

  root 'static#index'
end
