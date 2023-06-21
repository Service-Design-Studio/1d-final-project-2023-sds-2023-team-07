require 'rails_helper'

RSpec.describe TransactionsController, type: :controller do
  # Find the first entry
  describe "GET #index" do
    before do
      @user_id = 3
    end

    it "returns a table of transactions for the user" do
      transaction1 = {"amount"=>"100.0", "atm_machine_id"=>1, "created_at"=>"2023-06-21T13:24:18.756Z", "id"=>1, "transaction_type"=>0, "transaction_types"=>nil, "updated_at"=>"2023-06-21T13:24:18.756Z", "user_id"=>3}
  
      get :index, params: { user_id: @user_id }
  
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to match_array([transaction1.as_json])
    end
  end

  describe "POST #deposit" do
    before do
      @user = FactoryBot.create(:user)
      puts @user
    end

    context "with valid parameters" do
      it "creates a new deposit transaction" do
        transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 100 }

        post :deposit, params: { transaction: transaction_params }

        expect(response).to have_http_status(:created)
        expect(Transaction.last.transaction_type).to eq(0)
      end
    end
  end

  describe "POST #withdraw" do
    before do
      @user = FactoryBot.create(:user)
    end

    context "with valid parameters" do
      it "creates a new withdrawal transaction" do
        transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 50 }

        post :withdraw, params: { transaction: transaction_params }

        expect(response).to have_http_status(:created)
        expect(Transaction.last.transaction_type).to eq(1)
      end
    end
  end
end
