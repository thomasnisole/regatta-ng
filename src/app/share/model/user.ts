import {JsonProperty} from 'json-typescript-mapper';

export class User {
  @JsonProperty('$key')
  public id: string;

  @JsonProperty('email')
  public username: string = void 0;

  @JsonProperty('displayName')
  public displayName: string = void 0;
}
