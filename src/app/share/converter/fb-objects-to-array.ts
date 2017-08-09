import {deserialize, ICustomConverter} from 'json-typescript-mapper';
import * as _ from 'underscore/underscore';
import {FbIdentifiable} from '../model/fb-identifiable';

export class FbObjectsToArrayConverter<T extends FbIdentifiable> implements ICustomConverter {
  public constructor(private type: {new(): T}) {}

  public fromJson(data: any[]): T[] {
    if (!data) {
      return [];
    }

    const a = [];

    _.map(data, (value, key) => {
      const obj = deserialize(this.type, value);
      obj.id = key;
      a.push(obj);
    });

    return a;
  }

  public toJson(data: T[]): any {
    if (!data) {
      return null;
    }

    const obj = {};

    _.each(data, (value) => {
      obj[value.id] = value;
      delete obj[value.id].id;
    });

    return obj;
  }
}
