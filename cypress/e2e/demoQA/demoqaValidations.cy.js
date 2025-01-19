/// <reference types="cypress" />
import HompePage from '../../PageObjects/demoqaPageObjects/Homepage'
import Element from '../../PageObjects/demoqaPageObjects/Elements'
import CheckBox from '../../PageObjects/demoqaPageObjects/CheckBox'
import RadioButton from '../../PageObjects/demoqaPageObjects/RadioButton'

describe('verify demoqa.com', () => {
  let data
  const homepage = new HompePage()
  const element = new Element()
  const checkbox = new CheckBox()
  const radiobtn = new RadioButton()
  before(() => {
    cy.visit('/')
    cy.fixture('demoqaFixtures/demoqa').then(content => {
      data = content
    })
  })

  it('should display all cards on the homepage', () => {
    data.cards.forEach(ele => {
      homepage.cardElements().should('contain', ele)
    })
  })

  it('should display all sub-tabs under Elements card', () => {
    homepage.cardElements().contains(data.cards[0]).click()
    cy.url().should('contain', data.cards[0].toLowerCase())
    data.elements.forEach(ele => {
      element.elementsSubTabs().should('contain', ele)
    })
  })

  it('should fill and submit the text box form successfully', () => {
    element.textBoxTab().click()
    element.fullName().clear().type(data.textBoxForm.fullName)
    element.email().clear().type(data.textBoxForm.email)
    element.currentAddress().clear().type(data.textBoxForm.currentAddress)
    element.permanentAddress().clear().type(data.textBoxForm.permanentAddress)
    element.submitButton().click()
  })

  it('should display correct data in submitted form', () => {
    element.nameDataPoint().should('contain', data.textBoxForm.fullName)
    element.emailDataPoint().should('contain', data.textBoxForm.email)
    element.currentAddressDataPoint().should('contain', data.textBoxForm.currentAddress)
    element.permanentAddressDataPoint().should('contain', data.textBoxForm.permanentAddress)
  })

  it('should select folders in the checkbox and display correct success message', () => {
    checkbox.checkboxTab().click()
    checkbox.expandAllButton().click()
    data.checkBoxFolders.forEach(ele=>{
      checkbox.folderTitles().should('contain', ele)
    })
    checkbox.desktopCheckBox().click().then(() => {
      checkbox.successMessage().should('be.visible').and('contain', data.checkBoxFolders[1].toLowerCase())
      .and('contain', data.checkBoxFolders[2].toLowerCase()).and('contain', data.checkBoxFolders[3].toLowerCase());
    })
  })

  it('should select radio buttons and display appropriate success messages', () => {
    radiobtn.radioButtonTab().click()
    radiobtn.questionText().should('be.visible').and('contain', data.radioButtonText)
    data.radioButtonOptions.forEach(ele => {
      radiobtn.radioButtonOptions().should('contain', ele)
    })
    radiobtn.yesRadioButtons().click({force: true}).then(() =>{
      radiobtn.successMessage().should('be.visible').and('contain', data.radioButtonOptions[0])
    })
    radiobtn.impressiveRadioButtons({force: true}).click().then(() =>{
      radiobtn.successMessage().should('be.visible').and('contain', data.radioButtonOptions[1])
    })
    radiobtn.noRadioButtons().should('have.attr', 'disabled')
  })
})
