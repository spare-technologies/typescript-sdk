import {SpUserAccount} from "./SpUserAccount";
import {SpUserPaymentBankAccount} from "./SpUserPaymentBankAccount";
import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpPaymentUserAccount {
    @JsonProperty({name: 'account'})
    public account: SpUserAccount | null;
    @JsonProperty({name: 'bankAccount'})
    public bankAccount: SpUserPaymentBankAccount | null;
    constructor() {
    }
}
