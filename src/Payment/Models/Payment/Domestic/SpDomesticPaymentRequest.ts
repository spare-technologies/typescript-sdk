import {SpDomesticPayment} from "./SpDomesticPayment";
import {SpPaymentDebtorInformation} from "./SpPaymentDebtorInformation";
import {JsonObject, JsonProperty} from "typescript-json-serializer";

@JsonObject()
export class SpDomesticPaymentRequest extends SpDomesticPayment {
    @JsonProperty({name: 'customerInformation'})
    public customerInformation?: SpPaymentDebtorInformation | null;

    constructor(amount: number,
                description: string | null = null,
                orderId: string | null = null,
                customerInformation: SpPaymentDebtorInformation | null = null) {
        super(amount, description, orderId);
        this.customerInformation = customerInformation
    }
}
