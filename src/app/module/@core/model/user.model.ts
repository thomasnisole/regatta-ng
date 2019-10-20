import {JsonProperty} from 'ts-serializer-core';
import {LoggedUserInformation} from '../../@system/model/logged-user-information.model';

export class User extends LoggedUserInformation {

  @JsonProperty({name: 'id', excludeToJson: true})
  public uid: string;

  @JsonProperty('victoryCount')
  public victoryCount: number;

  @JsonProperty('podiumCount')
  public podiumCount: number;

  @JsonProperty('partyCount')
  public partyCount: number;

  public constructor(values?: Partial<User>) {
    super();

    Object.assign(this, values);
  }
}
