import {JsonProperty} from 'ts-serializer-core';

export abstract class FbIdentifiable {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;
}
