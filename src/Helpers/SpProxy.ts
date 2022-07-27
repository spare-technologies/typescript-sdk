import {JsonObject, JsonProperty} from "typescript-json-serializer";

@JsonObject()
export class SpProxy {
    @JsonProperty({name: 'host'})
    public host: string

    @JsonProperty({name: 'port'})
    public port: number

    @JsonProperty({name: 'username'})
    public username?: string | null

    @JsonProperty({name: 'password'})
    public password?: string | null
}
