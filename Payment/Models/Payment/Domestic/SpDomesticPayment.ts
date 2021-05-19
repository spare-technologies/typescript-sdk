import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer';
export class SpDomesticPayment {
    @JsonProperty('amount')
    public Amount: number;
    @JsonProperty('description')
    public Description: string;
    @JsonProperty('successUrl')
    public SuccessUrl: string;
    @JsonProperty('failUrl')
    public FailUrl: string;
    constructor() {
    }
}