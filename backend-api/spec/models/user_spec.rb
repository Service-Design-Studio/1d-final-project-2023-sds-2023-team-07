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
  end

  describe "#authenticate_face" do
    before do
        @user = User.find_by(id:1)
        file_path = 'spec/controllers/correct.txt'
        @file_contents = File.read(file_path)
    end
    xit "returns true for matching face" do
      allow(RekognitionService).to receive(:find_person_by_image).and_return(['ABC123', 99.99996948242188])
        expect(@user.authenticate_face('1')).to eq(true)
    end

    xit "returns false for non-matching face" do
      allow(RekognitionService).to receive(:find_person_by_image).and_return(['ASSAS', 99.99996948242188])
        expect(@user.authenticate_face('1')).to eq(false)
    end
  end
end
