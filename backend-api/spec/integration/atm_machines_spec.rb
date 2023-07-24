# spec/requests/atm_machines_spec.rb
require 'swagger_helper'

describe 'ATM Machines API' do
  path '/atm_machines' do
    post 'Creates a ATM machine' do
      tags 'ATM Machines'
      consumes 'application/json'
      parameter name: :atm_machine, in: :body, schema: {
        type: :object,
        properties: {
          atm_machine_name: { type: :string },
          store_name: { type: :string },
          balance: { type: :number }
        },
        required: [ 'atm_machine_name', 'store_name', 'balance' ]
      }

      response '201', 'ATM machine created' do
        let(:atm_machine) { { atm_machine_name: 'ATM1', store_name: 'Store1', balance: 1000 } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:atm_machine) { { atm_machine_name: 'ATM1' } }
        run_test!
      end
    end

    get 'Retrieves all ATM machines' do
      tags 'ATM Machines'
      produces 'application/json'

      response '200', 'ATM machines found' do
        run_test!
      end
    end
  end

  path '/atm_machines/{id}' do
    get 'Retrieves a ATM machine' do
      tags 'ATM Machines'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string

      response '200', 'ATM machine found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            atm_machine_name: { type: :string },
            store_name: { type: :string },
            balance: { type: :number }
          },
          required: [ 'id', 'atm_machine_name', 'store_name', 'balance' ]

        let(:id) { AtmMachine.create(atm_machine_name: 'ATM1', store_name: 'Store1', balance: 1000).id }
        run_test!
      end

      response '404', 'ATM machine not found' do
        let(:id) { 'invalid' }
        run_test!
      end

      response '406', 'unsupported accept header' do
        let(:'Accept') { 'application/foo' }
        run_test!
      end
    end
  end
end
