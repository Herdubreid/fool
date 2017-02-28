import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { IGame, IPlaying, SAY_TYPES } from '../../data/defs';
import { IState, NEW_SCORE } from '../../data/state';

/*
  Score page.
*/
@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
  playing: IPlaying;
  sayer: number;
  target: number[];
  remaining = 0;
  score() {
    this.remaining = 16 - this.playing.score[0] - this.playing.score[1] - this.playing.score[2];
    if (this.playing.say.type === SAY_TYPES.nolo) {
      this.playing.points[0] = this.target[0] - this.playing.score[0];
      this.playing.points[1] = this.target[1] - this.playing.score[1];
      this.playing.points[2] = this.target[2] - this.playing.score[2];
    } else {
      this.playing.points[0] = this.playing.score[0] - this.target[0];
      this.playing.points[1] = this.playing.score[1] - this.target[1];
      this.playing.points[2] = this.playing.score[2] - this.target[2];
    }
  }
  continue() {
    let game: IGame = {
      say: Object.assign({}, this.playing.say),
      score: [...this.playing.score],
      points: [...this.playing.points]
    }
    this.store.dispatch({
      type: NEW_SCORE,
      payload: {
        playing: this.playing,
        game
      }
    });
    this.playing.current++;
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IState>
  ) {
    this.target = navParams.data.target;
    this.playing = navParams.data.playing;
    this.sayer = this.playing.current % 3;
  }
}
