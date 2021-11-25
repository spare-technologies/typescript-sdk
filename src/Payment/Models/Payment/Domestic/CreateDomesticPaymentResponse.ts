import {SpareSdkResponse} from "../../Response/SpareSdkResponse";
import {SpDomesticPaymentResponse} from "./SpDomesticPaymentResponse";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpCreateDomesticPaymentResponse {

    @JsonProperty({name: 'PaymentSuccess'})
    public Payment: SpDomesticPaymentResponse;
    @JsonProperty({name: 'Signature'})
    public Signature: string;

    constructor(paymentSuccess: SpDomesticPaymentResponse, signature: string) {
        this.Payment = paymentSuccess;
        this.Signature = signature;
    }
}
