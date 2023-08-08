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
    end
    it "returns true for matching face" do
        allow(@user).to receive(:find_person_using_image).and_return(['ABC123', 99])
        expect(@user.authenticate_face('')).to eq(true)
    end

    it "returns false for non-matching face" do
        allow(@user).to receive(:find_person_using_image).and_return(['ASSAS', 99])
        expect(@user.authenticate_face('')).to eq(false)
    end
  end
end
