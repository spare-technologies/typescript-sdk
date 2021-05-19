import {ISpPaymentClient} from "./ISpPaymentClient";
import {SpDomesticPayment} from "../Models/Payment/Domestic/SpDomesticPayment";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";
import {SpPaymentClientOptions} from "./SpPaymentClientOptions";
import {SpEndpoints} from "./SpEndpoints";
import {deserialize, IGenericObject} from '@mdtalel/json-typescript-mapper2/index';
import {SpareSdkResponse} from "../Models/Response/SpareSdkResponse";

const axios = require('axios').default;

export class SpPaymentClient implements ISpPaymentClient {
    private headers = {
        'app-id': `${this._clientOptions.AppId}`,
        'x-api-key': `${this._clientOptions.ApiKey}`,
        'Content-Type': 'application/json',
    };

    private GetUrl(endpoint: SpEndpoints): string {
        return `${this._clientOptions.BaseUrl}${endpoint.Value}`
    }

    private GetBody(o: object) {

    }

    constructor(private _clientOptions: SpPaymentClientOptions) {
    }

    async CreateDomesticPayment(payment: SpDomesticPayment) {
        const response = await axios({
            method: 'post',
            url: this.GetUrl(SpEndpoints.CreateDomesticPayment),
            headers: this.headers,
            data: {
                payment: payment
            }
        })
        return response.data.data;
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
        return response.data.data;
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
        return response.data.data;
    }
}