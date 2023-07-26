class TransactionsController < ApplicationController
  before_action :set_user, only: [:index, :create]
  before_action :set_atm_machine, only: [:create]

  def index
    @transactions = @user.transactions
    render json: @transactions
  end

  def create
    if params[:transaction_type] == 'AWL' && transaction_params[:amount] > @user.account_balance
      render json: { errors: "Insufficient balance" }, status: :unprocessable_entity
    else
      Transaction.transaction do
        @transaction = Transaction.new(transaction_params)
        if @transaction.save
          @user.update!(account_balance: @transaction.user_balance_left)
          @atm_machine.update!(balance: @transaction.atm_balance_left)  # Update the AtmMachine balance
          render json: @transaction, status: :created
        else
          render json: {errors: @transaction.errors.full_messages}, status: :unprocessable_entity
        end
      end
    end
  end
  
  def show
    @transaction = Transaction.find(params[:id])
    render json: @transaction
  end

  def update
    @transaction = Transaction.find(params[:id])
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @transaction = Transaction.find(params[:id])
    if @transaction.destroy
      render json: { message: 'Transaction deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete transaction' }, status: :unprocessable_entity
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
    @atm_machine = AtmMachine.find_by(id: params[:atm_machine_id])
    unless @atm_machine
      render json: { error: "ATM Machine not found" }, status: :not_found
    end
  end

  def transaction_params
    transaction_data = params.permit(:user_id, :atm_machine_id, :amount, :transaction_type)
    if transaction_data[:transaction_type] == 'NCD'
      transaction_data[:user_balance_left] = @user.account_balance + transaction_data[:amount]
      transaction_data[:atm_balance_left] = @atm_machine.balance + transaction_data[:amount]
    elsif transaction_data[:transaction_type] == 'AWL' && transaction_data[:amount] <= @user.account_balance
      transaction_data[:user_balance_left] = @user.account_balance - transaction_data[:amount]
      transaction_data[:atm_balance_left] = @atm_machine.balance - transaction_data[:amount]
    end
    transaction_data
  end
end
