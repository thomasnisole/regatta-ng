import {JsonProperty} from 'json-typescript-mapper';
import {Buoy} from './buoy';
import {Player} from './player';
import {Rectangle} from './rectangle';
import {SeaElement} from './sea-element';

export class Board extends Rectangle {

  @JsonProperty('zoom')
  public zoom: number = void 0;

  @JsonProperty({name: 'buoys', clazz: Buoy})
  public buoys: Buoy[] = void 0;

  @JsonProperty({name: 'seaElements', clazz: SeaElement})
  public seaElements: SeaElement[] = void 0;

  @JsonProperty('departureArea')
  public departureArea: Rectangle = void 0;

  public isInDeparture(player: Player): boolean {
    if (!player) {
      return false;
    }

    return player.boat.getCongestion().isInAnotherRectangle(this.departureArea);
  }
}
