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
  
    def atm_machine_params
      params.require(:atm_machine).permit(:atm_id, :store_name, :address, :balance)
    end
end
  