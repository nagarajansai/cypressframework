describe("Landing page verification", function () {
    it("invoke url", function () {
        cy.visit("https://www.rosettastone.com/groups/landing-pages/sbsr/sbsr/emsah199/")
        /*cy.get("a[title='I Understand']").as("Understand")
        cy.get("@Understand").click()
        cy.get("[alt='Shopping Cart']").as('cart')
        cy.get("@cart").click()
        cy.get("@cart").click().then(function () {
            console.log("testing")
        }
        )*/

        cy.get('#check').check().should('be.checked').and('have.value', 'option1')
        cy.get('#check').uncheck().should('not.be.checked')
        cy.get('#check').check(['option2', 'option3'])
        cy.get('select').select('option2').should('have.value', 'option1')
        cy.get('input#autocomplete').type('ind')

        cy.get('.ui-menu-item div').each(($e1, index, $list) => {
            if ($e1.text() == "india") {
                $e1.click()
            }
            cy.get('input#autocomplete').should('have.value', 'India')
        }
        )

    cy.get('div.products').siblings('p.disclaimer').should("have.text", 'Subscriptions automatically renew at the full retail price (plus tax) then in effect. Turn off auto-renewal at anytime. Monthly amount is illustrative. *')
    //cy.contains('Subscriptions automatically renew at the full retail price (plus tax) then in effect. Turn off auto-renewal at anytime. Monthly amount is illustrative. *')
}
)

it("Learn text ", function () {
    // cy.contains('I want to learn')
    //cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
    cy.get('div.products').siblings('p.disclaimer').then(function (disclaimerTxt) {
        cy.log(disclaimerTxt.text())
        console.log(disclaimerTxt.text())
        //cy.get('div.content h5').then(function (coachTxt) {
        // cy.log(coachTxt.text())
    })
})

    /* it("Verification of one product from the list", function () {
         cy.get('.products').find('.product').each(($el, index, $list) => {
             const textVeg = $el.find('h4.product-name').text()
             if (textVeg.inludes('cashews')) {
                 $el.find('button').click()
             }
         }
         )
     })*/
}
)