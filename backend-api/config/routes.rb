Rails.application.routes.draw do
  # User authentication routes
  # might remove this
  post 'authenticate/face', to: 'authentication#face' # Handles face authentication
  post 'authenticate/pin', to: 'authentication#pin'   # Handles pin authentication

  # Session routes
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/is_logged', to: 'sessions#is_logged'

  resources :users
  resources :atm_machines
  resources :transactions

end
