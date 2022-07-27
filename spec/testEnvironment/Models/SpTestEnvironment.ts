import {JsonObject, JsonProperty} from "typescript-json-serializer";
import {SpTestProxy} from "./SpTestProxy";
import {SpTestKeypair} from "./SpTestKeypair";

@JsonObject()
export class SpTestEnvironment {
    @JsonProperty({name: 'baseUrl'})
    public baseUrl: string | null

    @JsonProperty({name: 'apiKey'})
    public apiKey: string | null

    @JsonProperty({name: 'appId'})
    public appId: string | null

    @JsonProperty({name: 'ecKeypair'})
    public ecKeypair: SpTestKeypair

    @JsonProperty({name: 'serverPublicKey'})
    public serverPublicKey: string | null

    @JsonProperty({name: 'proxy'})
    public proxy: SpTestProxy

    @JsonProperty({name: 'debugMode'})
    public debugMode: boolean = false
}
