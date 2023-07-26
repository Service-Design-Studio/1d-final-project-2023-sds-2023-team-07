# spec/requests/transactions_spec.rb
require 'swagger_helper'

describe 'Transactions API' do

  path '/withdraw' do

    post 'Creates a withdrawal transaction' do
      tags 'Transactions'
      consumes 'application/json'
      parameter name: :transaction, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          atm_machine_id: { type: :integer },
          amount: { type: :number },
        },
        required: ['user_id', 'atm_machine_id', 'amount']
      }

      response '201', 'Transaction created' do
        let(:transaction) { { user_id: 1, atm_machine_id: 1, amount: 500 } }
        run_test!
      end

      response '422', 'Invalid request' do
        let(:transaction) { { amount: '' } }
        run_test!
      end
    end
  end

  path '/deposit' do

    post 'Creates a deposit transaction' do
      tags 'Transactions'
      consumes 'application/json'
      parameter name: :transaction, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          atm_machine_id: { type: :integer },
          amount: { type: :number },
        },
        required: ['user_id', 'atm_machine_id', 'amount']
      }

      response '201', 'Transaction created' do
        let(:transaction) { { user_id: 1, atm_machine_id: 1, amount: 500 } }
        run_test!
      end

      response '422', 'Invalid request' do
        let(:transaction) { { amount: '' } }
        run_test!
      end
    end
  end

  path '/users/{user_id}/transactions' do

    get 'Retrieves a list of transactions for a specific user' do
      tags 'Transactions'
      produces 'application/json'
      parameter name: :user_id, :in => :path, :type => :integer

      response '200', 'List of transactions retrieved' do
        schema type: :array, 
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              user_id: { type: :integer },
              atm_machine_id: { type: :integer },
              amount: { type: :number },
              transaction_type: { type: :string },
              user_balance_left: { type: :number },
              atm_balance_left: { type: :number }
            }
          }

        let(:user_id) { User.create(name: 'John', balance: 5000).id }
        run_test!
      end

      response '404', 'User not found' do
        let(:user_id) { 0 }
        run_test!
      end
    end
  end

  path '/users/{user_id}/transactions/{id}' do

    get 'Retrieves a specific transaction of a user' do
      tags 'Transactions'
      produces 'application/json'
      parameter name: :user_id, :in => :path, :type => :integer
      parameter name: :id, :in => :path, :type => :integer

      response '200', 'Transaction details retrieved' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            user_id: { type: :integer },
            atm_machine_id: { type: :integer },
            amount: { type: :number },
            transaction_type: { type: :string },
            user_balance_left: { type: :number },
            atm_balance_left: { type: :number }
          }

        let(:user_id) { User.create(name: 'John', balance: 5000).id }
        let(:id) { Transaction.create(user_id: user_id, atm_machine_id: 1, amount: 500, transaction_type: 'NCD', user_balance_left: 5500, atm_balance_left: 4500).id }
        run_test!
      end

      response '404', 'Transaction not found' do
        let(:user_id) { 1 }
        let(:id) { 0 }
        run_test!
      end
    end

    patch 'Updates a specific transaction of a user' do
      tags 'Transactions'
      consumes 'application/json'
      parameter name: :user_id, :in => :path, :type => :integer
      parameter name: :id, :in => :path, :type => :integer
      parameter name: :transaction, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          atm_machine_id: { type: :integer },
          amount: { type: :number },
        },
        required: ['user_id', 'atm_machine_id', 'amount']
      }

      response '200', 'Transaction updated' do
        let(:user_id) { User.create(name: 'John', balance: 5000).id }
        let(:id) { Transaction.create(user_id: user_id, atm_machine_id: 1, amount: 500, transaction_type: 'NCD', user_balance_left: 5500, atm_balance_left: 4500).id }
        let(:transaction) { { user_id: 1, atm_machine_id: 1, amount: 600 } }
        run_test!
      end

      response '404', 'Transaction not found' do
        let(:user_id) { 1 }
        let(:id) { 0 }
        run_test!
      end
    end

    delete 'Deletes a specific transaction of a user' do
      tags 'Transactions'
      parameter name: :user_id, :in => :path, :type => :integer
      parameter name: :id, :in => :path, :type => :integer

      response '200', 'Transaction deleted' do
        let(:user_id) { User.create(name: 'John', balance: 5000).id }
        let(:id) { Transaction.create(user_id: user_id, atm_machine_id: 1, amount: 500, transaction_type: 'NCD', user_balance_left: 5500, atm_balance_left: 4500).id }
        run_test!
      end

      response '404', 'Transaction not found' do
        let(:user_id) { 1 }
        let(:id) { 0 }
        run_test!
      end
    end
  end

  path '/transactions/{id}' do

    get 'Retrieves a specific transaction' do
      tags 'Transactions'
      produces 'application/json'
      parameter name: :id, :in => :path, :type => :integer

      response '200', 'Transaction details retrieved' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            user_id: { type: :integer },
            atm_machine_id: { type: :integer },
            amount: { type: :number },
            transaction_type: { type: :string },
            user_balance_left: { type: :number },
            atm_balance_left: { type: :number }
          }

        let(:id) { Transaction.create(user_id: 1, atm_machine_id: 1, amount: 500, transaction_type: 'NCD', user_balance_left: 5500, atm_balance_left: 4500).id }
        run_test!
      end

      response '404', 'Transaction not found' do
        let(:id) { 0 }
        run_test!
      end
    end

    patch 'Updates a specific transaction' do
      tags 'Transactions'
      consumes 'application/json'
      parameter name: :id, :in => :path, :type => :integer
      parameter name: :transaction, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          atm_machine_id: { type: :integer },
          amount: { type: :number },
        },
        required: ['user_id', 'atm_machine_id', 'amount']
      }

      response '200', 'Transaction updated' do
        let(:id) { Transaction.create(user_id: 1, atm_machine_id: 1, amount: 500, transaction_type: 'NCD', user_balance_left: 5500, atm_balance_left: 4500).id }
        let(:transaction) { { user_id: 1, atm_machine_id: 1, amount: 600 } }
        run_test!
      end

      response '404', 'Transaction not found' do
        let(:id) { 0 }
        run_test!
      end
    end

    delete 'Deletes a specific transaction' do
      tags 'Transactions'
      parameter name: :id, :in => :path, :type => :integer

      response '200', 'Transaction deleted' do
        let(:id) { Transaction.create(user_id: 1, atm_machine_id: 1, amount: 500, transaction_type: 'NCD', user_balance_left: 5500, atm_balance_left: 4500).id }
        run_test!
      end

      response '404', 'Transaction not found' do
        let(:id) { 0 }
        run_test!
      end
    end
  end
end

