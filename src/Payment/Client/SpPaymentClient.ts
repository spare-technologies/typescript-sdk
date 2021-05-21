import {ISpPaymentClient} from "./ISpPaymentClient";
import {SpDomesticPayment} from "../Models/Payment/Domestic/SpDomesticPayment";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";
import {SpPaymentClientOptions} from "./SpPaymentClientOptions";
import {SpEndpoints} from "./SpEndpoints";
import {deserialize} from 'typescript-json-serializer';
import {SpareSdkResponse} from "../Models/Response/SpareSdkResponse";
import "../../Helpers/Extensions/SerilizableExtension";

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

    private static GetBody(o: object) {
        return o.toJson()
    }

    constructor(private _clientOptions: SpPaymentClientOptions) {
    }

    /***
     * Create domestic payment
     * @param payment
     * @constructor
     */
    async CreateDomesticPayment(payment: SpDomesticPayment): Promise<SpareSdkResponse<SpDomesticPaymentResponse, object>> {
        const response = await axios({
            method: 'post',
            url: this.GetUrl(SpEndpoints.CreateDomesticPayment),
            headers: this.headers,
            data: SpPaymentClient.GetBody(payment)
        })
        return deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse);
    }

    /***
     * Get domestic payment
     * @param id
     * @constructor
     */
    async GetDomesticPayment(id: string): Promise<SpareSdkResponse<SpDomesticPaymentResponse, object>> {
        const response = await axios({
            method: 'get',
            url: this.GetUrl(SpEndpoints.GetDomesticPayment),
            params: {
                id: id
            },
            headers: this.headers
        })
        return deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse);
    }

    /***
     * List domestic payment
     * @param start
     * @param perPage
     * @constructor
     */
    async ListDomesticPayments(start: number, perPage: number): Promise<SpareSdkResponse<SpDomesticPaymentResponse[], object>> {
        const response = await axios({
            method: 'get',
            url: this.GetUrl(SpEndpoints.ListDomesticPayments),
            params: {
                start: start,
                perPage: perPage
            },
            headers: this.headers
        })
        return deserialize<SpareSdkResponse<SpDomesticPaymentResponse[], object>>(response.data, SpareSdkResponse);
    }
}
