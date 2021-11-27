import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpUserPaymentBankAccount {
    @JsonProperty({name: 'scheme'})
    public scheme: string | null;
    @JsonProperty({name: 'identification'})
    public identification: string | null;
    constructor() {
    }
}
