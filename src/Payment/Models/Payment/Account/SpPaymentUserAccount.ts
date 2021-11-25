import {SpUserAccount} from "./SpUserAccount";
import {SpUserPaymentBankAccount} from "./SpUserPaymentBankAccount";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpPaymentUserAccount {
    @JsonProperty({name: 'account'})
    public Account: SpUserAccount;
    @JsonProperty({name: 'bankAccount'})
    public BankAccount: SpUserPaymentBankAccount;
    constructor() {
    }
}
