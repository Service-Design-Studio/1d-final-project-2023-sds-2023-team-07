require 'rails_helper'
require "factory_bot_rails"

RSpec.describe UsersController, type: :controller do
    describe "create" do 
        before do 
            @user_params = {user:{
                name: "user_tester", 
                identification_number: "S12345678I",
                balance: 4321, 
                pin: 1234, 
                face_image_url: "https", 
                is_active: 0
            }} 
        end
        it "creates a new user given correct user_params" do
            post :create , params: @user_params
            expect(response).to have_http_status(:success)
        end # Normal unit test

        it "does not create a new user given incorrect user_parmas" do
            expect {
                post :create, params: { user: {} }
            }.to raise_error(ActionController::ParameterMissing) 
        end # Robust test case (missing parameters)
    end

    describe "index" do
        it "gives a table of all users" do
            get :index
            expect(response).to have_http_status(:success)
        end # Normal unit test
    end

    describe "show" do
        before do
            @current_user = User.find_by(id:1)
        end
        it "shows details of a specific user given  valid user id" do
            allow(controller).to receive(:set_current_user).and_return(@current_user)
            get :show
            expect(response).to have_http_status(:success)
        end # Normal unit test

        it "should not give a success response if the user id does not exist" do
            @current_user = User.find_by(id:"This cant be right")
            allow(controller).to receive(:set_current_user).and_return(User.find_by(id:"This cant be right"))
            expect {get :show}.to raise_error(ActiveRecord::RecordNotFound)
        end # Robust test case (invalid parameter)
    end

    describe "update" do
        before do 
            allow(controller).to receive(:set_current_user).and_return(User.find_by(id: 1))
        end
        it "updates a valid user" do
            send_params = {id: 1 ,user: {name: "tester", identification_number: 1234, balance:10000, pin:1234, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:success)
        end # Normal unit test
        
        it "does not update for invalid users" do
            send_params = {id: 38239, user: {name: "tester", identification_number: 1234, balance:10000, pin:1234, face_image_url:"https", is_active:0}}
            expect {post :update , params: send_params}.to raise_error(ActiveRecord::RecordNotFound)
        end # Robust test case (invalid parameter)
    end

    describe "destroy" do
        it "deletes users that are valid" do 
            send_params = {id: 7}
            expect(response).to have_http_status(:success)
        end # Normal unit test

        it "does not deletes users that are valid when tied to foreign key" do 
            send_params = {id: 1}
            expect {post :destroy , params: send_params}.to raise_error(ActiveRecord::InvalidForeignKey)
        end # Boundary test case

        it "does not delete invalid users" do
            send_params = {id: "koaskdas"}
            expect {post :destroy , params: send_params}.to raise_error(ActiveRecord::RecordNotFound)
        end # Robust test case (invalid parameter)
    end
end
