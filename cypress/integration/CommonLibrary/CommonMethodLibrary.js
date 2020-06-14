class CommonMethodLibrary {
    invokeUrl(url) {
        cy.visit(url);
    }
    verifyPageTitle(pageTitle) {
        cy.title().should('be.equal', pageTitle);
    }
    setPageViewPort(width, height) {
        cy.viewport(width, height);
    }

    convertDate(dateVal) {
        return new Date(dateVal);
    }

    getDate(dateVal) {
        let date = dateVal.getDate() + 1;
        if (date < 10) {
            date = `0${dd}`;
        }
        return date;
    }

    getMonth(dateVal) {
        let month = dateVal.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        return month;
    }

    getYear(dateVal) {
        let year = dateVal.getFullYear();
        return year;
    }

    getCurrentDate() {
        let currdateVal = new Date();
        let date = currdateVal.getDate();
        let month = currdateVal.getMonth() + 1;
        let year = currdateVal.getFullYear();
        if (date < 10) {
            date = `0${date}`;
        }

        if (month < 10) {
            month = `0${month}`;
        }
        currdateVal = `${year}-${month}-${date}`;
        return currdateVal;
    }


}
export default CommonMethodLibrary;