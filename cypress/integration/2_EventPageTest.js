/// <reference types="cypress" />
import CommonMethodLibrary from "../integration/CommonLibrary/CommonMethodLibrary"
import EventPageMethodLibrary from "./MethodLibrary/EventPageMethodLibrary"

const cml = new CommonMethodLibrary();
const eventPageMethodLibrary = new EventPageMethodLibrary();

context('Invoke Event Page', () => {
    before(() => {
        cy.visit("https://www.hobsons.com/resources/events")
    })

    describe('verify Event page assertions', () => {
        beforeEach(function () {
            // "this" points at the test context object
            cy.fixture('TestData')
                .then((TestData) => {
                    // "this" is still the test context object
                    this.TestData = TestData
                })
        })

        it('verify that the Event page is invoked', () => {
            cy.get('div h2.c').should('have.be.visible')
            cy.get('div h2.c').then(function (educationEventTxt) {
                let eduEventTxt = educationEventTxt.text()
                expect(eduEventTxt).to.equal('Education Events');
            })
        })

        it('verify that the Event page title', function () {
            let eventPageTitleExpTxt = this.TestData.eventPageTitle;
            cy.log(eventPageTitleExpTxt)
            cy.title().should('be.equal', eventPageTitleExpTxt);
        })

        it('verify that the view port of the Event page', function () {
            //cy.visit("https://www.hobsons.com");
            cy.viewport(1366, 768);
            //cy.get('.home-more').click();
            cy.get('input[value="Subscribe"]')
                .scrollIntoView()
                .should('be.visible');
            cy.window().then(($window) => {
                expect($window.scrollY).to.be.closeTo(700, 100);
            });
        })

        it('verify that the user scrolls to and ensure the Subscribe button is visible', () => {
            cy.get('input[value="Subscribe"]').scrollIntoView()
                .should('be.visible')
        })

        //Below is not the right way to verify the Resources link
        it('Verify the sitemap footer Resources Link', () => {
            let i = 1;
            const siteMapFooterLinks = ['Solutions', 'Services', 'Resources', 'About Us'];
            siteMapFooterLinks.forEach((resourceLinkExpTxt) => {
                if (i == 3) {
                    cy.get('div[class="sitemap"] ul li:nth-child(1)')
                        .eq(2)
                        .should('contain', resourceLinkExpTxt)
                }
                i++;
            })
        })

        it('Verify that the images are loaded properly', () => {
            let imageStatus = true;
            cy.get('div.img a img').each((image) => {
                try {
                    expect(image[0].naturalWidth).to.not.equal(0)
                } catch (error) {
                    imageStatus = false;
                }
            })
                .then(() => {
                    expect(imageStatus).to.be.equal(true);
                })
        });

        it('Verify that the Hobson logo is visible', function () {
            cy.get('p.logo img')
                .should('be.visible')
                .and('have.attr', 'src', '/ui/svg/logo-hobsons-tagline.svg');
        });

        it('Verify whether the links are clickable', () => {
            cy.get('div.sitemap ul:nth-child(5) li a[href]').as('siteMapLink')
            cy.get('@siteMapLink').eq(0).click()    
            cy.url().should('include', '/terms-and-conditions');
            cy.get('@siteMapLink').eq(1).click()    
            cy.url().should('include', '/privacy-policy');
            cy.get('@siteMapLink').eq(2).click()    
            cy.url().should('include', '/privacy-policy#/california');
        });

        it('verify that the event headers are present', function () {
            let testStatus = ""
            cy.get('div.form-row+ ul li').each(($eventHdr, index, $list) => {
                const eventHeaderActTxt = $eventHdr.text()
                let i = 0
                this.TestData.eventHeader.forEach(eventHeaderExpTxt => {
                    if (index == i) {
                        console.log("eventHeaderActTxt" + eventHeaderActTxt)
                        console.log("eventHeaderExpTxt" + eventHeaderExpTxt)
                        try {
                            expect(eventHeaderActTxt).to.equal(eventHeaderExpTxt)
                        } catch (error) {
                            testStatus = false;
                            cy.log(error.message);
                        }
                    }
                    i++;
                })
            }).then(() => {
                expect(testStatus).to.be.equal(true);
            })
        })
    })

    describe("Verify that the Future Events exists ", () => {
        let eventStatus = true;
        let eventNewDate;
        it("verify Event Dates", () => {
            cy.visit('https://www.hobsons.com/resources/events')
            cy.get('div[class*="listing"] p small').each(($e1, index, $list) => {
    
                let eventDate = $e1.text()
                eventNewDate=eventPageMethodLibrary.getNewDate(eventDate);
                cy.log("eventNewDate"+eventNewDate)
                let currentDate = cml.getCurrentDate()
    
                if (eventNewDate != "No EventDate" && (!eventNewDate.includes("NaN"))) {
                    let eventNewDate1 = new Date(eventNewDate)
                    let currentDate1 = new Date(currentDate)
    
                    try {
                        // cy.log(eventDate)
                        cy.log(eventNewDate)
                        cy.log(currentDate)
                        expect(eventNewDate1).to.be.greaterThan(currentDate1);
                    } catch (err) {
                        eventStatus = false;
                        cy.log(err.message);
                        cy.log(err.name);
                    }
                }
                else {
                    cy.log("Invalid Event date passed: " + eventDate)
                }
    
            }).then(() => {
                expect(eventStatus).to.be.equal(true);
            })
        })
    })

})