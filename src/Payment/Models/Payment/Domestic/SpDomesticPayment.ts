import {JsonProperty, JsonObject} from 'typescript-json-serializer';

@JsonObject()
export class SpDomesticPayment {
    @JsonProperty({name: 'amount'})
    public amount?: number | null;

    @JsonProperty({name: 'description'})
    public description?: string | null;

    @JsonProperty({name: 'orderId'})
    public orderId?: string | null;

    constructor(amount: number, description: string | null = null, orderId: string | null = null) {
        this.amount = amount;
        this.description = description;
        this.orderId = orderId
    }
}
