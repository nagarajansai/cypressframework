/// <reference types="cypress" />
import CommonMethodLibrary from "./CommonLibrary/CommonMethodLibrary"
import HomePageMethodLibrary from "./MethodLibrary/HomePageMethodLibrary"
const commonMethodLibrary = new CommonMethodLibrary();
const homePageMethodLibrary = new HomePageMethodLibrary();

context('Invoke Home Page', () => {
    before(() => {
        homePageMethodLibrary.invokeHomePage("/")
    })

    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('TestData')
            .then((TestData) => {
                // "this" is still the test context object
                this.TestData = TestData
            })
    })

    describe('verify the Home page Assertions 1', () => {

        it('verify that the Home page title', function () {
            let homePageTitleExpTxt = this.TestData.homePageTitle;
            commonMethodLibrary.verifyPageTitle(homePageTitleExpTxt);
        })

        // it('verify that the view port of the Home page', function () {
        //     commonMethodLibrary.setPageViewPort(1366, 768);
        //     homePageMethodLibrary.clickHomeMore();
        //     homePageMethodLibrary.verifyScrollToViewLearnMoreWrapper(700, 100);
        // })

        it('verify that the Product Blog urls of the Home page', function () {
            homePageMethodLibrary.verifyproductBlogUrl(this.TestData.productBlogUrl);
        })
    })

    describe('verify the Home page Assertions 2', () => {
        it('verify that the Product Blog names of the Home page', function () {
            homePageMethodLibrary.verifyproductBlogName();
        })

        it('verify that the Learn about links of the Home page', function () {
            homePageMethodLibrary.verifyLearnAbout(this.TestData.learnAbout);
        })

        it('verify that the Hamburger menus of the Home page', function () {
            homePageMethodLibrary.verifyHamburgerMenus(this.TestData.hamBurgerMenu);
        })

         it('verify that the Read more mouse hover change', function () {
             homePageMethodLibrary.verifyReadMoreMouseHoverColorChange();
         })

    })

    // describe('verify the Learn more Scrolling Assertions ', () => {
    //     it('verify that the Scroll to the Learn more image ', function () {
    //         homePageMethodLibrary.verifyScrollToLearnMoreImage();
    //     })
    // })
})