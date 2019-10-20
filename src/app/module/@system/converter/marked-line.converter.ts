import {Converter} from 'ts-serializer-core';
import {Buoy} from '../../@core/model/buoy.model';

export class MarkedLineConverter implements Converter<{buoy1: any, buoy2: any}, {buoy1: Buoy, buoy2: Buoy}> {

  public fromJson(value: {buoy1: any, buoy2: any}): {buoy1: Buoy, buoy2: Buoy} {
    const buoy1: Buoy = new Buoy();
    buoy1.x = value.buoy1.x;
    buoy1.y = value.buoy1.y;
    buoy1.color = value.buoy1.color;

    const buoy2: Buoy = new Buoy();
    buoy2.x = value.buoy2.x;
    buoy2.y = value.buoy2.y;
    buoy2.color = value.buoy2.color;

    return {
      buoy1,
      buoy2
    };
  }

  public toJson(value: {buoy1: Buoy, buoy2: Buoy}): {buoy1: any, buoy2: any} {
    return {
      buoy1: {
        x: value.buoy1.x,
        y: value.buoy1.y,
        color: value.buoy1.color
      },
      buoy2: {
        x: value.buoy2.x,
        y: value.buoy2.y,
        color: value.buoy2.color
      }
    };
  }
}
