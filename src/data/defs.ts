/*
*/
export enum SAY_TYPES {
    grand,
    spade,
    colour,
    nolo
}

export interface ISay {
    type: SAY_TYPES;
    title: string;
}

export interface IGame {
    say: ISay;
    score: number[];
    points: number[];
}

export interface IPlaying {
    players: string[];
    current: number;
    say: ISay;
    score: number[];
    points: number[];
}

export function calcScore(say: ISay, score: number): number[] {
    if (say.type === SAY_TYPES.nolo) {
        return [
            4 - score[0],
            6 - score[1],
            6 - score[2]
        ];
    } else {
        return [
            score[0] - 8,
            score[1] - 4,
            score[2] - 4
        ]
    }
}
