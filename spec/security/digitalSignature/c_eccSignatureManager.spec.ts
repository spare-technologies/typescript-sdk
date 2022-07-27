import * as sdk from "../../../dist"
import {faker} from '@faker-js/faker'

describe('Ecc signature manager test', function () {
    it('should sign and verify', function () {
        const data = faker.lorem.text();

        const keys = sdk.SpCrypto.GenerateKeyPair()

        const signature = sdk.SpEccSignatureManager.sign(keys.privateKey, data);
        expect(signature == null || signature == "").toBe(false);

        expect(sdk.SpEccSignatureManager.verify(keys.publicKey, data, signature)).toBe(true)

        expect(sdk.SpEccSignatureManager.verify(keys.publicKey, faker.lorem.text(), signature)).toBe(false)
    });
});
