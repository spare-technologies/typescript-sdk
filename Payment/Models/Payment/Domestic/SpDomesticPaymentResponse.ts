import {SpDomesticPayment} from "./SpDomesticPayment";
import {SpUserAccount} from "../Account/SpUserAccount";
import {SpPaymentUserAccount} from "../Account/SpPaymentUserAccount";
import {deserialize, JsonProperty, Serializable} from 'typescript-json-serializer';

import {SpPaymentSource} from "../../../Enum/Payment/SpPaymentSource";

@Serializable()
export class SpDomesticPaymentResponse extends SpDomesticPayment{
    @JsonProperty({name: 'id'})
    public Id: string;
    @JsonProperty({name:'reference'})
    public Reference: string;
    @JsonProperty({name: 'currency'})
    public Currency: string;
    @JsonProperty({name: 'issuer'})
    public Issuer: SpUserAccount;
    @JsonProperty({name: 'issuedFrom'})
    public IssuedFrom?: SpPaymentSource;
    @JsonProperty({name: 'debtor'})
    public Debtor: SpPaymentUserAccount;
    @JsonProperty({name: 'link'})
    public Link: string;
    @JsonProperty({name: 'createdAt'})
    public CreatedAt: string;
    constructor() {
        super();
    }
}