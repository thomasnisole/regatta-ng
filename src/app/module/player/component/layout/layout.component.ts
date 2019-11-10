import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {NgxTsDeserializerService} from 'ngx-ts-serializer';
import {Level} from '../../../@core/model/level.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public title: string;

  public constructor(router: Router, activatedRoute: ActivatedRoute, db: AngularFirestore, deserializer: NgxTsDeserializerService) {
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => activatedRoute),
      map((route: ActivatedRoute) => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      switchMap((route) => route.data)
    ).subscribe((event: any) => this.title = event.title);


   /*db.collection('levels').add({

              "arrival" : {
                "buoy1" : {
                  "color" : "#FF0000",
                  "x" : 12,
                  "y" : 30
                },
                "buoy2" : {
                  "color" : "#00FF00",
                  "x" : 24,
                  "y" : 30
                }
              },
              "boatLength" : 5,
              "boatOrientation" : 90,
              "boatWidth" : 1,
              "buoys" : [ {
                "checkLines" : [ {
                  "pointA" : {
                    "x" : 6,
                    "y" : 7
                  },
                  "pointB" : {
                    "x" : -200,
                    "y" : 7
                  }
                }, {
                  "pointA" : {
                    "x" : 6,
                    "y" : 7
                  },
                  "pointB" : {
                    "x" : 6,
                    "y" : -200
                  }
                } ],
                "color" : "#FFFFE0",
                "order" : 1,
                "x" : 6,
                "y" : 7
              }, {
                "checkLines" : [ {
                  "pointA" : {
                    "x" : 18,
                    "y" : 18
                  },
                  "pointB" : {
                    "x" : 18,
                    "y" : 200
                  }
                }, {
                  "pointA" : {
                    "x" : 18,
                    "y" : 18
                  },
                  "pointB" : {
                    "x" : 200,
                    "y" : 18
                  }
                } ],
                "color" : "#FFFFE0",
                "order" : 2,
                "x" : 18,
                "y" : 18
              }, {
                "checkLines" : [ {
                  "pointA" : {
                    "x" : 30,
                    "y" : 7
                  },
                  "pointB" : {
                    "x" : 30,
                    "y" : 200
                  }
                }, {
                  "pointA" : {
                    "x" : 30,
                    "y" : 7
                  },
                  "pointB" : {
                    "x" : 200,
                    "y" : 7
                  }
                } ],
                "color" : "#FFFFE0",
                "order" : 3,
                "x" : 30,
                "y" : 7
              } ],
              "cardTypes" : [ {
                "count" : 6,
                "height" : 5,
                "name" : "Un long tribord",
                "possibilities" : [
                  {
                    "index": 20,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 4
                    }, {
                      "x" : -6,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "type" : 1,
                "width" : 7
              }, {
                "count" : 6,
                "height" : 5,
                "name" : "Un long babord",
                "possibilities" : [
                  {
                    "index": 10,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 4
                    }, {
                      "x" : 6,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "type" : 1,
                "width" : 7
              }, {
                "count" : 2,
                "height" : 7,
                "name" : "Sun",
                "svgParams" : {
                  "card-soleil" : "display: block;"
                },
                "type" : 0,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Trident",
                "possibilities" : [
                  {
                    "index": 7,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 2,
                      "y" : 0
                    }, {
                      "x" : 0,
                      "y" : 3
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 9,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 8
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 11,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -2,
                      "y" : 0
                    }, {
                      "x" : 0,
                      "y" : 3
                    } ],
                    "rotate" : 0
                  }
                ],
                "svgParams" : {
                  "card-trident" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Trident nuage",
                "options" : [ 1 ],
                "possibilities" : [
                  {
                    "index": 7,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 2,
                      "y" : 0
                    }, {
                      "x" : 0,
                      "y" : 3
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 9,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 8
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 11,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -2,
                      "y" : 0
                    }, {
                      "x" : 0,
                      "y" : 3
                    } ],
                    "rotate" : 0
                  }
                ],
                "svgParams" : {
                  "card-option-nuage" : "display: block;",
                  "card-trident" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 8,
                "height" : 7,
                "name" : "Tout droit",
                "possibilities" : [
                  {
                    "index": 9,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 8
                    } ],
                    "rotate" : 0
                  }
                ],
                "svgParams" : {
                  "card-tout-droit" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Tout droit nuage",
                "options" : [ 1 ],
                "possibilities" : [
                  {
                    "index": 9,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 8
                    } ],
                    "rotate" : 0
                  }
                ],
                "svgParams" : {
                  "card-option-nuage" : "display: block;",
                  "card-tout-droit" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Un tribord barre à roue",
                "options" : [ 0 ],
                "possibilities" : [
                  {
                    "index": 14,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "svgParams" : {
                  "card-option-barre-a-roue" : "display: block;",
                  "card-un-droite" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 6,
                "height" : 7,
                "name" : "Un tribord",
                "possibilities" : [
                  {
                    "index": 14,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "svgParams" : {
                  "card-un-droite" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Triple tribord barre à roue",
                "options" : [ 0 ],
                "possibilities" : [
                  {
                    "index": 12,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 7
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  },
                  {
                    "index": 14,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  },
                  {
                    "index": 16,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 3
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "svgParams" : {
                  "card-option-barre-a-roue" : "display: block;",
                  "card-trois-droite" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Triple tribord",
                "possibilities" : [
                  {
                    "index": 12,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 7
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  },
                  {
                    "index": 14,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  },
                  {
                    "index": 16,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 3
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "svgParams" : {
                  "card-trois-droite" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Triple babord barre à roue",
                "options" : [ 0 ],
                "possibilities" : [
                  {
                    "index": 2,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 3
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 4,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 6,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 7
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  }
                ],
                "svgParams" : {
                  "card-option-barre-a-roue" : "display: block;",
                  "card-trois-gauche" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Triple babord",
                "possibilities" : [
                  {
                    "index": 2,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 3
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 4,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 6,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 7
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  }
                ],
                "svgParams" : {
                  "card-trois-gauche" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Un babord barre à roue",
                "options" : [ 0 ],
                "possibilities" : [
                  {
                    "index": 4,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  }
                ],
                "svgParams" : {
                  "card-option-barre-a-roue" : "display: block;",
                  "card-un-gauche" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Un babord",
                "possibilities" : [
                  {
                    "index": 4,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  }
                ],
                "svgParams" : {
                  "card-un-gauche" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Joker 1",
                "possibilities" : [
                  {
                    "index": 0,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 1
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 3,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 4
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 6,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 6
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 7,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 2,
                      "y" : 0
                    }, {
                      "x" : 0,
                      "y" : 3
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 9,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 8
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 11,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -2,
                      "y" : 0
                    }, {
                      "x" : 0,
                      "y" : 3
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 13,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 6
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  },
                  {
                    "index": 15,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 4
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  },
                  {
                    "index": 18,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 1
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "svgParams" : {
                  "card-joker" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              }, {
                "count" : 4,
                "height" : 7,
                "name" : "Joker 2",
                "possibilities" : [
                  {
                    "index": 4,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : 3,
                      "y" : 0
                    } ],
                    "rotate" : -90
                  },
                  {
                    "index": 9,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 8
                    } ],
                    "rotate" : 0
                  },
                  {
                    "index": 14,
                    "moves" : [ {
                      "x" : 0,
                      "y" : 5
                    }, {
                      "x" : -3,
                      "y" : 0
                    } ],
                    "rotate" : 90
                  }
                ],
                "svgParams" : {
                  "card-joker-2" : "display: block;"
                },
                "type" : 1,
                "width" : 5
              } ],
              "departure" : {
                "buoy1" : {
                  "color" : "#FF0000",
                  "x" : 12,
                  "y" : 30
                },
                "buoy2" : {
                  "color" : "#00FF00",
                  "x" : 24,
                  "y" : 30
                }
              },
              "departureArea" : {
                "height" : 11,
                "width" : 11,
                "x" : 13,
                "y" : 31
              },
              "height" : 200,
              "obstacles" : [ {
                "coefHeight" : 2,
                "height" : 3,
                "params" : "",
                "src" : "phare",
                "width" : 4,
                "x" : 6,
                "y" : 18
              }, {
                "coefHeight" : 1,
                "height" : 3,
                "params" : "",
                "src" : "rocher",
                "width" : 4,
                "x" : 22,
                "y" : 18
              }, {
                "coefHeight" : 3.5,
                "height" : 2,
                "src" : "bite1&2&3",
                "width" : 2,
                "x" : 18,
                "y" : 10
              }, {
                "coefHeight" : 1.5,
                "height" : 3,
                "params" : "",
                "src" : "baleine",
                "width" : 6,
                "x" : 16,
                "y" : 36
              } ],
              "width" : 200
            }


    ).then();*/
  }
}
