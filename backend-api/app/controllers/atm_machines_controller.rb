class AtmMachinesController < ApplicationController
    def create
      @atm_machine = AtmMachine.new(atm_machine_params)
      if @atm_machine.save
        render json: @atm_machine, status: :created
      else
        render json: { errors: @atm_machine.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
  # Change :atm_id, :address, and :balance_left to :atm_machine_name
  def atm_machine_params
    params.require(:atm_machine).permit(:atm_machine_name, :store_name, :balance)
  end
end
  