require 'rails_helper'
require "factory_bot_rails"

RSpec.describe TransactionsController, type: :controller do
  describe "GET #index" do
    before do
      @request.session[:user_id] = 1 #valid user
    end

    ####### VIDEO DEMO UNIT TEST
    it "returns a table of transactions for the user" do
      expected = {"amount"=>"200.0", "atm_balance_left"=>"10200.0", "atm_machine_id"=>1,"created_at" => "2023-07-27T09:45:00.357Z","transaction_type"=>"NCD", "updated_at" => "2023-07-27T09:45:00.357Z", "user_balance_left"=>"2200.0", "user_id"=>1,"id" =>1}
      get :index
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)[0]).to eq(expected)
    end # Normal unit test
    #######

    it "returns 'User not found' if user does not exist" do
      @request.session[:user_id] = :sadasdasdsadsad
      get :index
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to eq({ "error" => "Not logged in or Invalid User ID" })
    end # Robust test case (invalid parameter)


    it "does not return if user id is negative" do 
      @request.session[:user_id] = -1
      get :index
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "POST #create" do
    before do
      @request.session[:user_id] = 1
    end

    ####### VIDEO DEMO INTEGRATION TEST
    it "creates a new deposit transaction" do
      transaction_params = { atm_machine_id: 1, amount: 100.0, transaction_type: "NCD"}
      post :create, params: {transaction: transaction_params, atm_machine_id: 1 }
      expect(response).to have_http_status(:created)
      expect(Transaction.last.transaction_type).to eq("NCD")
    end # Integration test, changes other stuff than TransactionModel

    it "creates a new withdrawal transaction" do
      transaction_params = { atm_machine_id: 1, amount: 50.0 , transaction_type: "AWL" }
      post :create, params: {transaction: transaction_params, atm_machine_id: 1 }
      expect(response).to have_http_status(:created)
      expect(Transaction.last.transaction_type).to eq("AWL")
    end # Integration test, changes other stuff than TransactionModel
    #######

    ####### VIDEO DEMO ROBUST, transaction_type out of domain and expected to go wrong
    it "should return an error for invalid transaction_type" do
      transaction_params = { user_id: 1, atm_machine_id: 1, amount: 50.0, transaction_type: "STH ELSE" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end
    #######

    it "should return an error for negative amount in deposit transaction" do
      transaction_params = { user_id: 1, atm_machine_id: 1, amount: -1, transaction_type: "NCD" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end
    it "should return an error for negative amount in withdrawal transaction" do
      transaction_params = { user_id: 1, atm_machine_id: 1, amount: -1, transaction_type: "AWL" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end
    
    it "should return an error for withdrawal for negative user_id" do
      @request.session[:user_id] = -1
      transaction_params = { user_id: -1, atm_machine_id: 1, amount: 50.0, transaction_type: "AWL" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for withdrawal out of range user_id" do
      request.session[:user_id] = User.last.id + 1
      transaction_params = { user_id: 100000, atm_machine_id: 1, amount: 50.0, transaction_type: "AWL" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for withdrawal invalid atm_machine_id" do
      transaction_params = { user_id: 1, atm_machine_id: -1, amount: 50.0, transaction_type: "AWL" }

      post :create, params: { transaction: transaction_params , atm_machine_id:-1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for withdrawal out of range atm_machine_id" do
      transaction_params = { user_id: 1, atm_machine_id: 100000, amount: 50.0, transaction_type: "AWL" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:100000  }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for deposit invalid transaction amount " do
      transaction_params = { user_id: 1, atm_machine_id: 1, amount: -50.0, transaction_type: "NCD" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end
    
    it "should return an error for deposit invalid user_id" do
      @request.session[:user_id] = -1
      transaction_params = { user_id: -1, atm_machine_id: 1, amount: 50.0, transaction_type: "NCD" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:1  }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for deposit out of range user_id" do
      @request.session[:user_id] = User.last.id + 1
      transaction_params = { user_id: 100000, atm_machine_id: 1, amount: 50.0, transaction_type: "NCD" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:100000  }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for deposit invalid atm_machine_id" do
      transaction_params = { user_id: 1, atm_machine_id: -1, amount: 50.0, transaction_type: "NCD" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:-1 }
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "should return an error for deposit out of range atm_machine_id" do
      transaction_params = { user_id: 1, atm_machine_id: 100000, amount: 50.0, transaction_type: "NCD" }
       
      post :create, params: { transaction: transaction_params , atm_machine_id:100000 }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end


  describe "GET show" do
    before do
      @request.session[:user_id] = 1 #valid user
    end

    it "show specific transaction for valid id" do
      get :show, params: {id:1}
      expect(response).to have_http_status(:success)
    end # Normal unit test

    it "does not show anything for invalid id" do
      get :show , params: {id: "asdfsdf"}
      expect(response).to have_http_status(:unprocessable_entity)
    end # Robust test case (invalid parameter) 
    it "does not show anything for negative id" do
      get :show , params: {id: -1}
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "DELETE destroy" do
    before do
      @request.session[:user_id] = 1 #valid user
    end

    it "deletes transaction if id is valid" do
      @last_transaction_id = Transaction.last.id
      delete :destroy, params: {id: @last_transaction_id}
      expect(response).to have_http_status(:success)
      expect(@last_transaction_id > Transaction.last.id)
    end # Normal unit test

    it "does not delete transaction if id is invalid" do
      delete :destroy, params: {id:"asdfdsfasf"}
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include('error')
    end # Robust test case (invalid parameter)

    it "does not delete transaction if id is negative" do
      delete :destroy, params: {id:-1}
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to include('error')
    end
  end
end
