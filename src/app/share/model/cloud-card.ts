import * as _ from 'underscore/underscore';
import { AbstractCard } from './abstract-card';
import { SteeringWheelCard } from './steering-wheel-card';

export class CloudCard extends AbstractCard {

  public canDisplayPossibilities(cards: AbstractCard[]): boolean {
    if (cards.length === 0 && (!this.previewPossibilities || this.previewPossibilities.length === 0)) {
      return true;
    }

    const swCards = _.sortBy(_.filter(cards, (c: AbstractCard) => c instanceof SteeringWheelCard), 'previewOrder');
    if (swCards.length === 1 && swCards[0] === _.last(cards)) {
      return true;
    }

    if (_.last(cards) === this && this.previewPossibilities && this.previewPossibilities.length < 2) {
      return true;
    }

    return false;
  }
}
