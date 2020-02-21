import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { FightService } from './fight.service';
import { LoggerService } from './logger.service';
import { PokemonService } from './pokemon.service';

import { Move, Pokemon } from '../models/Pokemon';

const pikachu = new Pokemon('pikachu',
    20,
    1000,
    1000,
    100,
    100,
    100,
    42,
    'electric',
    [new Move('eclair', 50), new Move('fatal-foudre', 90)],
    'front',
    'back'
);

const mew = new Pokemon('mew',
    20,
    1000,
    1000,
    100,
    100,
    100,
    43,
    'psychic',
    [new Move('swift', 60), new Move('mega-punch', 80)],
    'front',
    'back'
);

describe('FightService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ FightService, PokemonService, LoggerService, HttpClient, HttpHandler ]
    }));

    it('should be Mew that starts before Pikachu', () => {
        const fightService = TestBed.get(FightService);
        expect(fightService.whichPokemonStart(mew, pikachu)).toEqual(mew);
    });

    it('should be first pokemon that starts if both speed are equals', () => {
        mew.speed = 42;
        const fightService = TestBed.get(FightService);
        expect(fightService.whichPokemonStart(pikachu, mew)).toBe(pikachu);
    });

});