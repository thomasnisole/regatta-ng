import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {Player} from '../../../@core/model/player.model';
import {ModeState} from '../../state/mode/mode.state';
import {ChangeModeAction} from '../../state/mode/change-mode.action';
import {GameService} from '../../../@core/service/game.service';
import {PlayerService} from '../../../@core/service/player.service';
import {UserService} from '../../../@core/service/user.service';

@Component({
  selector: 'app-action-nav-bar',
  templateUrl: './action-nav-bar.component.html',
  styleUrls: ['./action-nav-bar.component.scss']
})
export class ActionNavBarComponent implements OnInit {

  @Select(ModeState)
  public mode$: Observable<'perform'|'trap'|'trash'>;

  public player$: Observable<Player>;

  public game$: Observable<Game>;

  @Input()
  public clearIsVisible: boolean;

  @Input()
  public trapIsVisible: boolean;

  @Input()
  public trashIsVisible: boolean;

  @Input()
  public playIsVisible: boolean;

  @Input()
  public tackIsVisible: boolean;

  @Input()
  public terminateIsVisible: boolean;

  @Output()
  public launch: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public moveMap: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public tackBabord: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public tackTribord: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public trash: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public perform: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public trap: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public clearPreview: EventEmitter<void> = new EventEmitter<void>();

  public currentAction: EventEmitter<void>;

  public constructor(private store: Store,
                     gameService: GameService,
                     userService: UserService,
                     playerService: PlayerService) {
    this.game$ = gameService.findCurrentGame();

    this.player$ = playerService.findCurrentPayer();
  }

  public ngOnInit(): void {
    this.currentAction = this.perform;
    this.store.dispatch(new ChangeModeAction('play'));
  }

  public changeToPlayMode(): void {
    this.currentAction = this.perform;
    this.store.dispatch(new ChangeModeAction('play'));
  }

  public changeToTrashMode(): void {
    this.currentAction = this.trash;
    this.store.dispatch(new ChangeModeAction('trash'));
  }

  public changeToTrapMode(): void {
    this.currentAction = this.trap;
    this.store.dispatch(new ChangeModeAction('trap'));
  }

  public onClear(): void {
    this.clearPreview.emit();
  }

  public onTerminate(): void {
    this.currentAction.emit();
  }
}
