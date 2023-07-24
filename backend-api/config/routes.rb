Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # User authentication routes
  post 'authenticate/face', to: 'authentication#face' # Handles face authentication
  post 'authenticate/pin', to: 'authentication#pin'   # Handles pin authentication

  # Transaction related routes
  post 'withdraw', to: 'transactions#withdraw' # Handles withdrawal transactions
  post 'deposit', to: 'transactions#deposit' # Handles deposit transactions

  resources :users do
    resources :transactions, only: [:index, :show, :update, :destroy]
  end
  # The above block will generate the following routes:
  # GET '/users/:user_id/transactions' - List all transactions for a specific user
  # GET '/users/:user_id/transactions/:id' - Show details of a specific transaction of a user
  # PATCH '/users/:user_id/transactions/:id' - Update a specific transaction of a user
  # DELETE '/users/:user_id/transactions/:id' - Delete a specific transaction of a user

  resources :atm_machines, except: [:new, :edit]
  # This will generate all CRUD operations for atm_machines except for new and edit:
  # GET '/atm_machines' - List all atm machines
  # POST '/atm_machines' - Create a new atm machine
  # GET '/atm_machines/:id' - Show details of a specific atm machine
  # PATCH '/atm_machines/:id' - Update a specific atm machine
  # DELETE '/atm_machines/:id' - Delete a specific atm machine

  resources :transactions, only: [:show, :update, :destroy]
  # This will generate show, update, and destroy operations for transactions:
  # GET '/transactions/:id' - Show details of a specific transaction
  # PATCH '/transactions/:id' - Update a specific transaction
  # DELETE '/transactions/:id' - Delete a specific transaction
end
