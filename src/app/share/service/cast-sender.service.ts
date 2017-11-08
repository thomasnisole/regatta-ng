import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class CastSenderService {

  private castSession;

  private cast;

  public constructor() {}

  public initialize(onReady: Function = null): void {
    this.cast = window['chrome'].cast;
    const sessionRequest = new this.cast.SessionRequest(environment.cast.applicationId);
    const apiConfig = new this.cast.ApiConfig(
      sessionRequest,
      (session) => void 0,
      (status) => {
        if (status !== this.cast.ReceiverAvailability.AVAILABLE) {
          return;
        }

        if (onReady) {
          onReady(status);
        }
      }
    );
    this.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
  }

  public makeRequest(onSuccess: Function = null, onError: Function = null): void {
    if (this.castSession) {
      return;
    }

    this.cast.requestSession(
      (session) => {
        this.castSession = session;

        if (onSuccess) {
          onSuccess();
        }
      }, (err) => {
        console.log('make request error', err);

        if (onError) {
          onError();
        }
      }
    );
  }

  public sendMessage(message): void {
    this.castSession.sendMessage(environment.cast.namespace, message);
  }

  public isReady(): boolean {
    return !!this.castSession;
  }

  private onInitSuccess(e): void {
    console.log('init success ', e);
  }

  private onRequestSuccess(e): void {
    console.log('request success', e);
  }

  private onError(err): void {
    console.log('on error', err);
  }
}
