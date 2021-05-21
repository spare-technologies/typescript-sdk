const {env} = require("../../../env-key");
const headers = {
    'app-id': env.appId,
    'x-api-key': env.apiKey,
    'Content-Type': 'application/json',
}

describe('Test Payment Api', () => {
    it('List Payment', () => {
        cy.request({
            method: 'get',
            url: '/api/v1.0/payments/domestic/List',
            headers: headers
        }).then((res) => {
            expect(res.body).have.property('data');
        })
    })

    it('Get Payment', () => {
        cy.request({
            method: 'get',
            url: '/api/v1.0/payments/domestic/Get?id=d214857b-d654-48a0-b039-445e2b46b0e2',
            headers: headers
        }).then((res) => {
            expect(res.body).have.property('data');
        })
    })

    it('Create Payment', () => {
        cy.request({
            method: 'post',
            url: '/api/v1.0/payments/domestic/Create',
            body: {
                Amount : 20,
                Description : "Test domistic payment",
                FailUrl : "https://furl.com",
                SuccessUrl : "https://surl.com"
            },
            headers: headers
        }).then((res) => {
            expect(res.body).have.property('data');
        })
    })
})
