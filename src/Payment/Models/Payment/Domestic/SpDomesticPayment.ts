import {JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class SpDomesticPayment {
    @JsonProperty({name: 'amount'})
    public amount: number | null;
    @JsonProperty({name: 'description'})
    public description: string | null;

    constructor(amount: number | null, description: string | null) {
        this.amount = amount;
        this.description = description;
    }
}
