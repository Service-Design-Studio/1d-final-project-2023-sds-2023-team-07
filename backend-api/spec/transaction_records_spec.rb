require 'rails_helper'

RSpec.feature "Transaction Records", type: :feature do
  context "when the app is installed and ran before" do
    before do
      # Create some transaction records for the user
      @user = FactoryBot.create(:user)
      @transaction_records = FactoryBot.create_list(:transactions, 5, user: @user)
      
      # Log in the user
      visit login_path
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      click_button "Log in"
    end

    scenario "launching the app for the first time" do
      # Launch the app
      visit root_path

      # Expect to see the home page
      expect(page).to have_content("Home")

      # Expect to see the familiar transaction records
      @transaction_records.each do |transaction_record|
        expect(page).to have_content(transaction_record.description)
        expect(page).to have_content(transaction_record.amount)
      end
    end
  end
end