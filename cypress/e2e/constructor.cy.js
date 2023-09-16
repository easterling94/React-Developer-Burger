import ingredients from '../fixtures/ingredients.json';
import user from '../fixtures/user.json';
import order from '../fixtures/order.json';

const localhost = 'http://localhost:3000/';
const delayIngredientModalView = 1000;
const delayOrderModalView = 3000;
const mockIngredientBun = '[data-cy="ingredient-bun"]';
const mockIngredientFilling = '[data-cy="ingredient-filling"]';
const mockButtonClose = '[data-cy="modalCloseBtn"]';
const mockDropAreaBun = '[data-cy="drop-area-bun"]';
const mockDropAreaFilling = '[data-cy="drop-area-filling"]';
const mockSubmitOrder = '[data-cy="submit-order"]';

describe('main page test', () => {
  beforeEach(() => {
    window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("test-refreshToken")
    );
    cy.visit(localhost);
    cy.viewport(1920, 1032);
    cy.intercept("GET", "api/auth/user", user);
    cy.intercept("GET", "api/ingredients", ingredients);
    cy.intercept("POST", "api/orders", order);
  });

  it('should test modal feature', () => {
    cy.get(mockIngredientBun).first().click();
    cy.wait(delayIngredientModalView).get(mockButtonClose).click();
  });

  it('should test DnD feature', () => {
    cy.get(mockIngredientBun).each(element => {
      cy.wrap(element).trigger("dragstart");
      cy.get(mockDropAreaBun).first().trigger("drop");
    });

    cy.get(mockIngredientFilling).each(element => {
      cy.wrap(element).trigger("dragstart");
      cy.get(mockDropAreaFilling).trigger("drop");
    })
    cy.get(mockSubmitOrder).click();
    cy.wait(delayOrderModalView).get(mockButtonClose).click();
  });
})