import {JsonProperty} from 'typescript-json-serializer';
export class SpDomesticPayment {
    @JsonProperty({name:'amount'})
    public Amount: number;
    @JsonProperty({name: 'description'})
    public Description: string;
    @JsonProperty({name: 'successUrl'})
    public SuccessUrl: string;
    @JsonProperty({name:'failUrl'})
    public FailUrl: string;
    constructor() {
    }
}
