import {SpDomesticPayment} from "../Models/Payment/Domestic/SpDomesticPayment";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";
import {SpareSdkResponse} from "../Models/Response/SpareSdkResponse";

export interface ISpPaymentClient {

    /***
     * Create domestic payment
     * @param payment
     * @constructor
     */
    CreateDomesticPayment(payment: SpDomesticPayment): Promise<SpareSdkResponse<SpDomesticPaymentResponse, object>>;

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
