import { LoggerService } from './../services/logger.service';
import { Pokemon } from './../models/Pokemon';
import { FightService, PokemonFightListener } from './../services/fight.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Log, LogType } from '../models/Log';
import * as $ from "jquery";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})


export class FightComponent implements OnInit, PokemonFightListener {

  isFinished: boolean;
  isRunning: boolean;
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  subscriber: Subscription;
  title: string;
  loggerService: LoggerService;
  LogType = LogType;

  stateScale : string = "inactive"; 

  constructor(private route: ActivatedRoute, private fightService: FightService, logger: LoggerService) { 
    this.loggerService = logger;
  }

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
            console.log(pokemons);
            [this.pokemon1, this.pokemon2] = pokemons;
        }),
        mergeMap(() => {
            return this.fightService.attack();
        })
        ).subscribe();
    
  }

  handleMainButton() {
    if (this.isFinished) {
      this.isRunning = false;
      this.isFinished = false;
      this.subscriber.unsubscribe();
      this.initiateFight();
    } else {
      this.isRunning = !this.isRunning;
      this.fightService.setPause(!this.isRunning);
    }
  }

  onPokemonAttack(attacker: Pokemon, defender: Pokemon) {
    $('#log-screen').animate( { scrollTop: $('#log-screen').offset().top }, 1000 );
    let attackr, defendr;
    if (attacker.name == this.pokemon1.name) {
        attackr = '#pokemon1';
        defendr = '#pokemon2';
        $(attackr).animate( { left: '+=100' }, 250, function() {
            $(attackr).animate( { left: '-=100' }, 250);
        });
    } else {
        attackr = '#pokemon2';
        defendr = '#pokemon1';
        $(attackr).animate( { left: '-=100' }, 250, function() {
            $(attackr).animate( { left: '+=100' }, 250);
        });
    }
    let timr = timer(0, 100);
    let sub = timr.subscribe(val => {
        let opac =  $(defendr).css('opacity') == '0' ? '1' : '0';
        $(defendr).css('opacity', opac);
    });
    setTimeout(() => {
        sub.unsubscribe();
        $(defendr).css('opacity', '1');
    }, 500);
    if (attacker.hp <= 0 || defender.hp <= 0) {
        this.isFinished = true;
    }
  }

  scrollToContent() {
    $('html, body').animate( { scrollTop: $('#fight-content').offset().top + 80 }, 1000 );
  }

}
