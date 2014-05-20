Anizon::Application.routes.draw do

  resources :users, only: [:create]
  resource :sessions, only: [:create]
  root 'static#index'
end
