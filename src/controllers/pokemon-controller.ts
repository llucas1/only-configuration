import { Request, Response } from 'express';
import { Pokemon } from '../entities/pokemon';
import { PokemonRepository } from '../repositories/pokemon-repository';

export class PokemonController {
  private pokemonRepository: PokemonRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  async createPokemon(req: Request, res: Response) {
    const { nome, nivel, tipo } = req.body;
    const pokemon = new Pokemon(nome, nivel, tipo);
    await this.pokemonRepository.insert(pokemon);
    res.status(201).json({
      // aqui retorna os pokemons criado
      id: pokemon.id,
      nome: pokemon.nome,
      nivel: pokemon.nivel,
      tipo: pokemon.tipo,
    });
  }

  // aqui faz a busca do pokemon pelo
  async getPokemonByName(req: Request, res: Response) {
    const { nome } = req.params;
    const pokemon = await this.pokemonRepository.findByname(nome);
    if (!pokemon) {
      res.status(404).json({
        mensagem: 'pokemon não encontrado',
      });
    }
    return res.status(200).json({
      id: pokemon?.id,
      nome: pokemon?.nome,
      nivel: pokemon?.nivel,
      tipo: pokemon?.tipo,
    });
  }

  // aqui será feito o update do pokemon selecioando
  async updatePokemon(req: Request, res: Response) {
    const { id } = req.params;
    const { nivel } = req.body;
    const pokemon = await this.pokemonRepository.findById(Number(id));
    if (!pokemon) {
      res.status(404).json({
        mensagem: 'pokemon não encontrado',
      });
    }
    this.pokemonRepository.updateLevel(Number(id), nivel);
    return res.status(204).send();
  }

  // aqui deçeta o pokemon selecionado
  async deletePokemon(req: Request, res: Response) {
    const { id } = req.params;
    const pokemon = await this.pokemonRepository.findById(Number(id));
    if (!pokemon) {
      res.status(404).json({
        mensagem: 'pokemon não encontrado',
      });
    }
    await this.pokemonRepository.remove(Number(id));
    return res.status(204).send();
  }

  // lista os pokemons
  async getAll(req: Request, res: Response) {
    const pokemon = await this.pokemonRepository.findAll();
    return res.status(200).json(pokemon);
  }
}
