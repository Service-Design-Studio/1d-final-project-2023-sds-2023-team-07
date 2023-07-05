Rails.application.routes.draw do
  post 'authenticate/face', to: 'authentication#face'
  post 'authenticate/pin', to: 'authentication#pin'
  post 'withdraw', to: 'transactions#withdraw'
  post 'withdraw/confirm', to: 'transactions#confirm_withdrawal'
  post 'deposit', to: 'transactions#deposit'
  post 'deposit/confirm', to: 'transactions#confirm_deposit'
  post 'voice_transaction', to: 'transactions#voice_transaction'
  
  resources :users do
    resources :transactions, only: [:index]
  end

  resources :users, only: [:create] do
    resources :transactions, only: [:index]
  end


  resources :atm_machines, only: [:create]
end