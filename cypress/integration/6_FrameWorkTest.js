/// <reference types="cypress" />
describe("Test Suite", function () {

    before(function () {
        cy.fixture('TestData').then(function (data) {
            this.data = data
        })
    })


    // it("Mouseover Testcase", function () {
    //     cy.visit("https://www.rahulshettyacademy.com/AutomationPractice/")
    //     cy.get('button#mousehover').invoke('show').should('be.visible');
    // }
    // )

    it("My First Testcase", function () {
        cy.visit(Cypress.env('newUrl')+"/angularpractice/")
        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        cy.get('select').select(this.data.gender)
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name)
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2')
        cy.get('#inlineRadio3').should('be.disabled')
        cy.get('li.nav-item:nth-child(2) a').click()

        this.data.productName.forEach(function (prodName) {
            cy.selectProduct(prodName)
        }
        )
        //Cypress.config({defaultCommandTimeout: 8000})
        cy.get('app-card-list app-card:nth-of-type(2) h4.card-title').then(function (element) {
            const actualText = element.text()
            expect(actualText.includes("Note 8")).to.be.true
        })

        cy.get('app-card-list app-card:nth-of-type(2) h4.card-title').should(($item) => {
            const actualText = $item.text()
            expect(actualText.includes("Note 8")).to.be.true
        })


        cy.get('a.nav-link.btn.btn-primary').click()
        let totVal = 0,eventStatus=true;
        cy.get('tr>td:nth-child(4)>strong').each(($item, index, $list) => {
            const amount = $item.text().replace('₹.', '')
            const amountVal=Number(amount);           
            try
            {
               // totVal=Number(totVal)+Number(amountVal);
            expect(amountVal).to.be.greaterThan(51000);            
            }catch(err)
            {
                cy.log("amountVal"+amountVal)
                cy.log(err.name);
                cy.log(err.message);
                eventStatus=false;
            }
        }).then(() => {
            expect(eventStatus).to.be.equal(true);
        })
        
       
            cy.get('tr:nth-child(3)>td:nth-child(5)>h3>strong').should(($itemTotal) => {               
                const totalActTxt = $itemTotal.text()
                expect(Number(totalActTxt.replace('₹.', ''))).to.equal(totVal);
            })

        })


    })