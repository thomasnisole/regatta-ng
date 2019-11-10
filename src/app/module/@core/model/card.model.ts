import {JsonProperty} from 'ts-serializer-core';
import {CardType} from './card-type.enum';
import {OptionCard} from './option-card.enum';
import {Possibility} from './possibility.model';
import {AnyConverter} from '../../@system/converter/any.converter';

export class Card {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('name')
  public name: string;

  @JsonProperty({name: 'svgParams', customConverter: AnyConverter })
  public svgParams: any[];

  @JsonProperty('width')
  public width: number;

  @JsonProperty('height')
  public height: number;

  @JsonProperty({name: 'possibilities', type: Possibility})
  public possibilities: Possibility[];

  @JsonProperty('type')
  public type: CardType;

  @JsonProperty('options')
  public options: OptionCard;

  public gameId: string;

  public playerId: string;

  public selectedToDrop: boolean;
}
