import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpareSdkResponse<T, TV> {
    @JsonProperty('error')
    public error: string | null;
    @JsonProperty('data')
    public data: T | null;
    @JsonProperty('meta')
    public meta: TV | null;

    constructor() {
    }
}