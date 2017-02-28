import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { ScorePage } from '../score/score';
import { IGame, IPlaying, ISay, SAY_TYPES } from '../../data/defs';
import { IState, ADJUST_SCORE } from '../../data/state';

/*
  Play page.
*/
@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})
export class PlayPage {
  subs: Subscription;
  playing: IPlaying;
  total = [0, 0, 0];
  target: number[];
  played: IGame[];
  games: IGame[];
  sayer: number;
  points: number[];
  allSays: ISay[] = [
    { type: SAY_TYPES.grand, title: 'Grand' },
    { type: SAY_TYPES.spade, title: 'Spade' },
    { type: SAY_TYPES.colour, title: 'Colour' },
    { type: SAY_TYPES.nolo, title: 'Nolo' }
  ];
  says: ISay[];
  get game(): string {
    if (this.playing.current < 12) {
      return `Play - Game ${this.playing.current + 1}`;
    } else {
      return 'Round Finished!';
    }
  }
  adjust() {
    this.playing.current--;
    this.store.dispatch({
      type: ADJUST_SCORE,
      payload: this.playing
    });
    this.navCtrl.push(ScorePage, {
      playing: this.playing,
      target: this.target
    });
  }
  say(say: any) {
    if (say.type === SAY_TYPES.nolo) {
      this.target = [6, 6, 6];
      this.target[this.sayer] -= 2;
    } else {
      this.target = [4, 4, 4];
      this.target[this.sayer] += 4;
    }
    this.playing = Object.assign({}, this.playing, {
      say,
      score: [...this.target],
      points: [0, 0, 0]
    });
    this.navCtrl.push(ScorePage, {
      playing: this.playing,
      target: this.target
    });
  }
  ngOnDestroy() {
    console.log('Leaving PlayPage');
    this.subs.unsubscribe();
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IState>
  ) {
    this.playing = navParams.data.playing;
    this.subs = store
      .select<IGame[]>('games')
      .subscribe(games => {
        if (games) {
          this.points = [0, 0, 0];
          this.games = games;
          games.forEach(game => {
            this.points[0] += game.points[0];
            this.points[1] += game.points[1];
            this.points[2] += game.points[2];
          });
          this.sayer = games.length % 3;
          this.says = [...this.allSays];
          this.played = games.filter((val, i) => { return ((games.length - i - 1) % 3) === this.sayer });
          this.played.forEach(game => {
            this.says = [
              ...this.says.slice(0, this.says.findIndex(say => { return say.type === game.say.type })),
              ...this.says.slice(this.says.findIndex(say => { return say.type === game.say.type }) + 1)
            ];
          });
        }
      });
  }
}
