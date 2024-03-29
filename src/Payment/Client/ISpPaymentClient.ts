import {SpDomesticPayment} from "../Models/Payment/Domestic/SpDomesticPayment";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";
import {SpareSdkResponse} from "../Models/Response/SpareSdkResponse";
import {SpCreateDomesticPaymentResponse} from "../Models/Payment/Domestic/SpCreateDomesticPaymentResponse";
import {SpDomesticPaymentRequest} from "../Models/Payment/Domestic/SpDomesticPaymentRequest";

export interface ISpPaymentClient {

    /***
     * Create domestic payment
     * @param payment
     * @param signature
     * @constructor
     */
    CreateDomesticPayment(payment: SpDomesticPaymentRequest, signature: string): Promise<SpCreateDomesticPaymentResponse>;

    /***
     * Get domestic payment
     * @param id
     * @constructor
     */
    GetDomesticPayment(id: string): Promise<SpareSdkResponse<SpDomesticPaymentResponse, object>>;

    /***
     * List domestic payment
     * @param start
     * @param perPage
     * @constructor
     */
    ListDomesticPayments(start: number, perPage: number): Promise<SpareSdkResponse<SpDomesticPaymentResponse[], object>>;
}
