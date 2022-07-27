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

    private readonly headers: {}

    private serializer = new JsonSerializer({
        errorCallback: logError,
        nullishPolicy: {
            undefined: 'remove',
            null: 'remove'
        }
    })

    private GetUrl(endpoint: SpEndpoints): string {
        return `${this._clientOptions.baseUrl}${endpoint.Value}`
    }

    private static GetBody(o: object) {
        return o.toJson()
    }

    constructor(private _clientOptions: SpPaymentClientOptions) {
        if (_clientOptions == null) {
            throw new SpClientSdkError("Client configuration is required")
        }

        if (_clientOptions.baseUrl == 'undefined' || _clientOptions.baseUrl == null) {
            throw new SpClientSdkError("Base URL is required")
        }

        if (_clientOptions.apiKey == 'undefined' || _clientOptions.apiKey == null) {
            throw new SpClientSdkError("App key is required")
        }

        if (_clientOptions.appId == 'undefined' || _clientOptions.appId == null) {
            throw new SpClientSdkError("App key is required")
        }

        this.headers = {
            'app-id': `${this._clientOptions.appId}`,
            'x-api-key': `${this._clientOptions.apiKey}`,
            'Content-Type': 'application/json',
        };
    }

    /***
     * Create domestic payment
     * @param payment
     * @param signature
     * @constructor
     */
    async CreateDomesticPayment(payment: SpDomesticPaymentRequest, signature: string): Promise<SpCreateDomesticPaymentResponse> {
        const Headers = {
            'app-id': `${this._clientOptions.appId}`,
            'x-api-key': `${this._clientOptions.apiKey}`,
            'Content-Type': 'application/json',
            'x-signature': signature
        }

        try {
            const response = await axios({
                method: 'post',
                url: this.GetUrl(SpEndpoints.CreateDomesticPayment),
                headers: Headers,
                data: SpPaymentClient.GetBody(payment),
                proxy: this.buildProxy()
            })

            const responseModel = (this.serializer
                .deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse)) as SpareSdkResponse<SpDomesticPaymentResponse, object>;


            return new SpCreateDomesticPaymentResponse(
                responseModel.data,
                response.headers['x-signature']
            )
        } catch (e) {
            // @ts-ignore
            if (e.response) {
                // @ts-ignore
                return Promise.reject(JSON.stringify(e.response.data))
            }
            // @ts-ignore

            return Promise.reject(e.toString())
        }
    }

    /***
     * Get domestic payment
     * @param id
     * @constructor
     */
    async GetDomesticPayment(id: string): Promise<SpareSdkResponse<SpDomesticPaymentResponse, object>> {
        try {
            const response = await axios({
                method: 'get',
                url: this.GetUrl(SpEndpoints.GetDomesticPayment),
                params: {
                    id: id
                },
                proxy: this.buildProxy(),
                headers: this.headers
            })

            if (response.status != 200) {
                return Promise.reject(new SpClientSdkError(JSON.stringify(response.data.toString())))
            }

            return (this.serializer
                .deserialize<SpareSdkResponse<SpDomesticPaymentResponse, object>>(response.data, SpareSdkResponse)) as SpareSdkResponse<SpDomesticPaymentResponse, object>;
        } catch (e) {
            // @ts-ignore
            if (e.response) {
                // @ts-ignore
                return Promise.reject(JSON.stringify(e.response.data))
            }
            // @ts-ignore

            return Promise.reject(e.toString())
        }
    }

    /***
     * List domestic payment
     * @param start
     * @param perPage
     * @constructor
     */
    async ListDomesticPayments(start: number = 0, perPage: number = 100): Promise<SpareSdkResponse<SpDomesticPaymentResponse[], object>> {

        if (perPage <= 0) {
            perPage = 100
        }

        try {
            const response = await axios({
                method: 'get',
                url: this.GetUrl(SpEndpoints.ListDomesticPayments),
                params: {
                    start: start,
                    perPage: perPage
                },
                proxy: this.buildProxy(),
                headers: this.headers
            })

            if (response.status != 200) {
                return Promise.reject(new SpClientSdkError(JSON.stringify(response.data.toString())))
            }

            return (this.serializer
                .deserialize<SpareSdkResponse<SpDomesticPaymentResponse[], object>>(response.data, SpareSdkResponse)) as SpareSdkResponse<SpDomesticPaymentResponse[], object>;
        } catch (e) {
            // @ts-ignore
            if (e.response) {
                // @ts-ignore
                return Promise.reject(JSON.stringify(e.response.data))
            }
            // @ts-ignore

            return Promise.reject(e.toString())
        }
    }

    /**
     * Build proxy object
     * @private
     */
    private buildProxy(): { port: number; auth: { password: string; username: string } | null; host: string } | null {
        if (this._clientOptions.proxy?.host != null) {

            let credentials = (this._clientOptions.proxy.username != null && this._clientOptions.proxy.password != null) ? {
                username: this._clientOptions.proxy.username,
                password: this._clientOptions.proxy.password
            } : null;

            return {
                host: this._clientOptions.proxy.host,
                port: this._clientOptions.proxy.port,
                auth: credentials
            }
        }
        return null
    }
}
