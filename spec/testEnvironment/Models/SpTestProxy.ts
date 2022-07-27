import {JsonObject, JsonProperty} from "typescript-json-serializer";

@JsonObject()
export class SpTestProxy {
    @JsonProperty({name: 'host'})
    public host: string | null

    @JsonProperty({name: 'port'})
    public port: number | null

    @JsonProperty({name: 'username'})
    public username: string | null

    @JsonProperty({name: 'password'})
    public password: string | null
}
