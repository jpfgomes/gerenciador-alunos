
import inquirer from 'inquirer';
import { IAluno } from '../interfaces/IAluno';

export async function promptParaDetalhesDoAluno(): Promise<IAluno> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'matricula',
      message: 'Digite a matrícula do aluno:',
      validate: (input) =>
        input.trim() !== '' ? true : 'A matrícula não pode ser vazia.',
    },
    {
      type: 'input', // Mantenha como 'input' para a validação inicial da string
      name: 'nome',
      message: 'Digite o nome do aluno:',
      validate: (input) =>
        input.trim() !== '' ? true : 'O nome não pode ser vazio.',
    },
    {
      type: 'input', // <-- Mude para 'input' para receber como string
      name: 'idade',
      message: 'Digite a idade do aluno:',
      validate: (inputString) => { // <-- Renomeie para inputString para clareza
        const idade = parseInt(inputString.trim()); // Tenta converter para inteiro
        if (isNaN(idade) || idade <= 0) {
          return 'Por favor, digite uma idade válida (um número inteiro positivo).';
        }
        return true;
      },
      filter: (input) => parseInt(input) // <-- Adicione um filtro para garantir que o valor retornado seja um número
    },
  ]);

  // Desestruturação para retornar o objeto IAluno
  const { matricula, nome, idade } = answers;
  return { matricula, nome, idade };
}

export async function promptMenuPrincipal(): Promise<string> {
  const choices = [
    { name: 'Adicionar Novo Aluno', value: 'adicionar' },
    { name: 'Listar Alunos Cadastrados', value: 'listar' },
    { name: 'Sair da Aplicação', value: 'sair' },
  ];

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'opcao',
    message: 'O que você gostaria de fazer?',
    choices: choices,
  });

  return answer.opcao;
}