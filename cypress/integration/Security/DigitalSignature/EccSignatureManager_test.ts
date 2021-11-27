import {SpCrypto} from "../../../../src/Helpers/Security/Crypto/SpCrypto";
import {SpEccSignatureManager} from "../../../../src/Helpers/Security/DigitalSignature/SpEccSignatureManager";

describe('Ecc signature manager test', function () {
    const keys = SpCrypto.GenerateKeyPair()

    it('should sign and verify', function () {
        const signature = SpEccSignatureManager.sign(keys.privateKey, "data");
        expect(signature == null || signature == "").to.be.false;

        expect(SpEccSignatureManager.verify(keys.publicKey, "data", signature)).to.be.true
    });
});