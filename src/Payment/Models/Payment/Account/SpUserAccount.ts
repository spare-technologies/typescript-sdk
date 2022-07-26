import {JsonProperty, JsonObject} from "typescript-json-serializer";
import {SpAccount} from "./SpAccount";

@JsonObject()
export class SpUserAccount extends SpAccount {
    @JsonProperty({name: 'customerReferenceId'})
    public customerReferenceId?: string | null

    @JsonProperty({name: 'customerPaymentLink'})
    public customerPaymentLink?: string | null
}
