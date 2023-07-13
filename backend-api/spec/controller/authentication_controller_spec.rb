require 'rails_helper'
require "factory_bot_rails"

#this is the class name
RSpec.describe AuthenticationController, type: :controller do
    #this is the pin method name
    describe "pin" do
        before do
            @name = "Kelvin"
        end
        it "authenticates if correct pin for correct user" do
            # so i will send the correct pin by checking the db beforehand for the correct value
            correct_pin = 1234
            
            #do a post to get the response, for params just put and fake all params needed
            post :pin, params: { pin: @correct_pin, name:@name}
            #JSON.parse(response) should return me a dictionary
            # change the ["authenticated to the actual key name"]
            expect(JSON.parse(response.body)["authenticated"]).to eq(true)
            expect(JSON.parse(response.body)["message"]).to eq("No issues")
            expect(response).to have_http_status(:success)
        end
        it "does not authenticate if wrong pin for correct user" do
            # so i will send the wrong pin now
            @wrong_pin = 123812
            #do a post to get the response, for params just put and fake all params needed
            post :pin, params: { pin: @wrong_pin, name:@name}
            #JSON.parse(response) should return me a dictionary
            # change the ["authenticated to the actual key name"]
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Pin authentication failed")
            expect(response).to have_http_status(:success)
        end
        it "does not authenticate if either pin or user is not declared" do 
            post :pin, params: { pin: @wrong_pin}
            #JSON.parse(response) should return me a dictionary
            # change the ["authenticated to the actual key name"]
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Server error")
            expect(response).to have_http_status(:unprocessable_entity)
        end        
    end
    #this is the facial method name
    describe "face" do
        before do
            @name = "Kelvin"
        end

        xit "authenticates if correct user face for user" do
            # so i parse a txt file with base 64 encoded image of correct user face
            fileObject = File.open("spec\\controller\\correct.txt","r");
            base_64_string = fileObject.read.to_s
            post :face, params: {image:base_64_string,name:@name}

            expect(JSON.parse(response.body)["authenticated"]).to eq(true)
            expect(JSON.parse(response.body)["message"]).to eq("No issues")
            expect(response).to have_http_status(:success)
        end
        xit "does not authenticate if wrong face for correct user" do
            # so i parse a txt file with base 64 encoded image of wrong user face
            fileObject = File.open("spec/controller/wrong.txt", "r")
            base_64_string = fileObject.read.to_s
            post :face, params: {image:base_64_string,name:@name}
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Face authentication failed")
            expect(response).to have_http_status(:success)
        end
        xit "only authenticate if both face and name is present" do
            #wrong format
            post :face, params: {image: "sdasd"}
            expect(JSON.parse(response.body)["authenticated"]).to eq(false)
            expect(JSON.parse(response.body)["message"]).to eq("Server error")
            expect(response).to have_http_status(:unprocessable_entity)
        end


    end

end
