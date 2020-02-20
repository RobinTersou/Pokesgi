export class Pokemon {
    constructor(
        public name: string,
        public level: number,
        public hp: number,
        public maxHp: number,
        public hpPercentage: number,
        public attack: number,
        public defense: number,
        public speed: number,
        public type: string,
        public moves: Array<Move>,
        public frontDefault: string,
        public backDefault: string
    ) { }

    static getPokemonFromJson(json): Pokemon {

        return new Pokemon(
            json.name,
            20,
            json.stats[5]['base_stat'] * 100,
            json.stats[5]['base_stat'] * 100,
            100,
            json.stats[4]['base_stat'],
            json.stats[3]['base_stat'],
            json.stats[0].base_stat,
            json.types[0].type.name,
            Array<Move>(),
            json.sprites.front_default,
            json.sprites.back_default
        );

    }
    public attackOn(other: Pokemon,
        randomProvider: () => number = () => Math.floor(Math.random() * Math.floor(this.moves.length))
    ): AttackResult {

        const move = this.moves[randomProvider()];
        const damages = move.calculateDamages(this, other);
        other.hp -= damages;
        if (other.hp > 0) {
            other.hpPercentage = Math.round(other.hp * 100 / other.maxHp);
        } else {
            other.hpPercentage = 0;
        }
        return new AttackResult(damages, move.name);
        
    }
}

export class AttackResult {

    constructor(readonly damages: number, readonly name: string) {
    }

}

export class Move {

    constructor(
        public name: string,
        public power: number,
    ) { }

    public calculateDamages(attacker: Pokemon, target: Pokemon): number {

        return Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * attacker.attack * this.power / target.defense));

    }

}

export class Type {
    constructor(
        public name,
        public damage_relations,
        public move_damage_class,
        public pokemons,
        public moves
    ) {}

    static getTypeFromJson(json): Type {
        return new Type(
            json.name,
            json.damage_relations,
            json.move_damage,
            json.pokemon,
            json.moves
        );
    }
}
