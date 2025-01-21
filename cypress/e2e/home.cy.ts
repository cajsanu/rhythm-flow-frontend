describe("Home Page Tests", () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit("http://localhost:3000")
    cy.get('input[name="email"]').type("chris.brown@example.com")
    cy.get('input[name="password"]').type("somepassword")
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/home")

    cy.intercept("GET", "https://dogapi.dog/api/facts", {
      statusCode: 200
    })
  })

  it("should display a dog fact in the designated paragraph", () => {
    cy.intercept("GET", "https://dogapi.dog/api/facts", {
      statusCode: 204
    })
  })

  it("should open the create workspace modal", () => {
    cy.contains("Create workspace").click()
    cy.contains("Create Workspace").should("be.visible")
    cy.contains("Fill in the details to create a new workspace.").should("exist")
  })

  it("should display a LogOut button and navigate away after clicking it", () => {
    cy.contains("Log out").should("be.visible").click()
    cy.url().should("not.include", "/home")
  })

  it("should create a new workspace", () => {
    cy.contains("Create workspace").click()
    cy.get('input[name="name"]').type("New Workspace")
    cy.get('button[type="submit"]').click()
    cy.contains("Workspace created successfully").should("exist")
    cy.contains("New Workspace").should("exist")
  })

  it("should handle loading", () => {
    // Mock loading state
    cy.intercept("GET", "/api/workspaces/*", { delay: 5000 }).as("getWorkspaces")
    cy.reload()
    cy.contains("Loading...").should("exist")
  })
})
