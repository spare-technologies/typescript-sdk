import {SpDomesticPayment} from "./SpDomesticPayment";
import {SpUserAccount} from "../Account/SpUserAccount";
import {SpPaymentUserAccount} from "../Account/SpPaymentUserAccount";
import {JsonProperty} from '@mdtalel/json-typescript-mapper2/index';
import {SpPaymentSource} from "../../../Enum/Payment/SpPaymentSource";
export class SpDomesticPaymentResponse extends SpDomesticPayment{
    @JsonProperty('id')
    public Id: string;
    @JsonProperty('reference')
    public Reference: string;
    @JsonProperty('currency')
    public Currency: string;
    @JsonProperty('issuer')
    public Issuer: SpUserAccount;
    @JsonProperty('issuerForm')
    public IssuedFrom?: SpPaymentSource;
    @JsonProperty('debtor')
    public Debtor: SpPaymentUserAccount;
    @JsonProperty('link')
    public Link: string;
    @JsonProperty('createdAt')
    public CreatedAt: string;
    constructor() {
        super();
    }
}