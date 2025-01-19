class HompePage
{
  cardElements() {
    return cy.get('.card-body');
  }

  clickCard(cardName) {
    this.cardElements().contains(cardName).click();
  }
}

export default HompePage;