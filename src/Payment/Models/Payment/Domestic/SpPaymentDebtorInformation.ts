import {JsonObject, JsonProperty} from "typescript-json-serializer";

@JsonObject()
export class SpPaymentDebtorInformation {
    @JsonProperty({name: 'fullname'})
    public fullName?: string | null;

    @JsonProperty({name: 'email'})
    public email?: string | null;

    @JsonProperty({name: 'phone'})
    public phone?: string | null;

    @JsonProperty({name: 'customerReferenceId'})
    public customerReferenceId?: string | null;
}
