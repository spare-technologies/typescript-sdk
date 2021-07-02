import {JsonProperty} from 'typescript-json-serializer';

export class SpDomesticPayment {
    @JsonProperty({name: 'amount'})
    public Amount: number;
    @JsonProperty({name: 'description'})
    public Description: string;

    constructor() {

    }
}
