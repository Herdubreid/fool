/*
*/
import { Action } from '@ngrx/store';
import { IGame, IPlaying } from './defs';

// Status
export const STATUS_READY = 'STATUS_READY';
export const STATUS_SCORE = 'STATUS_SCORE';
export const STATUS_SAY = 'STATUS_SAY';
// Actions
export const NEW_ROUND = 'NEW_ROUND';
export const NEW_GAME = 'NEW_GAME';
export const NEW_SCORE = 'SCORE';
export const ADJUST_SCORE = 'ADJUST_SCORE';

export interface IState {
    status: string;
    playing: IPlaying,
    games: IGame[]
}

export const initialState: IState = {
    status: STATUS_READY,
    playing: {
        players: [],
        current: undefined,
        say: undefined,
        score: [0, 0, 0],
        points: [0, 0, 0]
    },
    games: []
}

export function play(state: IState = initialState, action: Action): IState {
    switch (action.type) {
        case NEW_ROUND:
            return Object.assign({}, initialState,
                {
                    status: STATUS_SAY,
                    playing: action.payload
                });
        case NEW_GAME:
            return Object.assign({}, state,
                {
                    status: STATUS_SAY,
                    playing: action.payload
                });
        case NEW_SCORE:
            return Object.assign({}, state,
                {
                    status: STATUS_SCORE,
                    playing: action.payload.playing,
                    games: [action.payload.game, ...state.games]
                });
        case ADJUST_SCORE:
            return Object.assign({}, state,
                {
                    status: STATUS_SCORE,
                    playing: action.payload,
                    games: [...state.games.slice(1)]
                });
        default:
            return state;
    }
}