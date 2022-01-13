export class Pokemon {
  public id: number;

  public nome: string;

  public nivel: number;

  public tipo: string;

  constructor(nome: string, nivel: number, tipo: string) {
    this.id = Math.random() * 1000;
    this.nome = nome;
    this.nivel = nivel;
    this.tipo = tipo;
  }
}