require 'bigdecimal'
class TransactionsController < ApplicationController
  before_action :set_user, only: [:create]
  before_action :set_atm_machine, only: [:create]

  # GET '/transactions' - List all transactions
  # GET '/transactions?user=1' - List all transactions for a specific user
  def index
    if params[:user]
      @user = User.find_by(id: params[:user])
      if @user
        @transactions = @user.transactions
      else
        render json: { error: "User not found" }, status: :unprocessable_entity and return
      end
    else
      @transactions = Transaction.all
    end
    render json: @transactions
  end  

  # POST '/transactions' - Create a new transaction
  def create
    # To reject invalid transaction types
    unless ["NCD", "AWL"].include?(params[:transaction_type])
      render json: {}, status: :unprocessable_entity
      return
    end
    @transaction = Transaction.new(transaction_params)
    if @transaction.save
      render json: @transaction, status: :created
    else
      render json: {errors: @transaction.errors.full_messages}, status: :unprocessable_entity
    end
  end
  # def create
  #   if params[:transaction_type] == 'AWL' && BigDecimal(transaction_params[:amount]) > @user.balance
  #     render json: { errors: "Insufficient balance" }, status: :unprocessable_entity
  #   else
  #     Transaction.transaction do
  #       @transaction = Transaction.new(transaction_params)
  #       if @transaction.save
  #         @user.update!(balance: @transaction.user_balance_left)
  #         @atm_machine.update!(balance: @transaction.atm_balance_left)  # Update the AtmMachine balance
  #         render json: @transaction, status: :created
  #       else
  #         render json: {errors: @transaction.errors.full_messages}, status: :unprocessable_entity
  #       end
  #     end
  #   end
  # end

  # GET '/transactions/:id' - Show details of a specific transaction
  def show
    @transaction = Transaction.find(params[:id])
    render json: @transaction
  end

  # PATCH '/transactions/:id' - Update a specific transaction
  # PUT '/transactions/:id' - Update a specific transaction  
  def update
    @transaction = Transaction.find(params[:id])
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE '/transactions/:id' - Delete a specific transaction
  def destroy
    @transaction = Transaction.find(params[:id])
    if @transaction.destroy
      render json: { message: 'Transaction deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete transaction' }, status: :unprocessable_entity
    end
  end

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

  # def transaction_params # raise error if params are not present
  #   transaction_data = params.permit(:user_id, :atm_machine_id, :amount, :transaction_type)
  #   if transaction_data[:transaction_type] == 'NCD'
  #     transaction_data[:user_balance_left] = @user.balance + BigDecimal(transaction_data[:amount])
  #     transaction_data[:atm_balance_left] = @atm_machine.balance + BigDecimal(transaction_data[:amount])
  #   elsif transaction_data[:transaction_type] == 'AWL' && BigDecimal(transaction_data[:amount]) <= @user.balance
  #     transaction_data[:user_balance_left] = @user.balance - BigDecimal(transaction_data[:amount])
  #     transaction_data[:atm_balance_left] = @atm_machine.balance - BigDecimal(transaction_data[:amount])
  #   end
  #   transaction_data
  # end
  def transaction_params
    params.require(:transaction).permit(:user_id, :atm_machine_id, :amount, :transaction_type)
  end

end
