import CommonMethodLibrary from "../CommonLibrary/CommonMethodLibrary"
const cml = new CommonMethodLibrary();

class ServicesPageMethodLibrary {

    invokeServicesPage() {
        cy.get('div[class*="footer-primary-menu"]>ul>li:nth-child(3)>a').click();
        cy.url().should('include', '/services')
        cy.url().should('eq', 'https://www.hobsons.com/services')
    }

    verifyMouseHoverSolutionSubMenus() {
        cy.get('.nav>ul').find('>li').eq(1).find('ul').invoke('show');
        // cy.get('.nav>ul').find('>li').eq(1).find('ul').trigger('mousehover',{force:true});
        cy.get('.nav>ul>li').eq(1).find('ul').find('li').invoke('show');
    }

    verifySolutionSubMenus(solutionSubMenusExpTxt) {
        let testStatus = true;
        const solutionSubMenus = solutionSubMenusExpTxt;
        cy.get(".nav>ul>li:nth-of-type(2)>a+ul>li>a").as("websolutionSubMenus")
        cy.get('@websolutionSubMenus').each(($item, webIndex, $solutionSubMenuList) => {
            const solutionSubMenu = $item.text();
            try {
                expect(solutionSubMenu).to.equals(solutionSubMenus[webIndex]);
            } catch (error) {
                testStatus = false;
            }
        }).then(($solutionSubMenuList) => {
            expect(testStatus).to.be.equal(true);
        })
    }

    verifySolutionSubMenuLinks(solutionSubMenusExpTxt) {
        let testStatus = true;
        const solutionSubMenus = solutionSubMenusExpTxt;
        cy.get(".nav>ul>li:nth-of-type(2)>a+ul>li>a").as("websolutionSubMenus")
        cy.get('@websolutionSubMenus').each(($item, webIndex, $solutionSubMenuList) => {
            cy.get($item).invoke('removeAttr','target').click({ force: true })
            try {
                cy.url().should('include', solutionSubMenus[webIndex]);
                cy.go('back');
                // cy.get($item).then(($item) => {
                //     Cypress.dom.unwrap($item)
                // })
            } catch (error) {
                testStatus = false;
            }
        }).then(($solutionSubMenuList) => {
            expect(testStatus).to.be.equal(true);
        })
    }

}
export default ServicesPageMethodLibrary;