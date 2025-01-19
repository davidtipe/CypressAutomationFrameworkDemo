Cypress.Commands.add('createToken', (url, payload) => {
    cy.request({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload
    }).then((resp) => {
        expect(resp.status).to.eq(200)
        return cy.wrap(resp)
    })
})

Cypress.Commands.add('createBooking', (url, payload) => {
    cy.request({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    }).then(resp => {
        expect(resp.status).to.eq(200)
        return cy.wrap(resp)
    })
})

Cypress.Commands.add('getBookingIds', (url) => {
    cy.request({
        method: 'GET',
        url: url,
        body: {},
    }).then(resp => {
        expect(resp.status).to.eq(200)
        return cy.wrap(resp)
    })
    
})

Cypress.Commands.add('getBookings', (url) => {
    cy.request({
        method: 'GET',
        url: url,
        body: {},
    }).then(resp => {
        expect(resp.status).to.eq(200)
        return cy.wrap(resp)
    })
})

Cypress.Commands.add('updateBooking', (url, token, payload) => {
    cy.request({
        method: 'PUT',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Cookie':`token=${token}`
        },
        body: payload,
    }).then(resp => {
        expect(resp.status).to.eq(200)
        return cy.wrap(resp)
    })
})

Cypress.Commands.add('partialUpdateBooking', (url, token, payload) => {
    cy.request({
        method: 'PATCH',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Cookie':`token=${token}`
        },
        body: payload,
    }).then(resp => {
        expect(resp.status).to.eq(200)
        return cy.wrap(resp)
    })
})

Cypress.Commands.add('deleteBooking', (url, token) => {
    cy.request({
        method: 'DELETE',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Cookie':`token=${token}`
        },
        body: {},
    }).then(resp => {
        expect(resp.status).to.eq(201)
        return cy.wrap(resp)
    })
})