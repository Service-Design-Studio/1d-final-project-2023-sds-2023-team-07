class TransactionsController < ApplicationController
  before_action :set_user, only: [:index]
  
  def index
    @transactions = @user.transactions
    render json: @transactions
  end

  def deposit
    @transaction = Transaction.new(transaction_with_balance_params('deposit'))
    if @transaction.save
      render json: @transaction, status: :created
    else
      render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end
      
  def withdraw
    @transaction = Transaction.new(transaction_with_balance_params('withdrawal'))
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

  def transaction_with_balance_params(type)
    transaction_data = transaction_params
    if type == 'deposit'
      transaction_data[:transaction_type] = type
      transaction_data[:user_balance_left] = @user.account_balance + transaction_data[:amount]
      @user.update(account_balance: transaction_data[:user_balance_left])
    elsif type == 'withdrawal' && transaction_data[:amount] <= @user.account_balance
      transaction_data[:transaction_type] = type
      transaction_data[:user_balance_left] = @user.account_balance - transaction_data[:amount]
      @user.update(account_balance: transaction_data[:user_balance_left])
    end
    transaction_data
  end
end