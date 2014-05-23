Anizon::Application.routes.draw do

  resources :users, only: [:create]
  resource :sessions, only: [:create]
  post '/sessions/auto', to: 'sessions#auto'

  namespace :api do
    get '/feeds', to: 'infos#feeds'
    get '/:cat', to: 'items#book_by_category'
  end

  root 'static#index'
end
