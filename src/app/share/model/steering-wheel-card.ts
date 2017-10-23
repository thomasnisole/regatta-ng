import * as _ from 'underscore/underscore';
import { AbstractCard } from './abstract-card';

export class SteeringWheelCard extends AbstractCard {

  public canDisplayPossibilities(cards: AbstractCard[]): boolean {
    if (cards.length === 0 && (!this.previewPossibilities || this.previewPossibilities.length === 0)) {
      return true;
    }

    const swCards = _.sortBy(_.filter(cards, (c: AbstractCard) => c instanceof SteeringWheelCard), 'previewOrder');
    if (swCards.length === 1 && swCards[0] === _.last(cards)) {
      return true;
    }

    return false;
  }
}
