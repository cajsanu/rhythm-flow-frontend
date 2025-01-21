describe("Login flow", () => {
  it("should visit login page and login user with correct credentials", () => {
    cy.visit("http://localhost:3000")
    cy.get('input[name="email"]').type("chris.brown@example.com")
    cy.get('input[name="password"]').type("somepassword")
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/home")
    cy.get("h1").should("contain.text", "Hello, have a great day!")
  })
})

describe("Incorrect login flow", () => {
  it("should visit login page and show error message with incorrect credentials", () => {
    cy.visit("http://localhost:3000")
    cy.get('input[name="email"]').type("invalid@email.com")
    cy.get('input[name="password"]').type("invalidpassword")
    cy.get('button[type="submit"]').click()
    cy.contains("Invalid email or password").should("exist")
  })
})
