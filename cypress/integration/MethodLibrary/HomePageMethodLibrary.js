import CommonMethodLibrary from "../CommonLibrary/CommonMethodLibrary"
const cml = new CommonMethodLibrary();

class HomePageMethodLibrary {
    invokeHomePage(url) {
        cml.invokeUrl(url)
    }

    clickHomeMore(url) {
        cy.get('.home-more').click();
    }

    verifyScrollToViewLearnMoreWrapper(width, height) {
        cy.get('.learn-more-wrapper')
            .scrollIntoView()
            .should('be.visible');
        cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(width, height);
        });
    }

    scrollToHobsonLink() {
        cy.get('h6>a[href="https://www.hobsons.com"]')
            .scrollIntoView()
            .should('be.visible');
    }


    verifyproductBlogUrl(productBlogUrlExpTxt) {
        const productBlogUrls = productBlogUrlExpTxt;
        let testStatus = true;
        cy.get('div[class="main stats-wrapper"] p a').each((item, index) => {
            try {
                expect(item[0].href).to.include(productBlogUrls[index]);
            } catch (error) {
                testStatus = false;
            }
        }).then(() => {
            expect(testStatus).to.be.equal(true);
        })
    }

    verifyproductBlogName() {
        let testStatus = true;
        const productBlogNames = ['Naviance1', 'Intersect', 'Starfish'];
        cy.get("div[class='main stats-wrapper'] p a").as("webproductBlogNames")
        cy.get('@webproductBlogNames').each(($item, webIndex, $productBlogNameList) => {            
            const productBlogName = $item.text();
            try {
                expect(productBlogName).to.equals(productBlogNames[webIndex]);
            } catch (error) {
                testStatus = false;
            }
        }).then(($productBlogNameList) => {
            expect($productBlogNameList).to.have.length(3)
        })
    }

    verifyLearnAbout(learnMoreAboutExpTxt) {
        let testStatus = true;
        const learnMoreAbouts = learnMoreAboutExpTxt;
        cy.get("a[data-learn-about]").as("webLearnMoreAbouts")
        cy.get('@webLearnMoreAbouts').each(($item, webIndex, $learnAboutList) => {
            const learnAboutTxt = $item.text();
            try {
                expect(learnAboutTxt).to.equals(learnMoreAbouts[webIndex]);
            } catch (error) {
                testStatus = false;
            }
        }).then(($learnAboutList) => {
            expect($learnAboutList).to.have.length(3)
        })
    }

    verifyScrollToLearnMoreImage() {
        let testStatus = true;
        const learnMoreImage = ['/assets/home-naviance.jpg', '/assets/home-intersect.jpg', '/assets/home-starfish.jpg'];
        cy.get("div.learn-intros a[data-learn-about]").as("weblearnAbouts")
        cy.get('@weblearnAbouts').each((item, webIndex) => {
            try {
                item[0].click; 
                //$item.click();               
                cy.get('img[src="' + learnMoreImage[webIndex] + '"]').scrollIntoView({ easing: 'linear' })
            } catch (error) {
                testStatus = false;
            }
        }).then(() => {
            expect(testStatus).to.be.equal(true);
        })
    }

    verifyScrollToLearnMoreImageNew() {
        let testStatus = true;
        const learnMoreImage = ['/assets/home-naviance.jpg', '/assets/home-intersect.jpg', '/assets/home-starfish.jpg'];
        //cy.get("div.learn-intros div:nth-child(1)>a").click()
        //cy.get('img[src="/assets/home-naviance.jpg"]').scrollIntoView({ easing: 'linear' }).should('be.visible');

        cy.get("div.learn-intros div:nth-child(" + 1 + ")>a").click()
        cy.get('img[src="' + learnMoreImage[0] + '"]').scrollIntoView({ easing: 'linear' })

        cy.get("div.learn-intros div:nth-child(" + 2 + ")>a").click()
        cy.get('img[src="' + learnMoreImage[1] + '"]').scrollIntoView({ easing: 'linear' })

        cy.get("div.learn-intros div:nth-child(" + 3 + ")>a").click()
        cy.get('img[src="' + learnMoreImage[2] + '"]').scrollIntoView({ easing: 'linear' })

    }

    //Assertion will fail though the first value does not meet and loop will not be continued
    verifyHamburgerMenus(hamBurgerMenuExpTxt) {
        let testStatus = true;
        cy.get('button.menu').should('have.visible').click();
        const hamBurgerMenus = hamBurgerMenuExpTxt;
        cy.get("nav>ul>li>a").as("webHamBurgerMenus")
        cy.get('@webHamBurgerMenus').each((item, webIndex, $linksList) => {
            try {
                const hamburgerTxt = item[0].text;
                expect(hamburgerTxt).to.equal(hamBurgerMenus[webIndex]);
            } catch (error) {
                testStatus = false;
            }
        }).then(() => {
            expect(testStatus).to.be.equal(true);
        })
        cy.get("button[class='menu active'] span[class='lines']").should('have.visible').click();
    }

    verifyReadMoreMouseHoverColorChange() {
        cy.get('a[href*="infographic"]').as('readMoreInfographic')
        cy.get('@readMoreInfographic').should('have.css', 'background-color').and('eq', 'rgb(97, 99, 101)')
        cy.get('@readMoreInfographic').trigger('mouseover').then(($readMoreInfographic) => {
            cy.wait(2000)
            cy.wrap($readMoreInfographic).should('have.css', 'background-color').and('eq', 'rgb(138, 186, 133)')
        })
    }

}
export default HomePageMethodLibrary;