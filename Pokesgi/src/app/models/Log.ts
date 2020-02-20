export class Log {

    constructor(readonly text: string, readonly date: Date, readonly type: LogType) {
    }
    
}

export enum LogType {

    ATTACK,
    LOST_HP,
    INFOS,
    WINNER

}