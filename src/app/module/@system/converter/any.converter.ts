import {Converter} from 'ts-serializer-core';

export class AnyConverter implements Converter<any, any> {

  public fromJson(value: any): any {
    return value;
  }

  public toJson(value: any): any {
    return value;
  }
}
