import { Component } from '@angular/core';
import { NavController, NavParams, reorderArray } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { StorageService } from '../../data/service';
import { PlayPage } from '../play/play';
import { IPlaying } from '../../data/defs';
import { IState, NEW_ROUND } from '../../data/state';
/*
  Home page.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  subs: Subscription;
  status: Observable<string>;
  playing: IPlaying;
  player: string;
  playerList: string[] = [];
  addPlayer() {
    if (this.player) {
      this.playerList.unshift(this.player);
      this.player = '';
      this.storage
        .playerList = new Promise((resolve) => { resolve(this.playerList) });
    }
  }
  deletePlayer(index) {
    this.playerList.splice(index, 1);
    this.storage
      .playerList = new Promise((resolve) => { resolve(this.playerList) });
  }
  arrange(indexes) {
    this.playerList = reorderArray(this.playerList, indexes);
  }
  newRound() {
    this.playing = {
      players: [...this.playerList.slice(0, 3)],
      current: 0,
      say: undefined,
      score: [0, 0, 0],
      points: [0, 0, 0]
    }
    this.store.dispatch({
      type: NEW_ROUND,
      payload: this.playing
    });
    this.play();
  }
  play() {
    this.navCtrl.push(PlayPage, { playing: this.playing });
  }
  ngOnDestroy() {
    console.log('Leaving HomePage');
    this.subs.unsubscribe();
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<IState>,
    public storage: StorageService
  ) {
    storage.playerList
      .then(list => {
        this.playerList = list ? list : [];
      });
    this.status = store
      .select<string>('status');
    this.subs = store
      .select<IPlaying>('playing')
      .subscribe(playing => this.playing = playing);
  }
}
