import CommonMethodLibrary from "../CommonLibrary/CommonMethodLibrary"
const cml = new CommonMethodLibrary();

class AdvanceEducationPageMethodLibrary {

    scrollToGetStartedLink() {
        cy.get('a.start')
            .scrollIntoView()
            .should('be.visible');
    }

    invokeGetStartedPage() {
        cy.get('a.start').click();
        cy.url().should('include', '/#start')
        cy.url().should('eq', 'https://www.hobsons.com/#start')
    }

    verifyOverlayText() {
        cy.get('div[class="colorbar"]+h2').should('have.text', "Are You Ready to Advance Education?")
    }

    verifyFirstNameTextBox() {
        cy.get('div.form-half>input[name="firstName"]').should('have.visible');
    }



    verifyLastNameTextBox() {
        cy.get('div.form-half>input[name="lastName"]').should('have.visible');
    }

    verifyWorkEmailAddressTextBox() {
        cy.get('div.form-row>input[name="emailAddress"]').should('have.visible');
    }

    verifyPhoneTextBox() {
        cy.get('div.form-row>input[name="phone"]').should('have.visible');
    }

    verifyIamReadyButton() {
        cy.get('a[class="button next animated"]').should('have.visible');
    }

    sendFirstNameTextBox(firstName) {
        cy.get('div.form-half>input[name="firstName"]').type(firstName);
    }

    sendLastNameTextBox(lastName) {
        cy.get('div.form-half>input[name="lastName"]').type(lastName);
    }

    sendWorkEmailAddressTextBox(workEmailAddress) {
        cy.get('div.form-row>input[name="emailAddress"]').type(workEmailAddress);
    }

    sendPhoneTextBox(phone) {
        cy.get('div.form-row>input[name="phone"]').type(phone);
    }

    clickIamReadyButton() {
        cy.get('a[class="button next animated"]').click();
    }

    verifyFirstNameCssProperty() {
        //cy.get('div.form-half>input[name="firstName"]').invoke('css', 'position').should('equal', 'relative');
        cy.get('div.form-half>input[name="firstName"]').should('have.attr', 'required', 'required').and('have.css', 'position', 'relative')
        cy.get('div.form-half>input[name="firstName"]').invoke('css', 'float').should('equal', 'none');
    }
}
export default AdvanceEducationPageMethodLibrary;