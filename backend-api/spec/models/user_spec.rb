require 'rails_helper'

RSpec.describe User, type: :model do
  describe "#authenticate_pin" do
    before do
        @user = User.find_by(id:1)
    end

    it "returns true for correct pin" do
      expect(@user.authenticate_pin('1234')).to eq(true)
    end

    it "returns false for incorrect pin" do
      expect(@user.authenticate_pin('5678')).to eq(false)
    end
    it "returns false for no pin provided" do
      expect(@user.authenticate_pin(nil)).to eq(false)
    end
    it "returns false for empty pin provided" do
      expect(@user.authenticate_pin("")).to eq(false)
    end
  end

  describe "#authenticate_face" do
    before do
      @user = User.find_by(id: 1)
      file_path = 'spec/controllers/correct.txt'
      @correct = File.read(file_path)
      wrong_file_path = 'spec/controllers/wrong.txt'
      @wrong = File.read(wrong_file_path)
      dog_file_path = 'spec/controllers/dog.txt'
      @dog = File.read(dog_file_path)
    end
  
    it "returns true for matching face" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect(@user.authenticate_face(@correct)).to eq(true)
    end
  
    it "returns false for non-matching face" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect(@user.authenticate_face(@wrong)).to eq(false)
    end
  
    it "returns false for image with low confidence" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect(@user.authenticate_face(@wrong)).to eq(false)
    end
  
    it "returns a response if image provided contains 'data:image/jpeg;base64,' prefix" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect(@user.authenticate_face(@correct)).to eq(true)
    end
  
    it "raises ValidationException for invalid or corrupted base64_image" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect {
        @user.authenticate_face('1')
      }.to raise_error(Aws::Rekognition::Errors::ValidationException)
    end
    
  
    it "returns false if empty base64_image" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect {
        @user.authenticate_face('1')
      }.to raise_error(Aws::Rekognition::Errors::ValidationException)
    end
  
    it "raises InvalidParameterException for non-face base64_image" do
      allow(@user).to receive(:identification_number).and_return('ABC123')
      expect {
        @user.authenticate_face(@dog)
      }.to raise_error(Aws::Rekognition::Errors::InvalidParameterException)
    end    
  
    it "returns true or false based on highest index face for different people for base64 image" do
      allow(@user).to receive(:identification_number).and_return('ryan')
      expect(@user.authenticate_face(@correct)).to eq(false)
    end
  end
end
