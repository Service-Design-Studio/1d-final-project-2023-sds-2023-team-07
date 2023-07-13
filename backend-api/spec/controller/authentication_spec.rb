require require 'rails_helper'
require "factory_bot_rails"

#this is the class name
RSpec.describe Authentication_controller, type: :controller do
    #this is the pin method name
    describe "pin" do
        before do
            @name = "Kelvin"
        end
        it "authenticates if correct pin for correct user" do
            # so i will send the correct pin by checking the db beforehand for the correct value
            correct_pin = 999999
            
            #do a post to get the response, for params just put and fake all params needed
            post :pin_authenticate_method, params: { pin: correct_pin, name:@name}
            #JSON.parse(response) should return me a dictionary
            # change the ["authenticated to the actual key name"]
            expect(JSON.parse(reponse.body)["authenticated"]).to eq(true)
            expect(JSON.parse(reponse.body)["message"]).to eq("No issues")
            expect(response).to have_http_status(:success)
        end
        it "does not authenticate if wrong pin for correct user" do
            # so i will send the wrong pin now
            wrong_pin = 123812
            #do a post to get the response, for params just put and fake all params needed
            post :pin_authenticate_method, params: { pin: wrong_pin, name:@name}
            #JSON.parse(response) should return me a dictionary
            # change the ["authenticated to the actual key name"]
            expect(JSON.parse(reponse.body)["authenticated"]).to eq(false)
            expect(JSON.parse(reponse.body)["message"]).to eq("Face authentication failed")
            expect(response).to have_http_status(:success)
        end
        it "does not authenticate if either pin or user is not declared" do 
            post :pin_authenticate_method, params: { pin: wrong_pin}
            #JSON.parse(response) should return me a dictionary
            # change the ["authenticated to the actual key name"]
            expect(JSON.parse(reponse.body)["authenticated"]).to eq(false)
            expect(JSON.parse(reponse.body)["message"]).to eq("Server error")
            expect(response).to have_http_status(:not_found)
        end        
    end
    #this is the facial method name
    describe "face" do
        before do
            @name = "Kelvin"
        end

        it "authenticates if correct user face for user" do
            # so i parse a txt file with base 64 encoded image of correct user face
            fileObject = File.open("correct.txt","r");
            base_64_string = fileObject.read

            post :facial_authentication_method, params {base_64_string:base_64_string}

            expect(JSON.parse(reponse.body)["authenticated"]).to eq(true)
            expect(JSON.parse(reponse.body)["authenticated"]).to eq("No issues")
            expect(response).to have_http_status(:success)
        end
        it "does not authenticate if wrong face for correct user" do
            # so i parse a txt file with base 64 encoded image of wrong user face
            fileObject = File.open("wrong.txt","r");
            base_64_string = fileObject.read
            post :facial_authentication_method, params {base_64_string:base_64_string}
            expect(JSON.parse(reponse.body)["authenticated"]).to eq(false)
            expect(JSON.parse(reponse.body)["authenticated"]).to eq("Face authentication failed")
            expect(response).to have_http_status(:success)
        end
        it "only authenticate if both face and name is present" do
            post :facial_authentication_method, params {image:base_64_string , name:@name}
            expect(JSON.parse(reponse.body)["authenticated"]).to eq(false)
            expect(JSON.parse(reponse.body)["message"]).to eq("Server error")
            expect(response).to have_http_status(:not_found)
        end


    end
