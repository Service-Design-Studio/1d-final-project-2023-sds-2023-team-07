require 'rails_helper'

RSpec.describe AtmMachinesController, type: :controller do
  describe "create" do
    before do
        @atm_machine1 = FactoryBot.create(:atm_machine)
    end


AtmMachinesController