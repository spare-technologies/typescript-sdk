import "../../../src/Helpers/Extensions/SerilizableExtension.ts";
import {deserialize} from "typescript-json-serializer";
import {SpareSdkResponse} from "../../../src/Payment/Models/Response/SpareSdkResponse";
import {SpDomesticPaymentResponse} from "../../../src/Payment/Models/Payment/Domestic/SpDomesticPaymentResponse";

describe('Serialization test', function () {
    it('should serialize', function () {
        let model = new SpareSdkResponse<SpDomesticPaymentResponse,object>();
        model.data = new SpDomesticPaymentResponse(10,"serialize test")
        model.meta = {}
        expect(model.toStableJson()).is.not.null
        cy.task('log', "json " + model.toStableJson())
    });

    it('should deserialize', function () {
        let json = {"data":{"amount":"10","description":"serialize test"},"meta":{}}
        let object = deserialize<SpareSdkResponse<SpDomesticPaymentResponse,object>>(json,SpareSdkResponse);
        expect(object).is.not.null
        expect(object.data).is.not.null
        expect(object.data?.description == null || object.data?.description == '' || object.data?.description == 'undefined')
    });
});
