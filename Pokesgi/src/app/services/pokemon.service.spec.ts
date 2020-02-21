import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { Move, Pokemon } from '../models/Pokemon';

describe('PokemonService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ PokemonService ]
    }));

    it('should return pikachu when get pikachu', async(() => {
        const pokemonService = TestBed.get(PokemonService);
        const http = TestBed.get(HttpTestingController);
        const poke = {
            name: 'pikachu',
            stats: [{ base_stat: 40 }, { base_stat: 40 }, { base_stat: 40 }, { base_stat: 40 }, { base_stat: 40 }, { base_stat: 40 }],
            types: [{
                type: { name: 'electric' },
            }],
            sprites: {
                front_default: 'image_front',
                back_default: 'image_front',
            }
        };
        pokemonService.getPokemon(poke.name).subscribe((pokemon: Pokemon) => {
            expect(pokemon.name).toBe(poke.name);
        });
        http.expectOne('https://pokeapi.co/api/v2/pokemon/'+poke.name).flush(poke);
    }));

    it('should return mega-punch move details when get attack 5', async(() => {
        const pokemonService: PokemonService = TestBed.get(PokemonService);
        const http = TestBed.get(HttpTestingController);
        const move = {
            name: 'mega-punch',
            power: 80
        };
        pokemonService.getPokemonMoveDetails({url: 'https://pokeapi.co/api/v2/move/5'}).subscribe((moveDetails: Move) => {
            expect(moveDetails.power).toBe(move.power);
        });
        http.expectOne(`https://pokeapi.co/api/v2/move/5`).flush(move);
    }));

    it('should return all pokemons when get all', async(() => {
        const pokemonService: PokemonService = TestBed.get(PokemonService);
        pokemonService.getAllPokemons().subscribe((pokemons: Pokemon[]) => {
            expect(pokemons.length).toBe(151);
        });
    }));

});