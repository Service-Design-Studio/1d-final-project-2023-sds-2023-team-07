import React from "react";
import TableDefault from "./TableDefault";

let table_data = [
  {
    id: 5,
    user_id: 1,
    atm_machine_id: 2,
    transaction_type: "AWL",
    amount: "21.0",
    user_balance_left: "1979.0",
    atm_balance_left: "14974.0",
    created_at: "2023-07-05T12:29:31.555Z",
    updated_at: "2023-07-05T12:29:31.555Z",
  },
  {
    id: 6,
    user_id: 1,
    atm_machine_id: 2,
    transaction_type: "NCD",
    amount: "27.0",
    user_balance_left: "2006.0",
    atm_balance_left: "15001.0",
    created_at: "2023-07-05T12:29:31.559Z",
    updated_at: "2023-07-05T12:29:31.559Z",
  },
  {
    id: 9,
    user_id: 1,
    atm_machine_id: 2,
    transaction_type: "AWL",
    amount: "85.0",
    user_balance_left: "1921.0",
    atm_balance_left: "14927.0",
    created_at: "2023-07-05T12:29:31.568Z",
    updated_at: "2023-07-05T12:29:31.568Z",
  },
  {
    id: 11,
    user_id: 1,
    atm_machine_id: 2,
    transaction_type: "AWL",
    amount: "58.0",
    user_balance_left: "1863.0",
    atm_balance_left: "14869.0",
    created_at: "2023-07-05T12:29:31.574Z",
    updated_at: "2023-07-05T12:29:31.574Z",
  },
  {
    id: 14,
    user_id: 1,
    atm_machine_id: 1,
    transaction_type: "AWL",
    amount: "21.0",
    user_balance_left: "1842.0",
    atm_balance_left: "9982.0",
    created_at: "2023-07-05T12:29:31.584Z",
    updated_at: "2023-07-05T12:29:31.584Z",
  },
];

describe("<TableDefault />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TableDefault data={table_data} />);
  });

  it("has 5 rows", () => {
    cy.mount(<TableDefault data={table_data} />);
    cy.get("tbody tr").should("have.length", 5);
  });

  it("has the correct headers in the correct order", () => {
    cy.mount(<TableDefault data={table_data} />);
    cy.get("thead tr th").should("have.length", 3);
    cy.get("thead tr th").eq(0).should("have.text", "Date");
    cy.get("thead tr th").eq(1).should("have.text", "Transaction");
    cy.get("thead tr th").eq(2).should("have.text", "Amount Left");
  });

  it("has the correct data in the correct order", () => {
    cy.mount(<TableDefault data={table_data} />);
    cy.get("tbody tr")
      .eq(0)
      .find("td")
      .then(($td) => {
        return {
          date: $td[0].innerText,
          amount: $td[1].innerText,
          bal: $td[2].innerText,
        };
      })
      .should("deep.equal", {
        date: "7/5/2023",
        amount: "-21.0",
        bal: "1979.00",
      });
    cy.get("tbody tr")
      .eq(1)
      .find("td")
      .then(($td) => {
        return {
          date: $td[0].innerText,
          amount: $td[1].innerText,
          bal: $td[2].innerText,
        };
      })
      .should("deep.equal", {
        date: "7/5/2023",
        amount: "+27.0",
        bal: "2006.00",
      });
    cy.get("tbody tr")
      .eq(2)
      .find("td")
      .then(($td) => {
        return {
          date: $td[0].innerText,
          amount: $td[1].innerText,
          bal: $td[2].innerText,
        };
      })
      .should("deep.equal", {
        date: "7/5/2023",
        amount: "-85.0",
        bal: "1921.00",
      });
    cy.get("tbody tr")
      .eq(3)
      .find("td")
      .then(($td) => {
        return {
          date: $td[0].innerText,
          amount: $td[1].innerText,
          bal: $td[2].innerText,
        };
      })
      .should("deep.equal", {
        date: "7/5/2023",
        amount: "-58.0",
        bal: "1863.00",
      });
    cy.get("tbody tr")
      .eq(4)
      .find("td")
      .then(($td) => {
        return {
          date: $td[0].innerText,
          amount: $td[1].innerText,
          bal: $td[2].innerText,
        };
      })
      .should("deep.equal", {
        date: "7/5/2023",
        amount: "-21.0",
        bal: "1842.00",
      });
  });
});
