import * as sdk from "../../../dist"

describe('Ecc signature manager test', function () {
    it('should sign and verify', function () {
        const keys = sdk.SpCrypto.GenerateKeyPair()

        const signature = sdk.SpEccSignatureManager.sign(keys.privateKey, "data");
        expect(signature == null || signature == "").toBe(false);

        expect(sdk.SpEccSignatureManager.verify(keys.publicKey, "data", signature)).toBe(true)
    });
});
