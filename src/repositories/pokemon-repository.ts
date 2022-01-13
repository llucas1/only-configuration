import pgp from 'pg-promise';
import { PrismaClient } from '@prisma/client';
import { Pokemon } from '../entities/pokemon';

export class PokemonRepository {
  private pokemons: Pokemon[];

  private prisma;

  private pgpClien;

  constructor() {
    this.pokemons = [];
    this.prisma = new PrismaClient();
    this.pgpClien = pgp()(
      'postgres://postgres:postgres@localhost:5432/postgres',
    );
  }

  async insert(pokemon: Pokemon): Promise<void> {
    await this.pgpClien.query(
      `insert into pokemon (id, name, level, type) values ($1, $2, $3, $4)`,
      [pokemon.id, pokemon.nome, pokemon.nivel, pokemon.tipo],
    );
    await this.prisma.pokemon.create({
      data: {
        id: pokemon.id,
        name: pokemon.nome,
        level: pokemon.nivel,
        type: pokemon.tipo,
      },
    });
    this.pokemons.push(pokemon);
  }

  async findByname(name: string): Promise<Pokemon | undefined> {
    const result = await this.prisma.pokemon.findFirst({
      where: {
        name,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Pokemon(result.name, result.level, result.type, result.id);
  }

  async updateLevel(name: string, level: number) {
    const pokemon = (await this.findByname(name)) as Pokemon;
    this.pokemons = this.pokemons.filter((p) => p.nome !== name);
    pokemon.nivel = level;
    this.pokemons.push(pokemon);
  }

  // aqui deleta o pokemon
  remove(name: string) {
    this.pokemons = this.pokemons.filter((p) => p.nome === name);
  }

  // listar pokemon
  async findAll() {
    return this.pgpClien.query('select * from pokemon');
  }
}
