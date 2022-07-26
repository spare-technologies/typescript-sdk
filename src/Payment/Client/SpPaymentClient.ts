import {ISpPaymentClient} from "./ISpPaymentClient";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";
import {SpPaymentClientOptions} from "./SpPaymentClientOptions";
import {SpEndpoints} from "./SpEndpoints";
import {SpareSdkResponse} from "../Models/Response/SpareSdkResponse";
import "../../Helpers/Extensions/SerilizableExtension";
import {SpCreateDomesticPaymentResponse} from "../Models/Payment/Domestic/SpCreateDomesticPaymentResponse";
import {JsonSerializer, logError} from "typescript-json-serializer";
import {SpDomesticPaymentRequest} from "../Models/Payment/Domestic/SpDomesticPaymentRequest";
import {SpClientSdkError} from "../Errors/SpClientSdkError";

const axios = require('axios').default;

export class SpPaymentClient implements ISpPaymentClient {
    private headers = {
        'app-id': `${this._clientOptions.AppId}`,
        'x-api-key': `${this._clientOptions.ApiKey}`,
        'Content-Type': 'application/json',
    };

    private serializer = new JsonSerializer({
        errorCallback: logError,
        nullishPolicy: {
            undefined: 'remove',
            null: 'remove'
        }
    })

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
     * @param signature
     * @constructor
     */
    async CreateDomesticPayment(payment: SpDomesticPaymentRequest, signature: string): Promise<SpCreateDomesticPaymentResponse> {
        const Headers = {
            'app-id': `${this._clientOptions.AppId}`,
            'x-api-key': `${this._clientOptions.ApiKey}`,
            'Content-Type': 'application/json',
            'x-signature': signature
        }

        const response = await axios({
            method: 'post',
            url: this.GetUrl(SpEndpoints.CreateDomesticPayment),
            headers: Headers,
            data: SpPaymentClient.GetBody(payment)
        })

        if (response.status != 200) {
            throw new SpClientSdkError(response.data.toString())
        }

        const responseModel = this.serializer
            .deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse) as SpareSdkResponse<SpDomesticPaymentResponse, object>;


        return new SpCreateDomesticPaymentResponse(
            responseModel.data,
            response.headers['x-signature']
        )
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

        if (response.status != 200) {
            throw new SpClientSdkError(response.data.toString())
        }

        return this.serializer
            .deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse) as SpareSdkResponse<SpDomesticPaymentResponse, object>;
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

        if (response.status != 200) {
            throw new SpClientSdkError(response.data.toString())
        }

        return this.serializer
            .deserialize<SpareSdkResponse<SpDomesticPaymentResponse[], object>>(response.data, SpareSdkResponse) as SpareSdkResponse<SpDomesticPaymentResponse[], object>;
    }
}
