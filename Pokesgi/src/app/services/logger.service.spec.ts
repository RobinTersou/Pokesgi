import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { Log, LogType } from '../models/Log';

describe('LoggerService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ LoggerService ]
    }));

    it('should initial logs be empty', () => {
        const loggerService = TestBed.get(LoggerService);
        expect(loggerService.logs.length).toBe(0);
    });

    it('should create a log', () => {
        const loggerService = TestBed.get(LoggerService);
        loggerService.writeLog(new Log("Test", new Date(), LogType.INFOS));
        expect(loggerService.logs.length).toBe(1);
    });

    it('should create a log and clear logs', () => {
        const loggerService = TestBed.get(LoggerService);
        loggerService.writeLog(new Log("Test", new Date(), LogType.INFOS));
        loggerService.clearLogs();
        expect(loggerService.logs.length).toBe(0);
    });

});