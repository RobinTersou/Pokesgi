import { Pokemon } from './../models/Pokemon';
import { FightService, PokemonFightListener } from './../services/fight.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})


export class FightComponent implements OnInit, PokemonFightListener {

  pokemon1: Pokemon;
  pokemon2: Pokemon;
  subscriber: Subscription;
  title: string;
  constructor(private route: ActivatedRoute, private fightService: FightService) { }

  ngOnInit(): void {
      this.fightService.subscribe(this);
      this.initiateFight();
  }

  initiateFight() {
    let p1, p2;

    this.subscriber = this.route.params.pipe(
        tap( (params: Params) => {
          p1 = params['pokemon1'];
          p2 = params['pokemon2'];
          this.title = p1.toUpperCase() + ' vs ' + p2.toUpperCase();
        }),
        mergeMap(() => this.fightService.getPokemons(p1, p2)),
        tap((pokemons: Pokemon[]) => {
            [this.pokemon1, this.pokemon2] = pokemons;
        }),
        mergeMap(() => {
            return this.fightService.attack();
        })
        ).subscribe();
    
  }

  onPokemonAttack(attacker: Pokemon, defender: Pokemon) {

  }

}
