/// <reference types="cypress" />

describe('verify Restful Booker API', () => {
    let data
    let token
    let createBookingresponse
    before(() => {
        cy.fixture('restfulBookerFixtures/restfulBookerPayloads').then((content) => {
            data = content
        })
    })

    it('create token', () => {
        cy.createToken('/auth', data.createTokenPayload).then(resp => {
            token = resp.body.token
            cy.task('log', `TOKEN ID - ${token}`)
        })
    })

    it('create booking', () => {
        cy.createBooking('/booking', data.createBookingPayload).then(resp => {
            createBookingresponse = resp.body
        })
    })

    it('get booking Ids', () => {
        cy.getBookingIds('/booking', data.createBookingPayload).then(resp => {
            const found = resp.body.find(o => o.bookingid === createBookingresponse.bookingid)
            expect(found.bookingid).to.eq(createBookingresponse.bookingid)
        })
    })

    it('get booking', () => {
        cy.getBookings(`booking/${createBookingresponse.bookingid}`).then(resp => {
            expect(JSON.stringify(resp.body)).to.eq(JSON.stringify(data.createBookingPayload))
        })
    })

    it('update Booking', () => {
        cy.updateBooking(`booking/${createBookingresponse.bookingid}`, token, data.updateBookingPayload).then(resp => {
            expect(JSON.stringify(resp.body)).to.not.eq(JSON.stringify(data.createBookingPayload))
        })
    })

    it('partial Update Booking', () => {
        cy.partialUpdateBooking(`booking/${createBookingresponse.bookingid}`, token, data.partialUpdateBookingPayload).then(resp => {
            expect(resp.body.firstname).to.eq(data.partialUpdateBookingPayload.firstname)
            expect(resp.body.totalprice).to.eq(data.partialUpdateBookingPayload.totalprice)
        })
    })

    after(() => {
        cy.task('log', 'DELETING BOOKING')
        cy.deleteBooking(`booking/${createBookingresponse.bookingid}`, token)
    })

})