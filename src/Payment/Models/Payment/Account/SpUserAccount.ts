import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpUserAccount {
    @JsonProperty({name: 'id'})
    public id: string | null;
    @JsonProperty({name: 'identifier'})
    public identifier: string | null;
    @JsonProperty({name: 'name'})
    public name: string | null;
    @JsonProperty({name: 'picture'})
    public picture: string | null;
    constructor() {
    }
}
