import React from "react";
import Error from "./Error";

describe("<Error />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Error />);
  });

  it("displays the correct error message", () => {
    const errMsg = "Sorry, an error occured.";
    cy.mount(<Error errorMsg={errMsg} />);
    cy.get("h1").contains(errMsg);
  });

  it("displays the correct subtext", () => {
    const subText = "Please try again later.";
    cy.mount(<Error subText={subText} />);
    cy.get("p").contains(subText);
  });

  it("contains a refresh button", () => {
    cy.mount(<Error />);
    cy.get("button").should("have.text", "Refresh Page");
    cy.window().then((w) => (w.beforeReload = true));
    cy.window().should("have.prop", "beforeReload", true);
    cy.get("button").click();
    cy.window().should("not.have.prop", "beforeReload");
  });
});
