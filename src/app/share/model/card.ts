import {JsonProperty} from 'json-typescript-mapper';
import {OptionCard} from './option-card.enum';
import {CardType} from './card-type.enum';
import {enumConverter} from '../converter/enum-converter';

export class Card {

  @JsonProperty('name')
  public name: string = void 0;

  @JsonProperty('svgParams')
  public svgParams: object = void 0;

  @JsonProperty({name: 'type', customConverter: enumConverter})
  public type: CardType = void 0;

  @JsonProperty({name: 'options', customConverter: enumConverter})
  public options: OptionCard[] = void 0;

  @JsonProperty('possibilities')
  public possibilities: object = void 0;

  @JsonProperty('width')
  public width: number = void 0;

  @JsonProperty('height')
  public height: number = void 0;
}
