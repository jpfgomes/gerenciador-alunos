"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptParaDetalhesDoAluno = promptParaDetalhesDoAluno;
exports.promptMenuPrincipal = promptMenuPrincipal;
const inquirer_1 = __importDefault(require("inquirer"));
function promptParaDetalhesDoAluno() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'matricula',
                message: 'Digite a matrícula do aluno:',
                validate: (input) => input.trim() !== '' ? true : 'A matrícula não pode ser vazia.',
            },
            {
                type: 'input', // Mantenha como 'input' para a validação inicial da string
                name: 'nome',
                message: 'Digite o nome do aluno:',
                validate: (input) => input.trim() !== '' ? true : 'O nome não pode ser vazio.',
            },
            {
                type: 'input', // <-- Mude para 'input' para receber como string
                name: 'idade',
                message: 'Digite a idade do aluno:',
                validate: (inputString) => {
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
    });
}
function promptMenuPrincipal() {
    return __awaiter(this, void 0, void 0, function* () {
        const choices = [
            { name: 'Adicionar Novo Aluno', value: 'adicionar' },
            { name: 'Listar Alunos Cadastrados', value: 'listar' },
            { name: 'Sair da Aplicação', value: 'sair' },
        ];
        const answer = yield inquirer_1.default.prompt({
            type: 'list',
            name: 'opcao',
            message: 'O que você gostaria de fazer?',
            choices: choices,
        });
        return answer.opcao;
    });
}
