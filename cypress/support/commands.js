Cypress.Commands.add('randomEmailGenerator', length => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for (let i = 0; i < length; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return cy.wrap(`${string }@mail.com`)
})

// Cypress.Commands.add('isHidden', selector => {
//     cy.get(selector).should('not.exist')
// })

// Cypress.Commands.add('getText', selector => {
//     cy.get(selector).invoke('text').then(($text)=>{
//         return cy.wrap($text)
//     })
// })

