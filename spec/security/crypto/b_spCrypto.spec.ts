import {SpCrypto} from "../../../dist";

describe("Sp Crypto test", () => {
    const keys = SpCrypto.GenerateKeyPair();

    it("Key pair should not be null", function () {
        expect(keys).not.toBeUndefined()
        expect(keys).not.toBeNull()
        expect(keys).not.toBeNaN()
    });

    it("Private key should not be blank", function () {
        expect(keys.privateKey !== "" && keys.privateKey !== null,).toBe(true)

    });

    it("Public key should not be blank", function () {
        expect(keys.publicKey !== "" && keys.publicKey !== null).toBe(true)
    });
})
