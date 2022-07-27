import {SpProxy} from "../../Helpers/SpProxy";
import {JsonObject, JsonProperty} from "typescript-json-serializer";
import {SpClientSdkError} from "../Errors/SpClientSdkError";

@JsonObject()
export class SpPaymentClientOptions {
    @JsonProperty({name: 'baseUrl'})
    public baseUrl: string;

    @JsonProperty({name: 'appId'})
    public appId: string;

    @JsonProperty({name: 'apiKey'})
    public apiKey: string;

    @JsonProperty({name: 'proxy'})
    public proxy?: SpProxy | null = null
}
