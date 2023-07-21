require 'rails_helper'
require "factory_bot_rails"

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
      @user_id = 1
      get :index, params: { user_id: @user_id }
    end

    it "returns a table of transactions for the user" do
      expected = {"amount" => "19.0", "atm_balance_left" => "15019.0", "atm_machine_id" => 2, "created_at" => "2023-07-13T07:16:54.142Z" ,"id"=> 1, "transaction_type"=> "NCD", "updated_at"=> "2023-07-13T07:16:54.142Z", "user_balance_left"=> "2019.0", "user_id"=> 1}

      get :index, params: { user_id: @user_id }
      # correct response code
      expect(response).to have_http_status(:success)
      # correct response body such that we only check that it contains the first transaction in the table
      expect(JSON.parse(response.body)[0]).to eq(expected)
    end

    it "returns 'User not found' if user does not exist" do
      # we should not have this user since it is not an int
      get :index, params: { user_id: :sadasdas }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ "error" => "User not found" })
    end
  end
  

  describe "transaction_with_balance_params" do
    # set the default user and atm id
    before do
      @user_id = 1
      @atm_machine_id = 1
      @user = User.find_by(id: @user_id)
      @atm_machine = AtmMachine.find(@atm_machine_id)
    end
    let(:atm_machine) { @atm_machine }
    let(:params) do
      {user_id: @user_id , atm_machine_id: @atm_machine_id}
    end
    let(:transaction_params) do
      { 
        user_id: @user_id,
        atm_machine_id: @atm_machine_id,
        amount: deposit_amount,
      }
    end

    
    context "withdrawal" do
      it "processes valid withdrawal entries" do
        type = "AWL"
        withdrawal_amount = 0.01
        expected_user_balance_left = @user.account_balance - withdrawal_amount
        expected_atm_balance_left = @atm_machine.balance - withdrawal_amount
        # Stub the transaction_params method to return the desired parameters
        allow(controller).to receive(:transaction_params).and_return({
          user_id: @user_id,
          atm_machine_id: @atm_machine_id,
          amount: withdrawal_amount
        })
        # Call the transaction_with_balance_params method for withdrawal
        allow(controller).to receive(:params).and_return(params)
        controller.send(:set_user)
        controller.send(:set_atm_machine)
        result = controller.send(:transaction_with_balance_params, type)

        # Assert that the returned transaction data for withdrawal is as expected
        expect(result).to eq({
          user_id: @user_id,
          atm_machine_id: @atm_machine_id,
          amount: withdrawal_amount,
          transaction_type: type,
          atm_balance_left: 0.1010099e5,
          user_balance_left: 0.193899e4
        })
      end
    end

    context "deposit" do
      it "processes valid deposit entries" do
        type = "NCD"
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
        allow(controller).to receive(:params).and_return(params)
        controller.send(:set_user)
        controller.send(:set_atm_machine)
        result = controller.send(:transaction_with_balance_params, type)

        # Assert that the returned transaction data for deposit is as expected
        expect(result).to eq({
          user_id: @user_id,
          atm_machine_id: @atm_machine_id,
          amount: deposit_amount,
          transaction_type: type,
          atm_balance_left:  0.1010101e5 , 
          user_balance_left: 0.193901e4
        })
      end
    end
  end

  describe "POST #deposit" do
    before do
      @user = User.find_by(id: 1)
      @transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 0.01 }
      @params = {user_id: 1 , atm_machine_id: 1 }
    end
    let(:params) {@params}
    let(:atm_machine) { @atm_machine }
    let(:transaction_params) {@transaction_params}

    context "with valid parameters" do
      it "creates a new deposit transaction" do
        allow(controller).to receive(:params).and_return(params)
        allow(controller).to receive(:transaction_params).and_return({ 
          user_id: @user.id, atm_machine_id: 1, amount: 0.01 }
        )
        controller.send(:set_user)
        controller.send(:set_atm_machine)

        post :deposit, params: { transaction: @transaction_params }
        # So it actually writes into the database
        expect(response).to have_http_status(:created)
        # latest record is 0 which is a deposit
        expect(Transaction.last.transaction_type).to eq("NCD")
      end
    end
  end   

  describe "POST #withdraw" do
    before do
      @user = User.find_by(id: 1)
      @transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 0.01 }
      @params = { user_id: 1, atm_machine_id: 1 }
    end
    let(:params) {@params}
    let(:atm_machine) { @atm_machine }
    let(:transaction_params) {@transaction_params}
  
    context "with valid parameters" do
      it "creates a new withdrawal transaction" do
        allow(controller).to receive(:params).and_return(params)
        allow(controller).to receive(:transaction_params).and_return({ 
          user_id: @user.id, atm_machine_id: 1, amount: 0.01 }
        )
        controller.send(:set_user)
        controller.send(:set_atm_machine)

        post :withdraw, params: { transaction: @transaction_params }
  
        # So it actually writes into the database
        expect(response).to have_http_status(:created)
  
        # latest record is 0 which is a deposit
        expect(Transaction.last.transaction_type).to eq("AWL")
      end
    end
  end
end
