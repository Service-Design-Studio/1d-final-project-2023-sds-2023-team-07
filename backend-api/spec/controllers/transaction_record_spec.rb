require 'rails_helper'
require "factory_bot_rails"

RSpec.describe TransactionsController, type: :controller do
  describe "GET #index" do
    before do
      @request.session[:user_id] =1 #valid user
    end

    it "returns a table of transactions for the user" do
      expected = {"amount"=>"200.0", "atm_balance_left"=>"10200.0", "atm_machine_id"=>1,"created_at" => "2023-07-27T09:45:00.357Z","transaction_type"=>"NCD", "updated_at" => "2023-07-27T09:45:00.357Z", "user_balance_left"=>"2200.0", "user_id"=>1,"id" =>1}
      get :index, params: { user_id: @user_id }
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)[0]).to eq(expected)
    end # Normal unit test

    it "returns 'User not found' if user does not exist" do
      @request.session[:user_id] = :sadasdasdsadsad
      get :index
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)).to eq({ "error" => "Not logged in" })
    end # Robust test case (invalid parameter)

    it "returns all transaction if no user params" do
      get :index 
      expect(response).to have_http_status(:success)
    end # Normal unit test
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new deposit transaction" do
        transaction_params = { user_id: 2, atm_machine_id: 1, amount: 100.0, transaction_type: "NCD"}
        @request.session[:transaction] = transaction_params
        post :create, params: {transaction: transaction_params }
        expect(response).to have_http_status(:created)
        expect(Transaction.last.transaction_type).to eq("NCD")
      end # Integration test, changes other stuff than TransactionModel
    end

    it "creates a new withdrawal transaction" do
      transaction_params = { user_id: 1 , atm_machine_id: 1, amount: 50 , transaction_type: "AWL" }
      @request.session[:transaction] = transaction_params
      post :create
      expect(response).to have_http_status(:created)
      expect(Transaction.last.transaction_type).to eq("AWL")
    end # Integration test, changes other stuff than TransactionModel

    it "does not accept any other transaction types" do
      transaction_params = { user_id: 1 , atm_machine_id: 1, amount: 50 , transaction_type: "XXX" }
      @request.session[:transaction] = transaction_params
      post :create
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end


  describe "GET show" do
    it "show specific transaction for valid id" do
      get :show, params: {id:1}
      expect(response).to have_http_status(:success)
    end # Normal unit test

    it "does not show anything for invalid id" do
      expect {get :show , params: {id: "sadasdasdasdas"}}.to raise_error(ActiveRecord::RecordNotFound)
    end # Robust test case (invalid parameter)
  end

  describe "DELETE destroy" do
    it "deletes transaction if id is valid" do
      @last_transaction_id = Transaction.last().id
      @request.session[:id] = @last_transaction_id
      delete :destroy
      expect(response).to have_http_status(:success)
      expect(@last_transaction_id> Transaction.last().id)
    end # Normal unit test

    it "does not delete transaction if id is invalid" do
      @request.session[:id] = "3213213213"
      delete :destroy
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)).to include('error')
    end # Robust test case (invalid parameter)
  end
end
