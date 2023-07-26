Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # User authentication routes
  post 'authenticate/face', to: 'authentication#face' # Handles face authentication
  post 'authenticate/pin', to: 'authentication#pin'   # Handles pin authentication


  resources :users
  resources :atm_machines
  resources :transactions

end
