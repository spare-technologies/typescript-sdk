import {JsonProperty, JsonObject} from "typescript-json-serializer";

@JsonObject()
export class SpUserPaymentBankAccount {
    @JsonProperty({name: 'scheme'})
    public scheme?: string | null

    @JsonProperty({name: 'identification'})
    public identification?: string | null
}
