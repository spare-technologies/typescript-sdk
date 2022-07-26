import {SpUserAccount} from "./SpUserAccount";
import {SpUserPaymentBankAccount} from "./SpUserPaymentBankAccount";
import {JsonProperty, JsonObject} from "typescript-json-serializer";

@JsonObject()
export class SpPaymentUserAccount {
    @JsonProperty({name: 'account'})
    public account?: SpUserAccount | null;

    @JsonProperty({name: 'bankAccount'})
    public bankAccount?: SpUserPaymentBankAccount | null;
}
