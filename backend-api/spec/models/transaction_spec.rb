require 'rails_helper'

RSpec.describe Transaction, type: :model do
  describe ".create_for_user!" do
    let(:user) { User.find_by(id: 1 ) }
    let(:atm_machine) { AtmMachine.find_by(id:1) }
    let(:transaction_params) do
      {
        transaction_type: 'NCD',
        amount: 100,
        atm_machine_id: atm_machine.id
      }
    end

    context "when ATM machine exists" do
      it "creates a new transaction for the user" do
        expect {
          described_class.create_for_user!(transaction_params, user)
        }.to change(Transaction, :count).by(1)
      end

      it "sets the user and ATM machine correctly" do
        transaction = described_class.create_for_user!(transaction_params, user)
        expect(transaction.user).to eq(user)
        expect(transaction.atm_machine).to eq(atm_machine)
      end
    end

    context "when ATM machine does not exist" do
      it "raises ActiveRecord::RecordInvalid with error message" do
        expect {
          described_class.create_for_user!(transaction_params.merge(atm_machine_id: 999), user)
        }.to raise_error(ActiveRecord::RecordInvalid, /ATM Machine not found/)
      end
    end
  end
end
