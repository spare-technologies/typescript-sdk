import {JsonProperty, Serializable} from "typescript-json-serializer";

@Serializable()
export class SpUserAccount {
    @JsonProperty({name: 'id'})
    public Id: string;
    @JsonProperty({name: 'identifier'})
    public Identifier: string;
    @JsonProperty({name: 'name'})
    public Name: string;
    @JsonProperty({name: 'picture'})
    public Picture: string;
    constructor() {
    }
}
