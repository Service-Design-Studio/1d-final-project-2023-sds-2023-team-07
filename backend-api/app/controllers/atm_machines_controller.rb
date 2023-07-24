class AtmMachinesController < ApplicationController
  # CREATE
  def create
    @atm_machine = AtmMachine.new(atm_machine_params)
    if @atm_machine.save
      render json: @atm_machine, status: :created
    else
      render json: { errors: @atm_machine.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # READ (Index - fetch all ATM machines)
  def index
    @atm_machines = AtmMachine.all
    render json: @atm_machines
  end

  # READ (Show - fetch a specific ATM machine)
  def show
    @atm_machine = AtmMachine.find(params[:id])
    render json: @atm_machine
  end

  # UPDATE
  def update
    @atm_machine = AtmMachine.find(params[:id])
    if @atm_machine.update(atm_machine_params)
      render json: @atm_machine
    else
      render json: { errors: @atm_machine.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE
  def destroy
    @atm_machine = AtmMachine.find(params[:id])
    if @atm_machine.destroy
      render json: { message: 'ATM machine deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete ATM machine' }, status: :unprocessable_entity
    end
  end
  
  private
  
  # Change :atm_id, :address, and :balance_left to :atm_machine_name
  def atm_machine_params
    params.require(:atm_machine).permit(:atm_machine_name, :store_name, :balance)
  end
end
  