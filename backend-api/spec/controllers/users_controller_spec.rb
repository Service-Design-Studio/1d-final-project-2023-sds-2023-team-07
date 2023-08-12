require 'rails_helper'
require "factory_bot_rails"

RSpec.describe UsersController, type: :controller do
    describe "create" do 
        before do 
            @user_params = {user:{
                name: "user_tester", 
                identification_number: "S12345678I",
                balance: 4321, 
                pin: "1234", 
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
        it "does not create if negative balance" do 
            user_params = {user:{
                name: "user_tester", 
                identification_number: "S12345678I",
                balance: -1, 
                pin: "1234", 
                face_image_url: "https", 
                is_active: 0
            }} 
            post :create , params: user_params
            expect(response).to have_http_status(:unprocessable_entity)
        end
        it "does not create if pin have more than 4 digits" do 
            user_params = {user:{
                name: "user_tester", 
                identification_number: "S12345678I",
                balance: 1, 
                pin: "123456", 
                face_image_url: "https", 
                is_active: 0
            }} 
            post :create , params: user_params
            expect(response).to have_http_status(:unprocessable_entity)
        end
        it "does not create if pin less than 4 digits" do 
            user_params = {user:{
                name: "user_tester", 
                identification_number: "S12345678I",
                balance: 1, 
                pin: "123", 
                face_image_url: "https", 
                is_active: 0
            }} 
            post :create , params: user_params
            expect(response).to have_http_status(:unprocessable_entity)
        end
    end

    describe "index" do
        it "gives a table of all users" do
            get :index
            expect(response).to have_http_status(:success)
        end # Normal unit test
    end

    describe "show" do
        before do
            @valid_id = 1
            @invalid_id = 9021312903
        end
        it "shows details of a specific user given  valid user id" do
            @request.session[:user_id] = @valid_id
            get :show
            expect(response).to have_http_status(:success)
            expect(JSON.parse(response.body)).to include('name', 'identification_number', 'balance', 'pin', 'face_image_url', 'is_active')
        end # Normal unit test

        it "should not give a success response if the user id does not exist" do
            @request.session[:user_id] = @invalid_id
            allow(controller).to receive(:set_current_user).and_return(User.find_by(id:"This cant be right"))
            expect {get :show}.to raise_error(ActiveRecord::RecordNotFound)
        end # Robust test case (invalid parameter)
        it "should not give a success response if the user id is negative" do
            @request.session[:user_id] = -1
            allow(controller).to receive(:set_current_user).and_return(User.find_by(id:"This cant be right"))
            expect {get :show}.to raise_error(ActiveRecord::RecordNotFound)
        end
    end

    describe "update" do
        it "updates a valid user" do
            @request.session[:user_id] = 1
            send_params = {id: 1 ,user: {name: "tester", identification_number: 1234, balance:10000, pin:1234, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:success)
        end # Normal unit test
        
        it "does not update for invalid users" do
            @request.session[:user_id] = 38239
            send_params = {id: 38239, user: {name: "tester", identification_number: 1234, balance:10000, pin:1234, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:unauthorized)
        end # Robust test case (invalid parameter)
        it "does not update for negative id" do
            @request.session[:user_id] = -1
            send_params = {id: -1, user: {name: "tester", identification_number: 1234, balance:10000, pin:1234, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:unauthorized)
        end
        it "does not update for pin more than 4 digits " do
            @request.session[:user_id] = 1
            send_params = {id: 1, user: {name: "tester", identification_number: 1234, balance:10000, pin:123456, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:unprocessable_entity)
        end
        it "does not update for pin less than 3digits " do
            @request.session[:user_id] = 1
            send_params = {id: 1, user: {name: "tester", identification_number: 1234, balance:10000, pin:123, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:unprocessable_entity)
        end
        it "does not update for negative balance " do
            @request.session[:user_id] = 1
            send_params = {id: 1, user: {name: "tester", identification_number: 1234, balance:-1, pin:1234, face_image_url:"https", is_active:0}}
            post :update , params: send_params
            expect(response).to have_http_status(:unprocessable_entity)
        end
    end

    describe "destroy" do
        it "deletes users that are valid with no foreign key" do 
            @request.session[:user_id] = 7
            post :destroy
            expect(response).to have_http_status(:success)
        end # Normal unit test

        it "does not deletes users that are valid when tied to foreign key" do 
            @request.session[:user_id] = 1
            send_params = {id: 1}
            expect {post :destroy , params: send_params}.to raise_error(ActiveRecord::InvalidForeignKey)
        end # Boundary test case

        it "does not delete invalid users" do
            @request.session[:user_id] ="koaskdas"
            send_params = {id: "koaskdas"}
            delete :destroy 
            expect(response).to have_http_status(:unauthorized)
        end # Robust test case (invalid parameter)
        it "does not delete negative id users" do
            @request.session[:user_id] =-1
            send_params = {id: -1}
            delete :destroy 
            expect(response).to have_http_status(:unauthorized)
        end
    end
end
