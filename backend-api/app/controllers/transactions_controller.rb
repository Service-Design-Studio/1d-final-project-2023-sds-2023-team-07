class TransactionsController < ApplicationController
  before_action :set_current_user
  before_action :set_transaction, only: [:show, :update, :destroy]
  before_action :set_atm_machine, only: [:create]

  # GET '/transactions'
  def index
    render json: @current_user.transactions
  end  

  # POST '/transactions'
  def create
    @transaction = Transaction.create_for_user!(transaction_params, @current_user)
    render json: @transaction, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end


  # GET '/transactions/:id'
  def show
    render json: @transaction
  end

  # PATCH '/transactions/:id' or PUT '/transactions/:id'
  def update
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: { errors: @transaction.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE '/transactions/:id'
  def destroy
    if @transaction.destroy
      render json: { message: 'Transaction deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete transaction' }, status: :unprocessable_entity
    end
  end

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id])
    unless @current_user
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end

  def set_transaction
    @transaction = Transaction.find_by(id: params[:id])
    if @transaction.nil? || @transaction.user != @current_user
      render json: { error: "Transaction not found or not authorized" }, status: :not_found
    end
  end
  

  def set_atm_machine
    @atm_machine = AtmMachine.find_by(id: params[:atm_machine_id])
    unless @atm_machine
      render json: { error: "ATM Machine not found" }, status: :not_found
    end
  end

  def transaction_params
    params.require(:transaction).permit(:atm_machine_id, :amount, :transaction_type)
  end
end
