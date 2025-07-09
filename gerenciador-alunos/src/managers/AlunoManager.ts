import { IAluno } from '../interfaces/IAluno';
import { Aluno } from '../models/Aluno';
import * as fs from 'fs-extra';
import * as path from 'path';

const DATABASE_DIR = path.join(process.cwd(), 'database');
const DATABASE_FILE = path.join(DATABASE_DIR, 'alunos.json');

export class AlunoManager {
  private alunos: IAluno[] = [];

  constructor() {
    this.carregarAlunos();
  }

  private async carregarAlunos(): Promise<void> {
    try {
      if (fs.existsSync(DATABASE_FILE)) {
        const data = await fs.readFile(DATABASE_FILE, 'utf8');
        this.alunos = JSON.parse(data);
        console.log(`✨ Alunos carregados do arquivo: ${DATABASE_FILE}`);
      } else {
        console.log(`Arquivo de dados não encontrado em: ${DATABASE_FILE}. Iniciando com lista vazia.`);
      }
    } catch (error) {
      console.error(`Erro ao carregar alunos: ${(error as Error).message}`);
      this.alunos = []; // Garante que a lista esteja vazia em caso de erro
    }
  }

  private async salvarAlunos(): Promise<void> {
    try {
      await fs.ensureDir(DATABASE_DIR); // Garante que a pasta database exista
      await fs.writeFile(DATABASE_FILE, JSON.stringify(this.alunos, null, 2), 'utf8');
      console.log(`💾 Alunos salvos em: ${DATABASE_FILE}`);
    } catch (error) {
      console.error(`Erro ao salvar alunos: ${(error as Error).message}`);
    }
  }

  public async adicionarAluno(novoAluno: IAluno): Promise<void> {
    const matriculaLowerCase = novoAluno.matricula.toLowerCase();
    const alunoExistente = this.alunos.find(
      (aluno) => aluno.matricula.toLowerCase() === matriculaLowerCase
    );

    if (alunoExistente) {
      console.error(
        `\nErro: O aluno com matrícula '${novoAluno.matricula}' já está cadastrado!\n`
      );
    } else {
      this.alunos = [...this.alunos, novoAluno]; // Usando spread operator para imutabilidade
      await this.salvarAlunos();
      console.log(`\n🎉 Aluno '${novoAluno.nome}' adicionado com sucesso!\n`);
    }
  }

  public listarAlunos(): void {
    if (this.alunos.length === 0) {
      console.log('\nNenhum aluno cadastrado.\n');
      return;
    }

    console.log('\n--- Lista de Alunos ---');
    this.alunos.forEach((alunoData) => {
      // Criando uma instância de Aluno para usar o método exibirDetalhes
      const aluno = new Aluno(alunoData.matricula, alunoData.nome, alunoData.idade);
      aluno.exibirDetalhes();
    });
    console.log('-----------------------\n');
  }
}