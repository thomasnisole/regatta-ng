import {shareReplay} from 'rxjs/operators';
import {MonoTypeOperatorFunction, Observable} from 'rxjs';

export const hotShareReplay: <T>(n: number) => MonoTypeOperatorFunction<T> = (n: number) => <T>(source: Observable<T>) => {
  return source.pipe(shareReplay({bufferSize: n, refCount: true}));
};
