import {SpDomesticPaymentResponse} from "./SpDomesticPaymentResponse";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpCreateDomesticPaymentResponse {
    @JsonProperty({name: 'payment'})
    public payment: SpDomesticPaymentResponse | null;
    @JsonProperty({name: 'signature'})
    public signature: string | null;

    constructor(payment: SpDomesticPaymentResponse | null, signature: string | null) {
        this.payment = payment;
        this.signature = signature;
    }
}
