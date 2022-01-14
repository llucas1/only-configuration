import { Request, Response } from 'express';
import { Locadora } from '../entities/locadora';
import { LocadoraRepository } from '../repositories/locadora-repository';

export class LocadoraController {
  private locadoraRepository: LocadoraRepository;

  constructor() {
    this.locadoraRepository = new LocadoraRepository();
  }

  async createLocadora(req: Request, res: Response) {
    const { nome, cpf, filme } = req.body;
    const locadora = new Locadora(nome, cpf, filme);
    await this.locadoraRepository.insert(locadora);
    res.status(201).json({
      id: locadora.id,
      nome: locadora.nome,
      data_cpf: locadora.cpf,
      move: locadora.filme,
    });
  }

  // aqui faz a busca do filme pelo nome
  async getLocadoraByName(req: Request, res: Response) {
    const { nome } = req.params;
    const locadora = await this.locadoraRepository.findByname(nome);
    if (!locadora) {
      res.status(404).json({
        mensagem: 'filme não encontrado',
      });
    }
    return res.status(200).json({
      id: locadora?.id,
      nome: locadora?.nome,
      filme: locadora?.filme,
    });
  }

  // aqui será feito o update do filmes selecioando
  async updateLocadora(req: Request, res: Response) {
    const { id } = req.params;
    const { nivel } = req.body;
    const locadora = await this.locadoraRepository.findById(Number(id));
    if (!locadora) {
      res.status(404).json({
        mensagem: 'filme não encontrado',
      });
    }
    this.locadoraRepository.updateLevel(Number(id), nivel);
    return res.status(204).send();
  }

  // aqui seleciona o filmes
  async deleteLocadora(req: Request, res: Response) {
    const { id } = req.params;
    const locadora = await this.locadoraRepository.findById(Number(id));
    if (!locadora) {
      res.status(404).json({
        mensagem: 'pokemon não encontrado',
      });
    }
    await this.locadoraRepository.remove(Number(id));
    return res.status(204).send();
  }

  // lista os filmes
  async getAll(req: Request, res: Response) {
    const locadora = await this.locadoraRepository.findAll();
    return res.status(200).json(locadora);
  }
}
