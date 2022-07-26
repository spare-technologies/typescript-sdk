import {JsonObject, JsonProperty} from "typescript-json-serializer";

@JsonObject()
export class SpAccount {
    @JsonProperty({name: 'id'})
    public id?: string | null

    @JsonProperty({name: 'email'})
    public email?: string | null

    @JsonProperty({name: 'fullname'})
    public fullName?: string | null

    @JsonProperty({name: 'phone'})
    public phone?: string | null
}
