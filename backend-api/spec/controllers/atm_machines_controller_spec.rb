require 'rails_helper'
require 'bigdecimal'
RSpec.describe AtmMachinesController, type: :controller do
  describe "create" do
    before do
        @atm_machine1 = FactoryBot.create(:atm_machine)
        # next line simulates the requst
        post :create, params: { atm_machine: FactoryBot.attributes_for(:atm_machine) }
    end
    it "saves the atm machine into the db  so the response must be filled" do
      expect(response).to have_http_status(:success)
      expect(response.body).to_not be_empty
    end
  end 

# the following test case is a little redundant actually
  describe  "atm_machine_params" do 
    before do 
      @atm_machine_2 = FactoryBot.create(:atm_machine)
    end
    it "ensure that the parameters for the atm machine are of the correct type"do
      expect(@atm_machine_2.atm_id).to be_a(String)
      expect(@atm_machine_2.store_name).to be_a(String)
      expect(@atm_machine_2.address).to be_a(String)
      expect(@atm_machine_2.balance).to be_a(BigDecimal)
    end
  end

end