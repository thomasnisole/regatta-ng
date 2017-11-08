import {JsonProperty} from 'json-typescript-mapper';

export class User {
  @JsonProperty('$key')
  public id: string;

  @JsonProperty('email')
  public username: string = void 0;

  @JsonProperty('displayName')
  public displayName: string = void 0;

  @JsonProperty('photoURL')
  public photoURL: string = void 0;

  @JsonProperty('victoryCount')
  public victoryCount: number = void 0;

  @JsonProperty('podiumCount')
  public podiumCount: number = void 0;

  @JsonProperty('partyCount')
  public partyCount: number = void 0;
}
