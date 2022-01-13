import pgp from 'pg-promise';
import { Pokemon } from '../entities/pokemon';

export class PokemonRepository {
  private pokemons: Pokemon[];

  private pgpClien;

  constructor() {
    this.pokemons = [];
    this.pgpClien = pgp()(
      'postgres://postgres:postgres@localhost:5432/postgres',
    );
  }

  async insert(pokemon: Pokemon): Promise<void> {
    await this.pgpClien.query(
      `insert into pokemon (id, name, level, type) values ($1, $2, $3, $4)`,
      [pokemon.id, pokemon.nome, pokemon.nivel, pokemon.tipo],
    );
    this.pokemons.push(pokemon);
  }

  findByname(nome: string): Pokemon | undefined {
    return this.pokemons.find((p) => p.nome === nome);
  }

  updateLevel(nome: string, level: number) {
    const pokemon = this.findByname(nome) as Pokemon;
    this.pokemons = this.pokemons.filter((p) => p.nome !== nome);
    pokemon.nivel = level;
    this.pokemons.push(pokemon);
  }

  // aqui deleta o pokemon
  remove(nome: string) {
    this.pokemons = this.pokemons.filter((p) => p.nome === nome);
  }

  // listar pokemon
  findAll() {
    return this.pokemons;
  }
}
