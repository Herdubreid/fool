import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import './defs';

const PLAYER_LIST: string = 'PLAYER_LIST';

/*
  Storage Service
*/
@Injectable()
export class StorageService {
  get playerList(): Promise<string[]> {
    return this.storage.get(PLAYER_LIST);
  }
  set playerList(spilarar: Promise<string[]>) {
    spilarar
      .then(doc => {
        this.storage.set(PLAYER_LIST, doc);
      });
  }
  constructor(
    public storage: Storage
  ) {
  }
}
