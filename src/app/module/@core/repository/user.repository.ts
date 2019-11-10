import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {Observable, of} from 'rxjs';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {catchError, map} from 'rxjs/operators';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class UserRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) {}

  public findByUid(uid: string): Observable<User> {
    return this.dataService.findOne(`/users/${uid}`).pipe(
      map((data: {id: string}) => this.deserializer.deserialize(User, data)),
      catchError(() => of(null))
    );
  }

  public create(user: User): Observable<User> {
    return this.dataService.createOne(`/users/${user.uid}`, this.serializer.serialize(user)).pipe(
      map(() => user)
    );
  }
}
