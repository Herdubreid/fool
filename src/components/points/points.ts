import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { IPlaying, IGame } from '../../data/defs';
import { IState } from '../../data/state';
/*
  Points component.
*/
@Component({
  selector: 'points',
  templateUrl: 'points.html'
})
export class PointsComponent {
  subPlaying: Subscription;
  subPoints: Subscription;
  playing: IPlaying;
  games:IGame[];
  points:number[];
  ngOnDestroy() {
    this.subPlaying.unsubscribe();
    this.subPoints.unsubscribe();
  }
  constructor(
    public store: Store<IState>
  ) {
    this.subPlaying = store.select<IPlaying>('playing')
      .subscribe(playing => {
        this.playing = playing;
      });
    this.subPoints = store.select<IGame[]>('games')
      .subscribe(games => {
        this.points = [0, 0, 0];
        this.games = games;
        games.forEach(game => {
          this.points[0] += game.points[0];
          this.points[1] += game.points[1];
          this.points[2] += game.points[2];
        });
      })
  }
}
