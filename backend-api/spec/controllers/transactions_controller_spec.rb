require 'rails_helper'
require 'factory_bot_rails'
RSpec.describe TransactionsController, type: :controller do
  describe "#transaction_params" do
    let(:params) do
      ActionController::Parameters.new(
        transaction: {
          user_id: 2,
          atm_machine_id: 1,
          amount: 10.0
        }
      )
    end

    it "returns the permitted transaction parameters" do
      # Stub the controller's params method to return the test params
      allow(controller).to receive(:params).and_return(params)

      # Call the transaction_params method
      permitted_params = controller.send(:transaction_params)

      # Assert that the permitted parameters are as expected
      expect(permitted_params.to_h).to eq({
        "user_id" => 2,
        "atm_machine_id" => 1,
        "amount" => 10.0
      })
    end

    it "raises an error if required parameters are missing" do
      # Stub the controller's params method to return an empty params hash
      allow(controller).to receive(:params).and_return(ActionController::Parameters.new({}))

      # Call the transaction_params method and expect it to raise an error
      expect { controller.send(:transaction_params) }.to raise_error(ActionController::ParameterMissing)
    end
  end



  # Find the first entry
  describe "GET #index" do
    before do
      # default testing user
      @user_id = 2
      get :index, params: { user_id: @user_id }
    end
    it "returns a table of transactions for the user" do
      # correct response code
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).first).to match_array(transaction1.as_json)
    end
  end

  describe "transaction_with_balance_params" do
    # set the default user and atm id
    before do
      @user_id = 2
      @atm_machine_id = 1
      @user = User.find_by(id: @user_id)
      @atm_machine = AtmMachine.find(@atm_machine_id)
    end
    let(:user) { @user }
    let(:atm_machine) { @atm_machine }
    let(:transaction_params)do
      {user_id: @user_id,
      atm_machine_id: @atm_machine_id,
      amount: deposit_amount}
    end

    context "deposit" do


      it "processes valid deposit entries" do
        type = "deposit"
        deposit_amount = 0.01
        expected_user_balance_left = @user.account_balance + deposit_amount
        expected_atm_balance_left = @atm_machine.balance + deposit_amount

        # Stub the transaction_params method to return the desired parameters
        allow(controller).to receive(:transaction_params).and_return({
          user_id: @user_id,
          atm_machine_id: @atm_machine_id,
          amount: deposit_amount
        })

        # Call the transaction_with_balance_params method for deposit
        result = controller.send(:transaction_with_balance_params, type)

        # Assert that the returned transaction data for deposit is as expected
        expect(result).to eq({
          user_id: @user_id,
          atm_machine_id: @atm_machine_id,
          amount: deposit_amount,
          transaction_type: type,
          user_balance_left: expected_user_balance_left,
          atm_balance_left: expected_atm_balance_left
        })
      end
    end

    context "with valid parameters" do
      it "creates a new deposit transaction" do
        transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 100 }
        post :deposit, params: { transaction: transaction_params }
        #So it actually writes into the database
        expect(response).to have_http_status(:created)
        #latest record is 0 which is a deposit
        expect(Transaction.last.transaction_type).to eq(0)
      end
    end
  end


  describe "POST deposit" do
    # set the default user and atm id
    before do
      @user_id = 2
      @atm_machine_id = 1
      @user = User.find_by(id: @user_id)
      @atm_machine = AtmMachine.find(@atm_machine_id)
    end

    context "with valid parameters" do
      it "creates a new withdrawal transaction" do
        transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 50 }
        puts transaction_params

        post :withdraw, params: { transaction: transaction_params }

    it "returns a success for valid deposit" do
      @transaction = Transaction.new(transaction_with_balance_params('deposit'))
      # correct response code
      expect(response).to have_http_status(:success)
      # correct response body such that we only check that it contains the first transaction in the table
      expected_response = {"amount"=>"10.0", "atm_balance_left"=>"10010.0", "atm_machine_id"=>1, "created_at"=>"2023-07-05T12:29:31.542Z" ,"transaction_type" => "deposit", "updated_at"=>"2023-07-05T12:29:31.542Z", "user_balance_left"=>"3010.0", "user_id"=>2 ,"id" => 1}
      expect(JSON.parse(response.body)).to eq(expected_response)
    end
  end
end
