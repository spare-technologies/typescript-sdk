import {SpCrypto} from "../../../../src/Helpers/Security/Crypto/SpCrypto";


describe("Sp Crypto test", () => {
    const keys = SpCrypto.GenerateKeyPair();

    it("Key pair should not be null", function () {
        cy.task('log', keys.publicKey)
        cy.task('log', keys.privateKey)
        expect(keys).not.equal(null);
    });

    it("Private key should not be blank", function () {
        expect(keys.privateKey !== "" && keys.privateKey !== null,).to.be.true

    });

    it("Public key should not be blank", function () {
        expect(keys.publicKey !== "" && keys.publicKey !== null).to.be.true
    });
})