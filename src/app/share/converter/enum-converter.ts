import {ICustomConverter} from 'json-typescript-mapper';

export class EnumConverter implements ICustomConverter {
  public fromJson(data: any): any {
    return data;
  }

  public toJson(data: any): any {
    return data;
  }
}

export const enumConverter = new EnumConverter();
