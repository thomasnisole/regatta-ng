import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexing-game-component',
  templateUrl: './indexing-game-component.component.html',
  styleUrls: ['./indexing-game-component.component.scss']
})
export class IndexingGameComponentComponent implements OnInit {

  public message: string;

  private serviceId: string = 'CastReceiverManagerService';

  manager: any;

  public constructor() { }

  public ngOnInit(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js';

    script.onload = () => {
      if (this.manager != null) {
        return false;
      }

      cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.NONE);

      this.manager = cast.receiver.CastReceiverManager.getInstance();

      this.manager.onReady = (event) =>  {
        console.log('Received Ready event: ' + JSON.stringify(event.data));
        this.manager.setApplicationState('Application status is ready...');
      };

      this.manager.onSenderConnected = (event) => {
        console.log('Received Sender Connected event: ' + event.data);
        console.log(this.manager.getSender(event.data).userAgent);
      };

      this.manager.onSenderDisconnected = (event) => {

        if (this.manager.getSenders().length == 0 && event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
          window.close();
        }
      };

      this.manager.onSystemVolumeChanged = (event) => {
        console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
          event.data['muted']);
      };
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
