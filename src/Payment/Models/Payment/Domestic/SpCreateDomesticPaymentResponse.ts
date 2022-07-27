import {SpDomesticPaymentResponse} from "./SpDomesticPaymentResponse";
import {JsonProperty, JsonObject} from "typescript-json-serializer";

@JsonObject()
export class SpCreateDomesticPaymentResponse {
    @JsonProperty({name: 'payment', type: SpDomesticPaymentResponse})
    public payment?: SpDomesticPaymentResponse | null;

    @JsonProperty({name: 'signature'})
    public signature?: string | null

    constructor(payment: SpDomesticPaymentResponse | null, signature: string | null) {
        this.payment = payment;
        this.signature = signature;
    }
}
