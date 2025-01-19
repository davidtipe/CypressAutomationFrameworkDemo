class ElementsTabs {

    elementsSubTabs() {
        return cy.get('.element-list.collapse.show .btn.btn-light span');
    }

    textBoxTab() {
        return cy.get('#item-0');
    }

    fullName() {
        return cy.get('#userName');
    }

    email() {
        return cy.get('#userEmail');
    }

    currentAddress() {
        return cy.get('#currentAddress');
    }

    permanentAddress() {
        return cy.get('#permanentAddress');
    }

    submitButton() {
        return cy.get('#submit')
    }

    nameDataPoint() {
        return cy.get('#name')
    }

    emailDataPoint() {
        return cy.get('#email')
    }
    currentAddressDataPoint() {
        return cy.get('.border > #currentAddress')
    }
    permanentAddressDataPoint() {
        return cy.get('.border > #permanentAddress')
    }
}

export default ElementsTabs;