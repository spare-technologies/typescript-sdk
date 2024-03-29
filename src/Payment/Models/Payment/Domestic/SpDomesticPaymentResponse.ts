import {SpDomesticPayment} from "./SpDomesticPayment";
import {SpPaymentUserAccount} from "../Account/SpPaymentUserAccount";
import {JsonProperty, JsonObject} from 'typescript-json-serializer';

import {SpPaymentSource} from "../../../Enum/Payment/SpPaymentSource";
import {SpPaymentIssuer} from "../Account/SpPaymentIssuer";
import {SpPaymentStatus} from "../../../Enum/Payment/SpPaymentStatus";

@JsonObject()
export class SpDomesticPaymentResponse extends SpDomesticPayment {
    @JsonProperty({name: 'id'})
    public id?: string | null;

    @JsonProperty({name: 'reference'})
    public reference?: string | null;

    @JsonProperty({name: 'currency'})
    public currency?: string | null;

    @JsonProperty({name: 'issuer', type: SpPaymentIssuer})
    public issuer?: SpPaymentIssuer | null;

    @JsonProperty({name: 'issuedFrom'})
    public issuedFrom?: SpPaymentSource | null;

    @JsonProperty({name: 'debtor', type: SpPaymentUserAccount})
    public debtor?: SpPaymentUserAccount | null;

    @JsonProperty({name: 'link'})
    public link?: string | null;

    @JsonProperty({name: 'createdAt'})
    public createdAt?: string | null;

    @JsonProperty({name: 'status'})
    public status?: SpPaymentStatus | null

    constructor(amount: number, description: string | null = null) {
        super(amount, description);
    }
}
