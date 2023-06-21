require 'rails_helper'

RSpec.describe TransactionsController, type: :controller do
  describe "GET #index" do
    before do
      @user1 = FactoryBot.create(:user)
      @user2 = FactoryBot.create(:user)
    end

    it "returns a list of transactions for the user" do
      transaction1 = FactoryBot.create(:transaction_record, user: @user1)
      transaction2 = FactoryBot.create(:transaction_record, user: @user2)

      get :index, params: { user_id: @user.id }

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)).to match_array([transaction1.as_json, transaction2.as_json])
    end
  end

  describe "POST #deposit" do
    before do
      @user = FactoryBot.create(:user)
    end

    context "with valid parameters" do
      it "creates a new deposit transaction" do
        transaction_params = { user_id: @user.id, atm_machine_id: 1, amount: 100 }

        post :deposit, params: { transaction: transaction_params }

        expect(response).to have_http_status(:created)
        expect(Transaction.last.transaction_type).to eq("deposit")
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable entity status and error messages" do
        transaction_params = { user_id: @user.id, atm_machine_id: nil, amount: -50 }

        post :deposit, params: { transaction: transaction_params }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["errors"]).to include("Atm machine can't be blank", "Amount must be greater than 0")
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
        expect(Transaction.last.transaction_type).to eq("withdrawal")
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable entity status and error messages" do
        transaction_params = { user_id: @user.id, atm_machine_id: nil, amount: 0 }

        post :withdraw, params: { transaction: transaction_params }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["errors"]).to include("Atm machine can't be blank", "Amount must be greater than 0")
      end
    end
  end
end
