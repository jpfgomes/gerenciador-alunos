"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
class Aluno {
    constructor(matricula, nome, idade) {
        this.matricula = matricula;
        this.nome = nome;
        this.idade = idade;
    }
    exibirDetalhes() {
        console.log(`
      Matrícula: ${this.matricula}
      Nome: ${this.nome}
      Idade: ${this.idade}
    `);
    }
}
exports.Aluno = Aluno;
