import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, tap, filter } from 'rxjs/operators';

import {Pokemon, Move, Type} from '../models/Pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonDetails(name: string): Observable<Pokemon> {

    let pokemon;
    return this.http.get<JSON>('https://pokeapi.co/api/v2/pokemon/'+name).pipe(
        tap(json => pokemon = Pokemon.getPokemonFromJson(json)),
        map((json) => json['moves']),
        mergeMap(moves => {
            const requests = [];
            moves.map(move => {
                requests.push(this.getPokemonMoveDetails(move.move));
            });
            return forkJoin(requests);
        }),
        tap(moves => {
            pokemon.moves = moves;
        }),
        map(() => pokemon)
    );
  }

  getPokemonMoveDetails(move: { url: string }): Observable<Move> {

    const url = move['url'];
    return this.http.get<JSON>(url).pipe(
        map(json => new Move(json['name'], json['power']))
    );

  }

  getPokemon(name: string): Observable<Pokemon>{
    return this.http.get<JSON>('https://pokeapi.co/api/v2/pokemon/' + name).pipe(
        map(json => Pokemon.getPokemonFromJson(json))
    );
  }

  getAllPokemons(): Observable<Pokemon[]> {
      let req = Array<Observable<Pokemon>>();

      for (let i = 1; i < 500; i++) {
          req.push(this.getPokemon(i.toString()));
      }

      return forkJoin(req);
  }

  getType(name: string): Observable<Type>{
    return this.http.get<JSON>('https://pokeapi.co/api/v2/type/' + name).pipe(
      map(json => Type.getTypeFromJson(json))
    );
  }

  getAllTypes(): Observable<Type[]> {
    let req = Array<Observable<Type>>();

    for( let i = 1; i < 19 ; i++ ) {
        req.push(this.getType(i.toString()));
    }
    return forkJoin(req);
  }

  getPokemonFromType(name: string, pokemons: Pokemon[]): Pokemon[] {
    let filteredPokemons : Pokemon[] = [];
    console.log(name);
    for(let pokemon of pokemons) {

      if( pokemon.type == name ) 
        filteredPokemons.push(pokemon)
    }
    console.log(filteredPokemons);
    return filteredPokemons;
    
  }
}
