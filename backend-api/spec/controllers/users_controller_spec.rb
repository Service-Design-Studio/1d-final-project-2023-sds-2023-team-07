require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "POST #create" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          user: {
            name: "John Doe",
            identification_number: "1234567890",
            account_balance: 1000.00,
            passbook_image_url: "https://example.com/passbook_image.jpg",
            atm_card_image_url: "https://example.com/atm_card_image.jpg",
            face_image_url: "https://example.com/face_image.jpg",
            fingerprint_data: "fingerprint_data",
            singpass_data: "singpass_data"
            #Need to edit this
          }
        }
      end

      it "creates a new user" do
        post :create, params: valid_params

        expect(response).to have_http_status(:created)
        expect(User.last.name).to eq("John Doe")
        # Add more expectations based on your requirements
      end
    end

    context "with invalid parameters" do
      let(:invalid_params) do
        {
          user: {
            name: "",
            identification_number: "1234567890",
            account_balance: 1000.00,
            passbook_image_url: "https://example.com/passbook_image.jpg",
            atm_card_image_url: "https://example.com/atm_card_image.jpg",
            face_image_url: "https://example.com/face_image.jpg",
            fingerprint_data: "fingerprint_data",
            singpass_data: "singpass_data"
          }
        }
      end

      it "returns unprocessable entity status and error messages" do
        post :create, params: invalid_params

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["errors"]).to include("Name can't be blank")
        # Add more expectations based on your requirements
      end
    end
  end
end
