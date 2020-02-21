import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon, Type } from '../models/Pokemon';
import  pokemonGif  from 'pokemon-gif';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';

@Component({
  selector: 'app-pokemon-select',
  templateUrl: './pokemon-select.component.html',
  styleUrls: ['./pokemon-select.component.css']
})
export class PokemonSelectComponent implements OnInit {

  pokemons : Pokemon[];
  displayedPokemons : Pokemon[];
  types: Type[];
  selectedType: Type[];
  selectedPokemons: Pokemon[] = [];
  turnSelection: number = 0;
  formPokemon: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    /*this.pokemonService.getAllTypes().subscribe(types => {
        console.log(types);
        this.types = types.name;
    })*/
    this.getAllPokemons();
    this.getAllTypes();
  }

  createPokemon() {
    this.formPokemon = true;
  }

  getAllPokemons() {
    this.pokemonService.getAllPokemons().subscribe(pokemons => {
      console.log(pokemons);
      this.pokemons = pokemons;
      this.displayedPokemons = pokemons;
    });
  }

  getAllTypes() {
    this.pokemonService.getAllTypes().subscribe(types => {
      console.log(types);
      this.types = types;
    })
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemons[this.turnSelection] = pokemon;
    if(this.turnSelection == 0) {
        this.turnSelection = 1;
    } else {
        this.turnSelection = 0;
    }
  }

  pokemonGif(name: string) {
    return pokemonGif(name);
  }

  filter(type: Type): void {
    console.log(type)
    console.log(type);
    this.displayedPokemons = this.pokemonService.getPokemonFromType(type.name, this.pokemons);
  }

}
