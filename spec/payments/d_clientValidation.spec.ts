import * as sdk from "../../dist";
import {SpClientSdkError} from "../../dist";
import {faker} from "@faker-js/faker";

describe("Client validation test", () => {
    it('should validate client', async function () {
        expect(() => {
            // @ts-ignore
            new sdk.SpPaymentClient(null)
        }).toThrow(SpClientSdkError)
    });

    it('should check missing api key', function () {
        expect(() => {
            new sdk.SpPaymentClient({
                // @ts-ignore
                apiKey: null,
                baseUrl: "https://example.com",
                appId: faker.random.alphaNumeric()
            })
        }).toThrow(SpClientSdkError)
    });

    it('should check missing app id', function () {
        expect(() => {
            new sdk.SpPaymentClient({
                apiKey: faker.random.alphaNumeric(),
                baseUrl: "https://example.com",
                // @ts-ignore
                appId: null
            })
        }).toThrow(SpClientSdkError)
    });

    it('should check missing base url', function () {
        expect(() => {
            new sdk.SpPaymentClient({
                apiKey: faker.random.alphaNumeric(),
                // @ts-ignore
                baseUrl: null,
                appId: faker.random.alphaNumeric()
            })
        }).toThrow(SpClientSdkError)
    });
})
