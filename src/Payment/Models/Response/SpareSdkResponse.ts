import {JsonProperty} from "typescript-json-serializer";

export class SpareSdkResponse<T, TV> {
    @JsonProperty('error')
    public Error: string;
    @JsonProperty('data')
    public Data: T;
    @JsonProperty('meta')
    public Meta: TV;
    constructor(body?: any) {
        this.Error = body ? body.Error : null;
        this.Data = body ? body.Data : null;
        this.Meta = body ? body.Meta : null;
    }
}