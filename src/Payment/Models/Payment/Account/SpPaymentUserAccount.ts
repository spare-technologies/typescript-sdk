import {SpUserAccount} from "./SpUserAccount";
import {SpUserPaymentBankAccount} from "./SpUserPaymentBankAccount";
import {JsonProperty, JsonObject} from "typescript-json-serializer";

@JsonObject()
export class SpPaymentUserAccount {
    @JsonProperty({name: 'account', type: SpUserAccount})
    public account?: SpUserAccount | null;

    @JsonProperty({name: 'bankAccount', type: SpUserPaymentBankAccount})
    public bankAccount?: SpUserPaymentBankAccount | null;
}
