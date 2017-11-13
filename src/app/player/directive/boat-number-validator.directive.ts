import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import * as _ from 'underscore/underscore';
import {Game} from '../../share/model/game';
import {Player} from '../../share/model/player';

@Directive({
  selector: '[appBoatNumberValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: BoatNumberValidatorDirective, multi: true}]
})
export class BoatNumberValidatorDirective implements Validator {

  @Input()
  public game: Game;

  public constructor() { }

  public validate(c: AbstractControl): ValidationErrors | any {
    const player = _.filter(this.game.players, (p: Player) => p.boat.boatNumber === c.value);

    return player.length > 0 ? {'boatNumber': {value: c.value}} : null;
  }
}
