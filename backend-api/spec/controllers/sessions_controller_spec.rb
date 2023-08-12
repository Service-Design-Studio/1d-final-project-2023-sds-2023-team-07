require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe "create" do
    it "new session with valid user params" do 
      param_dict = {identification_number: "ABC123" , pin:1234}
      post :create, params:  param_dict
      expect(JSON.parse(response.body)["logged_in"]).to eq(true)
    end

    it "returns logged_in false if user pin is wrong" do
      param_dict = {identification_number: "ABC123" , pin:0000}
      post :create, params: param_dict
      expect(JSON.parse(response.body)["logged_in"]).to eq(false)
    end

    it "returns inprocessible entity if param fields are invalid" do
      param_dict = {}
      post :create, params: param_dict
      expect(response).to have_http_status(:unprocessable_entity)    end

  end

  describe "destroy" do
    it "resets logged_in to false" do
      delete :destroy
      expect(JSON.parse(response.body)["logged_in"]).to eq(false)
    end

  end

  describe "is_logged" do 

    it " returns a valid session if user is logged in  " do
      @current_user = User.find_by(identification_number:"ABC123")
      session[:user_id] = @current_user.id
      get :is_logged
      expect(JSON.parse(response.body)["logged_in"]).to eq(true)
    end

    it "does not return a session if user is not logged in" do
      @current_user = false
      get :is_logged 
      expect(JSON.parse(response.body)["logged_in"]).to eq(false)
    end
  end

 
end
