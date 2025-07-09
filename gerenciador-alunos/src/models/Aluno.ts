import { IAluno } from '../interfaces/IAluno';

export class Aluno implements IAluno {
  matricula: string;
  nome: string;
  idade: number;

  constructor(matricula: string, nome: string, idade: number) {
    this.matricula = matricula;
    this.nome = nome;
    this.idade = idade;
  }

  exibirDetalhes(): void {
    console.log(`
      Matrícula: ${this.matricula}
      Nome: ${this.nome}
      Idade: ${this.idade}
    `);
  }
}