import {JsonProperty, JsonObject} from "typescript-json-serializer";

@JsonObject()
export class SpareSdkResponse<T, TV> {
    @JsonProperty({name: 'error'})
    public error: string | null;

    @JsonProperty({name: 'data'})
    public data: T | null;

    @JsonProperty({name: 'meta'})
    public meta: TV | null;
}
