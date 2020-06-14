/// <reference types="cypress" />
import CommonMethodLibrary from "./CommonLibrary/CommonMethodLibrary"
import HomePageMethodLibrary from "./MethodLibrary/HomePageMethodLibrary"
import ServicesPageMethodLibrary from "./MethodLibrary/ServicesPageMethodLibrary"

const commonMethodLibrary = new CommonMethodLibrary();
const homePageMethodLibrary = new HomePageMethodLibrary();
const servicesPageMethodLibrary = new ServicesPageMethodLibrary();

context('Invoke Service Page', () => {
    before(() => {
        homePageMethodLibrary.invokeHomePage("/")
    })

    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('ServicesTestData')
            .then((ServicesTestData) => {
                // "this" is still the test context object
                this.ServicesTestData = ServicesTestData
            })
    })

    describe('Verify the Services Page Assertions ', () => {
        it('Verify that the Services Page is displayed ', function () {
            servicesPageMethodLibrary.invokeServicesPage();
        })
        it('Verify that the Solution sub menus are displayed when mousehover on to it', function () {
            servicesPageMethodLibrary.verifyMouseHoverSolutionSubMenus();
        })
        it('Verify that the Solution sub menus are correctly shown ', function () {
            servicesPageMethodLibrary.verifySolutionSubMenus(this.ServicesTestData.solutionSubMenu);
        })

        it('Verify that the Solution sub menu links redirected correctly ', function () {
            servicesPageMethodLibrary.verifySolutionSubMenuLinks(this.ServicesTestData.solutionSubMenuUrl)
        })


    })


})