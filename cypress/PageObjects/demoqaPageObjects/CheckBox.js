class CheckBox {

    checkboxTab() {
        return cy.get('#item-1')
    }

    expandAllButton() {
        return cy.get('[title="Expand all"]')
    }

    desktopCheckBox() {
        return cy.get('[for="tree-node-desktop"] svg').eq(0);
    }

    folderTitles() {
        return cy.get('.rct-title')
    }

    successMessage() {
        return cy.get('.text-success');
    }

}

export default CheckBox;