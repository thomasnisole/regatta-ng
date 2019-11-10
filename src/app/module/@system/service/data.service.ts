import {Injectable} from '@angular/core';
import {
  Action,
  AngularFirestore, CollectionReference,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot, QueryDocumentSnapshot, QueryFn, QuerySnapshot
} from '@angular/fire/firestore';
import {forkJoin, from, iif, Observable, of, throwError} from 'rxjs';
import {first, map, switchMap, tap, toArray} from 'rxjs/operators';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

interface Query {
  field: string;
  operator: WhereFilterOp;
  value: string;
}


@Injectable()
export class DataService {

  public constructor(private db: AngularFirestore) {}

  public findAll(path: string, queries: Query[] = [], limit: number = null): Observable<{id: string}[]> {
    const queryFn: QueryFn = (ref: CollectionReference) => {
      let q: firebase.firestore.Query = ref;

      if (limit) {
        q = q.limit(limit);
      }

      queries.forEach((query: Query) => q = ref.where(query.field, query.operator, query.value));

      return q;
    };

    return this.db.collection(path, queryFn).valueChanges({idField: 'id'}).pipe(
      switchMap((dcas: {id: string}[]) => from(dcas).pipe(
        map((dca: {id: string}) => ({id: dca.id, ...dca})),
        toArray()
      ))
    );
  }

  public findOne(path: string): Observable<{id: string}> {
    return this.db.doc(path).snapshotChanges().pipe(
      switchMap((action: Action<DocumentSnapshot<any>>) => iif(
        () => action.payload.exists,
        of(action.payload),
        throwError(`Item at ${path}  not found`)
      )),
      map((payload: DocumentSnapshot<any>) => ({id: payload.id, ...payload.data()}))
    );
  }

  public moveAll(originalPath: string, destinationPath: string, queries: Query[] = [], limit: number = null): Observable<void> {
    return from(this.db.collection(originalPath, this.makeQueryFn(queries, limit)).get()).pipe(
      switchMap((query: QuerySnapshot<any>) => query.docs),
      map((queryDoc: QueryDocumentSnapshot<any>) => from(queryDoc.ref.delete()).pipe(
        map(() => queryDoc.data()),
        switchMap((data: any) => from(this.add(destinationPath, data)))
      )),
      toArray(),
      switchMap((obs$: Observable<string>[]) => forkJoin(obs$)),
      map(() => void 0),
      first()
    );
  }

  public duplicate(originalPath: string, destinationPath: string, queries: Query[] = [], limit: number = null): Observable<void> {
    return from(this.db.collection(originalPath, this.makeQueryFn(queries, limit)).get()).pipe(
      switchMap((query: QuerySnapshot<any>) => query.docs),
      map((queryDoc: QueryDocumentSnapshot<any>) => queryDoc.data()),
      switchMap((data: any) => from(this.add(destinationPath, data))),
      toArray(),
      map(() => void 0),
      first()
    );
  }

  public add(path: string, data: any): Observable<string> {
    return from(this.db.collection(path).add(data)).pipe(
      first(),
      map((docRef: DocumentReference) => docRef.id)
    );
  }

  public createOne(path, data: any): Observable<void> {
    return from(this.db.doc(path).set(data)).pipe(
      first(),
      map(() => void 0)
    );
  }
  public update(path: string, data: any): Observable<void> {
    return from(this.db.doc(path).update(data)).pipe(
      first(),
      map(() => void 0)
    );
  }

  public delete(path: string): Observable<void> {
    return from(this.db.doc(path).delete()).pipe(
      first(),
      map(() => void 0)
    );
  }

  private makeQueryFn(queries: Query[], limit: number): QueryFn {
    return (ref: CollectionReference) => {
      let q: firebase.firestore.Query = ref;

      if (limit) {
        q = q.limit(limit);
      }

      queries.forEach((query: Query) => q = q.where(query.field, query.operator, query.value));

      return q;
    };
  }
}
