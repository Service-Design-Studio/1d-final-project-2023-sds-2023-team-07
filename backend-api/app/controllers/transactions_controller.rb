class TransactionsController < ApplicationController
  before_action :set_user, only: [:index, :deposit, :withdraw]
  before_action :set_atm_machine, only: [:deposit, :withdraw]
  
  def index
    @transactions = @user.transactions
    render json: @transactions
  end

  def deposit
    Transaction.transaction do
      @transaction = Transaction.new(transaction_with_balance_params('NCD'))
      if @transaction.save
        @user.update!(account_balance: @transaction.user_balance_left)
        @transaction.update!(balance: @transaction.atm_balance_left)
        render json: @transaction, status: :created
      else
        render json: {errors: @transaction.errors.full_messages}, status: :unprocessable_entity
      end
    end
  end
      
  def withdraw
    if transaction_params[:amount] > @user.account_balance
      render json: { errors: "Insufficient balance" }, status: :unprocessable_entity
    else
      Transaction.transaction do
        @transaction = Transaction.new(transaction_with_balance_params('AWL'))
        if @transaction.save
          @user.update!(account_balance: @transaction.user_balance_left)
          @transaction.update!(balance: @transaction.atm_balance_left)
          render json: @transaction, status: :created
        else
          render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end
  
  private
  
  def set_user
    @user = User.find_by(id: params[:user_id])
    unless @user
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def set_atm_machine
    @atm_machine = AtmMachine.find(params[:atm_machine_id])
  end

  def transaction_params
    params.require(:transaction).permit(:user_id, :atm_machine_id, :amount)
  end

  def transaction_with_balance_params(type)
    transaction_data = transaction_params
    transaction_data[:transaction_type] = type
    if type == 'NCD'
      transaction_data[:user_balance_left] = @user.account_balance + transaction_data[:amount]
      transaction_data[:atm_balance_left] = @atm_machine.balance + transaction_data[:amount]
    elsif type == 'AWL' && transaction_data[:amount] <= @user.account_balance
      transaction_data[:user_balance_left] = @user.account_balance - transaction_data[:amount]
      transaction_data[:atm_balance_left] = @atm_machine.balance - transaction_data[:amount]
    end
    transaction_data
  end
end