import {JsonObject, JsonProperty} from "typescript-json-serializer";

@JsonObject()
export class SpTestKeypair {
    @JsonProperty({name: 'private'})
    public privateKey: string | null;

    @JsonProperty({name: 'public'})
    public publicKey: string | null;
}
