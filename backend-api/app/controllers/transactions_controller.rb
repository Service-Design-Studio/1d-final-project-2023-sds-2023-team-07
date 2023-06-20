class TransactionsController < ApplicationController
    before_action :set_user, only: [:index]
  
    def index
      @transactions = @user.transactions
      render json: @transactions
    end
  
    def deposit
        @transaction = Transaction.new(transaction_params)
        @transaction.transaction_type = 'deposit'
        if @transaction.save
          render json: @transaction, status: :created
        else
          render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
        end
    end
      
    def withdraw
        @transaction = Transaction.new(transaction_params)
        @transaction.transaction_type = 'withdrawal'
        if @transaction.save
            render json: @transaction, status: :created
        else
            render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
        end
    end
      
  
    private
  
    def set_user
      @user = User.find(params[:user_id])
    end
  
    def transaction_params
      params.require(:transaction).permit(:user_id, :atm_machine_id, :amount)
    end
end