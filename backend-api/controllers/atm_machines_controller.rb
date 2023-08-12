class AtmMachinesController < ApplicationController
  # POST '/atm_machines' - Create a new ATM machine
  def create
    @atm_machine = AtmMachine.new(atm_machine_params)
    if @atm_machine.save
      render json: @atm_machine, status: :created
    else
      render json: { errors: @atm_machine.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET '/atm_machines' - List all ATM machines
  def index
    @atm_machines = AtmMachine.all
    render json: @atm_machines
  end

  # GET '/atm_machines/:id' - Show details of a specific ATM machine
  def show
    @atm_machine = AtmMachine.find(params[:id])
    render json: @atm_machine
  end 

  # PATCH '/atm_machines/:id' - Update a specific ATM machine
  # PUT '/atm_machines/:id' - Update a specific ATM machine
  def update
    @atm_machine = AtmMachine.find(params[:id])
    if @atm_machine.update(atm_machine_params)
      render json: @atm_machine
    else
      render json: { errors: @atm_machine.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE '/atm_machines/:id' - Delete a specific ATM machine
  def destroy
    @atm_machine = AtmMachine.find(params[:id])
    if @atm_machine.destroy
      render json: { message: 'ATM machine deleted successfully' }, status: :ok
    else
      render json: { errors: 'Failed to delete ATM machine' }, status: :unprocessable_entity
    end
  end
  
  # private
  
  # Change :atm_id, :address, and :balance_left to :atm_machine_name
  def atm_machine_params
    params.require(:atm_machine).permit(:atm_machine_name, :store_name, :balance)
  end
end
