import {ISpPaymentClient} from "./ISpPaymentClient";
import {SpDomesticPayment} from "../Models/Payment/Domestic/SpDomesticPayment";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";
import {SpPaymentClientOptions} from "./SpPaymentClientOptions";
import {SpEndpoints} from "./SpEndpoints";
import {deserialize, serialize} from 'typescript-json-serializer';
import {SpareSdkResponse} from "../Models/Response/SpareSdkResponse";

const axios = require('axios').default;
const stringify = require('json-stable-stringify');

export class SpPaymentClient implements ISpPaymentClient {
    private headers = {
        'app-id': `${this._clientOptions.AppId}`,
        'x-api-key': `${this._clientOptions.ApiKey}`,
        'Content-Type': 'application/json',
    };

    private GetUrl(endpoint: SpEndpoints): string {
        return `${this._clientOptions.BaseUrl}${endpoint.Value}`
    }

    private static GetBody(o: object) {
        return serialize(o)
    }

    constructor(private _clientOptions: SpPaymentClientOptions) {
    }

    async CreateDomesticPayment(payment: SpDomesticPayment) {
        const response = await axios({
            method: 'post',
            url: this.GetUrl(SpEndpoints.CreateDomesticPayment),
            headers: this.headers,
            data: SpPaymentClient.GetBody(payment)
        })
        const model = deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse);
        return stringify(serialize(model));
    }

    async GetDomesticPayment(id: string) {
        const response = await axios({
            method: 'get',
            url: this.GetUrl(SpEndpoints.GetDomesticPayment),
            params: {
                id: id
            },
            headers: this.headers
        })
        const model = deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse);
        return stringify(serialize(model));
    }

    async ListDomesticPayments(start: number, perPage: number) {
        const response = await axios({
            method: 'get',
            url: this.GetUrl(SpEndpoints.ListDomesticPayments),
            params: {
                start: start,
                perPage: perPage
            },
            headers: this.headers
        })
        const model = deserialize<SpareSdkResponse<SpDomesticPaymentResponse[], object>>(response.data, SpareSdkResponse);
        return stringify(serialize(model));
    }
}