Anizon::Application.routes.draw do

  resources :users, only: [:create]
  resource :sessions, only: [:create]
  post '/sessions/auto', to: 'sessions#auto'

  namespace :api do
    get '/feeds', to: 'infos#feeds'
  end

  root 'static#index'
end
