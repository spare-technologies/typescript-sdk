import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpUserPaymentBankAccount {
    @JsonProperty({name: 'scheme'})
    public Scheme: string;
    @JsonProperty({name: 'identification'})
    public Identification: string;
    constructor() {
    }
}
