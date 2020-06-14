/// <reference types="cypress" />
import CommonMethodLibrary from "./CommonLibrary/CommonMethodLibrary"
import HomePageMethodLibrary from "./MethodLibrary/HomePageMethodLibrary"
import AdvanceEducationPageMethodLibrary from "./MethodLibrary/AdvanceEducationPageMethodLibrary"

const commonMethodLibrary = new CommonMethodLibrary();
const homePageMethodLibrary = new HomePageMethodLibrary();
const advanceEducationPageMethodLibrary = new AdvanceEducationPageMethodLibrary();

context('Invoke Advance Education Page', () => {
    before(() => {
        homePageMethodLibrary.invokeHomePage("/")
    })

    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('LearnerTestData')
            .then((LearnerTestData) => {
                // "this" is still the test context object
                this.LearnerTestData = LearnerTestData
            })
    })

    describe('Verify the Advance Education Page Assertions ', () => {
        it('Verify that the user able to enter into Advance Education Page', function () {
            advanceEducationPageMethodLibrary.scrollToGetStartedLink();
            advanceEducationPageMethodLibrary.invokeGetStartedPage();
        })

        it('Verify that the Form fields on the page', function () {
            advanceEducationPageMethodLibrary.verifyOverlayText();
            advanceEducationPageMethodLibrary.verifyFirstNameTextBox();
            advanceEducationPageMethodLibrary.verifyLastNameTextBox();
            advanceEducationPageMethodLibrary.verifyWorkEmailAddressTextBox();
            advanceEducationPageMethodLibrary.verifyPhoneTextBox();
            advanceEducationPageMethodLibrary.verifyIamReadyButton();
        })

        it('Enter the value on the Form fields ', function () {
            advanceEducationPageMethodLibrary.sendFirstNameTextBox(this.LearnerTestData.firstName);
            advanceEducationPageMethodLibrary.sendLastNameTextBox(this.LearnerTestData.lastName);
            advanceEducationPageMethodLibrary.sendWorkEmailAddressTextBox(this.LearnerTestData.workEmailAddress);
            advanceEducationPageMethodLibrary.sendPhoneTextBox(this.LearnerTestData.phone);
            advanceEducationPageMethodLibrary.clickIamReadyButton();
        })

        it('Verify that the Form field css property on the page', function () {
            advanceEducationPageMethodLibrary.verifyFirstNameCssProperty();
        })


    })


})