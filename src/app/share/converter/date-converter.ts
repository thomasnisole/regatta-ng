import {ICustomConverter} from 'json-typescript-mapper';

export class DateConverter implements ICustomConverter {
  public fromJson(data: any): any {
    if (!data) {
      return null;
    }
    return new Date(data);
  }

  public toJson(data: any): any {
    if (!data) {
      return null;
    }
    return data.toISOString();
  }
}

export const dateConverter = new DateConverter();
