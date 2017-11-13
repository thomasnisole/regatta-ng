import { deserialize, ICustomConverter, serialize } from 'json-typescript-mapper';
import * as _ from 'underscore/underscore';
import { AbstractCard } from '../model/abstract-card';
import { Card } from '../model/card';
import { CloudCard } from '../model/cloud-card';
import { OptionCard } from '../model/option-card.enum';
import { SteeringWheelCard } from '../model/steering-wheel-card';

export class CardConverter implements ICustomConverter {

  public fromJson(data: any): AbstractCard[] {
    return _.map(data, (d: any) => this.convertCard(d));
  }

  public toJson(cards: AbstractCard[]): any {
    return _.map(cards, (card: AbstractCard) => serialize(card));
  }

  public convertCard(data: any) {
    if (this.hasCloudOption(data.options)) {
      return deserialize(CloudCard, data);
    } else if (this.hasSteeringWheelOption(data.options)) {
      return deserialize(SteeringWheelCard, data);
    } else {
      return deserialize(Card, data);
    }
  }

  private hasOption(options: OptionCard[], option: OptionCard): boolean {
    if (!options) {
      return false;
    }

    if (options.length === 0) {
      return false;
    }

    return !_.isUndefined(_.find(options, (o: OptionCard) => o === option));
  }

  private hasCloudOption(options: OptionCard[]): boolean {
    return this.hasOption(options, OptionCard.CLOUD);
  }

  private hasSteeringWheelOption(options: OptionCard[]): boolean {
    return this.hasOption(options, OptionCard.STEERING_WHEEL);
  }
}

export const cardConverter = new CardConverter();
