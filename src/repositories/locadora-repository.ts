import { PrismaClient } from '@prisma/client';
import { Locadora } from '../entities/locadora';

export class LocadoraRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async insert(locadora: Locadora): Promise<void> {
    await this.prisma.locadora.create({
      data: {
        id: locadora.id,
        name: locadora.nome,
        data_cpf: locadora.cpf,
        move: locadora.filme,
      },
    });
  }

  async findByname(name: string): Promise<Locadora | undefined> {
    const result = await this.prisma.locadora.findFirst({
      where: {
        name,
      },
    });
    if (!result) {
      return undefined;
    }
    return new Locadora(result.name, result.data_cpf, result.move, result.id);
  }

  async findById(id: number) {
    const result = await this.prisma.locadora.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return undefined;
    }

    return new Locadora(result.name, result.level, result.type, result.id);
  }

  // muda o nivel do pokemon
  async updateLevel(id: number, move: string) {
    await this.prisma.locadora.update({
      data: {
        move,
      },
      where: {
        id,
      },
    });
  }

  // aqui deleta o filme
  async remove(id: number) {
    await this.prisma.locadora.delete({
      where: {
        id,
      },
    });
  }

  // listar pokemon
  async findAll() {
    return this.prisma.locadora.findFirst();
  }
}
