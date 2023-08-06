require 'rails_helper'
require "factory_bot_rails"

RSpec.describe AuthenticationController, type: :controller do
    describe "pin" do
        before do
            @name = "Kelvin"
        end
        it "authenticates if correct pin for correct user" do
            correct_pin = 1234
            post :pin, params: { pin: correct_pin, name:@name}
            expect(JSON.parse(response.body)["authenticated"]).to eq(true)
            expect(JSON.parse(response.body)["message"]).to eq("No issues")
            expect(response).to have_http_status(:success)
        end # Normal unit test

        it "does not authenticate if wrong pin for correct user" do
            @wrong_pin = 123812
            post :pin, params: { pin: @wrong_pin, name:@name}
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Pin authentication failed")
            expect(response).to have_http_status(:success)
        end # Boundary test case

        it "does not authenticate if either pin or user is not declared" do 
            post :pin, params: { pin: @wrong_pin}
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Server error")
            expect(response).to have_http_status(:unprocessable_entity)
        end # Robust test case (missing parameter)     
    end

    describe "face" do
        before do
            @name = "Kelvin"
        end

        it "authenticates if correct user face for user" do

            fileObject = File.open("spec/controller/correct.txt","r");
            base_64_string = fileObject.read.to_s
            post :face, params: {image:base_64_string,name:@name}
            expect(JSON.parse(response.body)["authenticated"]).to eq(true)
            expect(JSON.parse(response.body)["message"]).to eq("No issues")
            expect(response).to have_http_status(:success)
        end # Normal unit test

        it "does not authenticate if wrong face for correct user" do
            fileObject = File.open("spec/controller/wrong.txt", "r")
            base_64_string = fileObject.read.to_s
            post :face, params: {image:base_64_string,name:@name}
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Face authentication failed")
            expect(response).to have_http_status(:success)
        end # Boundary test case

        it "only authenticate if both face and name is present" do
            post :face, params: {image: "sdasd"}
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Server error")
            expect(response).to have_http_status(:unprocessable_entity)
        end # Robust test case (missing parameter)
    end
end
