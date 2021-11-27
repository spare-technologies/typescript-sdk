import {SpDomesticPayment} from "./SpDomesticPayment";
import {SpUserAccount} from "../Account/SpUserAccount";
import {SpPaymentUserAccount} from "../Account/SpPaymentUserAccount";
import {JsonProperty, Serializable} from 'typescript-json-serializer';

import {SpPaymentSource} from "../../../Enum/Payment/SpPaymentSource";

@Serializable()
export class SpDomesticPaymentResponse extends SpDomesticPayment {
    @JsonProperty({name: 'id'})
    public id: string | null;
    @JsonProperty({name:'reference'})
    public reference: string | null;
    @JsonProperty({name: 'currency'})
    public currency: string | null;
    @JsonProperty({name: 'issuer'})
    public issuer: SpUserAccount | null;
    @JsonProperty({name: 'issuedFrom'})
    public issuedFrom?: SpPaymentSource | null;
    @JsonProperty({name: 'debtor'})
    public debtor: SpPaymentUserAccount | null;
    @JsonProperty({name: 'link'})
    public link: string | null;
    @JsonProperty({name: 'createdAt'})
    public createdAt: string | null;
    constructor(amount: number | null, description: string | null) {
        super(amount, description);
    }
}
