import {JsonProperty} from 'ts-serializer-core';

export class LoggedUserInformation {

  @JsonProperty({name: 'uid', excludeToJson: true})
  public uid: string;

  @JsonProperty('firstName')
  public firstName: string;

  @JsonProperty('lastName')
  public lastName: string;

  @JsonProperty('email')
  public email: string;

  @JsonProperty('avatar')
  public avatar: string;

  public get displayName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
