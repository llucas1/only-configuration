export class Locadora {
  public id: number;

  public nome: string;

  public cpf: string;

  public filme: string;

  constructor(nome: string, cpf: string, filme: string, id?: number) {
    this.id = id ?? Math.floor(Math.random() * 1000);
    this.nome = nome;
    this.cpf = cpf;
    this.filme = filme;
  }
}
