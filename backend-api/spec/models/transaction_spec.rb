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

  describe "update_balance" do 
    before do 
      # @user = User.create(
      #   name: "user_tester",
      #   identification_number: "ABC123",
      #   balance: 1000,
      #   pin: 1234,
      #   face_image_url: "https",
      #   is_active: 0
      # )
      # @user.save
  
      # @atm_machine = AtmMachine.create(
      #   atm_machine_name: "Testing ATM",
      #   store_name: "Testing Store Name",
      #   balance: 1000
      # )
      # @atm_machine.save
      @user = User.find_by(id:1)
      @atm_machine=AtmMachine.find_by(id:1)
    end
    
    it "updates balances for deposit transaction" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'NCD', amount: 100 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      
      expect { transaction.update_balances }.to change { @user.reload.balance }.by(100).and change { @atm_machine.reload.balance }.by(100)
    end
  
    it "updates balances for withdrawal transaction" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'AWL', amount: 50 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to change { @user.reload.balance }.by(-50).and change { @atm_machine.reload.balance }.by(-50)
    end
  
    it "updates balances for smallest deposit" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'NCD', amount: 0.01 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to change { @user.reload.balance }.by(0.01).and change { @atm_machine.reload.balance }.by(0.01)
    end
  
    it "updates balances for smallest withdrawal" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'AWL', amount: 0.01 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to change { @user.reload.balance }.by(-0.01).and change { @atm_machine.reload.balance }.by(-0.01)
    end
    it "does not update for negative deposit transaction" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'NCD', amount: -10 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to raise_error(ActiveRecord::RecordInvalid, /Amount must be greater than 0/)
    end

    it "does not update for negative withdrawal transaction" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'AWL', amount: -10 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to raise_error(ActiveRecord::RecordInvalid, /Amount must be greater than 0/)
    end

    it "does not update for wrong transaction types" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: 'XYZ', amount: 100 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to raise_error(ActiveRecord::RecordInvalid, /Transaction type is not included in the list/)
    end

    it "does not update for nil transaction types" do
      transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: nil , amount: 100 }
      transaction = Transaction.new(transaction_params)
      transaction.save
      expect { transaction.update_balances }.to raise_error(ActiveRecord::RecordInvalid, /Transaction type is not included in the list/)
    end

    # it "does not update for withdrawal with nil amount" do
    #   transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: "AWL" , amount: nil }
    #   transaction = Transaction.new(transaction_params)
    #   transaction.save
    #   expect { transaction.update_balances }.to raise_error(ActiveRecord::RecordInvalid, /Insufficient balance/)
    # end

    # it "does not update if user has 0 dollars" do
    #   @user = User.new({name: "user_tester", 
    #     identification_number: "ABC123",
    #     balance: 0, 
    #     pin: 1234, 
    #     face_image_url: "https", 
    #     is_active: 0})
    #   @user.save
    #   transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: "AWL" , amount: 100 }
      
    #   transaction = Transaction.new(transaction_params)
    #   transaction.save
    #   expect { transaction.update_balances }.to change { @user.reload.balance }.by(0).and change { @atm_machine.reload.balance }.by(0)
    # end

    # it "does not update if atm has 0 dollars" do
    #   @atm_machine = AtmMachine.new({atm_machine_name:"Testing ATM", store_name:"Testing Store Name", balance: 0 })
    #   @atm_machine.save
    #   transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: "AWL" , amount: 100 }
    #   transaction = Transaction.new(transaction_params)
    #   transaction.save
    #   expect { transaction.update_balances }.to change { @user.reload.balance }.by(0).and change { @atm_machine.reload.balance }.by(0)
    # end

    # it "partial withdrawal if atm has insufficient balance" do
    #   @atm_machine = AtmMachine.new({atm_machine_name:"Testing ATM", store_name:"Testing Store Name", balance: 1 })
    #   @atm_machine.save
    #   transaction_params = { user: @user, atm_machine: @atm_machine, transaction_type: "AWL" , amount: 100 }
    #   transaction = Transaction.new(transaction_params)
    #   transaction.save
    #   expect { transaction.update_balances }.to change { @user.reload.balance }.by(-1).and change { @atm_machine.reload.balance }.by(-1)
    # end
    
  end
    
end
