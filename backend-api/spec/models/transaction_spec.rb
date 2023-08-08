require 'rails_helper'

RSpec.describe Transaction, type: :model do
  describe "after_create" do
    context "when transaction type is NCD" do
      let(:user) { User.find_by(id: 1) }
      let(:atm_machine) { AtmMachine.find_by(id:1) }
      let(:transaction) do
        Transaction.create(
          user: user,
          atm_machine: atm_machine,
          transaction_type: 'NCD',
          amount: 50
        )
      end

      it "updates user and ATM machine balances" do
        expect {
          transaction
        }.to change { user.reload.balance }.by(50)
         .and change { atm_machine.reload.balance }.by(50)
      end
    end
    context "when transaction type is AWL" do
      let(:user) { User.find_by(id: 1) }
      let(:atm_machine) { AtmMachine.find_by(id:1) }
      let(:transaction) do
        Transaction.create(
          user: user,
          atm_machine: atm_machine,
          transaction_type: 'AWL',
          amount: 50
        )
      end

      it "updates user and ATM machine balances" do
        expect {
          transaction
        }.to change { user.reload.balance }.by(-50)
         .and change { atm_machine.reload.balance }.by(-50)
      end
    end

  end
end
