import {JsonSerializer, logError} from "typescript-json-serializer";
import * as sdk from "../../dist"


describe('Serialization test', function () {
    it('should serialize', function () {
        let model = new sdk.SpareSdkResponse<sdk.SpDomesticPaymentResponse,object>();
        model.data = new sdk.SpDomesticPaymentResponse(10,"serialize test")
        model.meta = {}
        expect(model.toStableJson()).not.toBeNull()
    });

    it('should deserialize', function () {
        const serializer = new JsonSerializer({
            errorCallback: logError,
            nullishPolicy: {
                undefined: 'remove',
                null: 'remove'
            }
        })

        let json = {"data":{"amount":"10","description":"serialize test"},"meta":{}}
        let object = serializer.deserialize<sdk.SpareSdkResponse<sdk.SpDomesticPaymentResponse,object>>(json, sdk.SpareSdkResponse) as sdk.SpareSdkResponse<sdk.SpDomesticPaymentResponse,object>;

        expect(object).not.toBeUndefined()
        expect(object).not.toBeNull()
        expect(object).not.toBe(null)

        expect(object.data).not.toBeUndefined();
        expect(object.data).not.toBeNull();
        expect(object.data).not.toBe(null);
    });
});

