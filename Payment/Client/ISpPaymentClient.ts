import {SpDomesticPayment} from "../Models/Payment/Domestic/SpDomesticPayment";
import {SpDomesticPaymentResponse} from "../Models/Payment/Domestic/SpDomesticPaymentResponse";

export interface ISpPaymentClient {
    CreateDomesticPayment(payment: SpDomesticPayment): Promise<SpDomesticPaymentResponse>;
    GetDomesticPayment(id: string): Promise<any>;
    ListDomesticPayments(start: number, perPage: number): Promise<SpDomesticPaymentResponse[]>;
}