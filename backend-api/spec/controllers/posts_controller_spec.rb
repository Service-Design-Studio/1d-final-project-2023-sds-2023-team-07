require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  describe "GET #index" do
    before do
      FactoryBot.create_list(:post, 3)
    end

    it "returns a list of posts" do
      get :index

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe "GET #show" do
    before do
      @post = FactoryBot.create(:post)
    end

    it "returns the post" do
      get :show, params: { id: @post.id }

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)["id"]).to eq(@post.id)
      expect(JSON.parse(response.body)["title"]).to eq(@post.title)
      expect(JSON.parse(response.body)["content"]).to eq(@post.content)
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new post" do
        post_params = { title: "New Post", content: "Lorem ipsum" }

        post :create, params: { post: post_params }

        expect(response).to have_http_status(:created)
        expect(Post.last.title).to eq("New Post")
        expect(Post.last.content).to eq("Lorem ipsum")
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable entity status and error messages" do
        post_params = { title: nil, content: "" }

        post :create, params: { post: post_params }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["errors"]).to include("Title can't be blank", "Content can't be blank")
      end
    end
  end

  describe "PATCH #update" do
    before do
      @post = FactoryBot.create(:post)
    end

    context "with valid parameters" do
      it "updates the post" do
        patch_params = { title: "Updated Title" }

        patch :update, params: { id: @post.id, post: patch_params }

        expect(response).to have_http_status(:success)
        expect(Post.find(@post.id).title).to eq("Updated Title")
      end
    end

    context "with invalid parameters" do
      it "returns unprocessable entity status and error messages" do
        patch_params = { title: "" }

        patch :update, params: { id: @post.id, post: patch_params }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)["errors"]).to include("Title can't be blank")
      end
    end
  end

  describe "DELETE #destroy" do
    before do
      @post = FactoryBot.create(:post)
    end

    it "destroys the post" do
      delete :destroy, params: { id: @post.id }

      expect(response).to have_http_status(:no_content)
      expect(Post.exists?(@post.id)).to be_falsey
    end
  end
end
