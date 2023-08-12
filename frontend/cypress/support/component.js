// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount as _mount } from "cypress/react18";
import { ChakraProvider } from "@chakra-ui/react";
import { createElement } from "react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context";

const createMockRouter = () => {
  return {
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    components: {},
    isFallback: false,
    basePath: "",
    events: {
      emit: cy.spy().as("router:emit"),
      off: cy.spy().as("router:off"),
      on: cy.spy().as("router:on"),
    },
    push: cy.stub().as("router:push"),
    replace: cy.spy().as("router:replace"),
    reload: cy.stub().as("router:reload"),
    back: cy.stub().as("router:back"),
    prefetch: cy.stub().as("router:prefetch").resolves(),
    beforePopState: cy.spy().as("router:beforePopState"),
  };
};

Cypress.Commands.add("mount", (component, options) => {
  const wrappedComponent = createElement(ChakraProvider, {}, component);
  const router = createMockRouter();
  return _mount(
    <AppRouterContext.Provider value={router}>
      {wrappedComponent}
    </AppRouterContext.Provider>,
    options
  );
  //   return _mount(wrappedComponent, options);
});

// Example use:
// cy.mount(<MyComponent />)
