import {JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class SpDomesticPayment {
    @JsonProperty({name: 'amount'})
    public Amount: number;
    @JsonProperty({name: 'description'})
    public Description: string;

    constructor(amount: number, description: string) {
        this.Amount = amount;
        this.Description = description;
    }
}
