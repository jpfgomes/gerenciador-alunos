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
Object.defineProperty(exports, "__esModule", { value: true });
const AlunoManager_1 = require("./managers/AlunoManager");
const prompts_1 = require("./utils/prompts");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const alunoManager = new AlunoManager_1.AlunoManager();
        let rodando = true;
        while (rodando) {
            const escolha = yield (0, prompts_1.promptMenuPrincipal)();
            switch (escolha) {
                case 'adicionar':
                    console.log('\n--- Adicionar Novo Aluno ---');
                    try {
                        const novoAluno = yield (0, prompts_1.promptParaDetalhesDoAluno)();
                        yield alunoManager.adicionarAluno(novoAluno);
                    }
                    catch (error) {
                        console.error(`Erro ao adicionar aluno: ${error.message}`);
                    }
                    break;
                case 'listar':
                    alunoManager.listarAlunos();
                    break;
                case 'sair':
                    console.log('\nSaindo da aplicação. Até mais!\n');
                    rodando = false;
                    break;
                default:
                    console.log('\nOpção inválida. Por favor, tente novamente.\n');
            }
        }
    });
}
// Inicia a aplicação
main().catch(console.error);
