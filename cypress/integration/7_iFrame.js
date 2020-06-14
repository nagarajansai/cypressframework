/// <reference types="cypress" />
import 'cypress-iframe'
describe("Verify Iframe TestSuite", function () {
    
    it("Invoke Url", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice")
        cy.frameLoaded("#courses-iframe")
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    }
    )

})