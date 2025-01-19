class RadioButton {

    radioButtonTab() {
        return cy.get('#item-2');
    }

    questionText() {
        return cy.get('.mb-3')
    }

    yesRadioButtons() {
        return cy.get('[for="yesRadio"]');
    }

    impressiveRadioButtons() {
        return cy.get('[for="impressiveRadio"]');
    }

    noRadioButtons() {
        return cy.get('#noRadio');
    }

    radioButtonOptions() {
        return cy.get('.custom-control-label')
    }

    successMessage() {
        return cy.get('.text-success')
    }

}

export default RadioButton;