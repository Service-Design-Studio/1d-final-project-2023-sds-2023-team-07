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
    if @transaction.nil?
      render json: { error: "Transaction not found" }, status: :unprocessable_entity
    else
      render json: @transaction
    end
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
    if @current_user.nil? 
      raise ActiveRecord::RecordNotFound
      return
    end
    if @transaction.destroy
      render json: { message: 'Transaction deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete transaction' }, status: :unprocessable_entity
    end
  end

  private

  def set_current_user
    user_id = session[:user_id]  # Get user_id from session or transaction parameters
    @current_user = User.find_by(id: user_id)

    if @current_user.nil? || user_id.to_i <= 0 || user_id > User.last.id 
      render json: { error: "Not logged in or Invalid User ID" }, status: :unprocessable_entity
      return
    end
  end

  def set_transaction
    @transaction = Transaction.find_by(id: params[:id])
    if @transaction.nil? || @transaction.user != @current_user
      render json: { error: "Transaction not found or not authorized" }, status: :unprocessable_entity
    end
  end
  

  def set_atm_machine
    @atm_machine = AtmMachine.find_by(id: params[:atm_machine_id])
    unless @atm_machine
      render json: { error: "ATM Machine not found" }, status: :unprocessable_entity
    end
  end

  def transaction_params
    params.require(:transaction).permit(:atm_machine_id, :amount, :transaction_type)
  end
end
