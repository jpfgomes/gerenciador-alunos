"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AlunoManager = void 0;
const Aluno_1 = require("../models/Aluno");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const DATABASE_DIR = path.join(process.cwd(), 'database');
const DATABASE_FILE = path.join(DATABASE_DIR, 'alunos.json');
class AlunoManager {
    constructor() {
        this.alunos = [];
        this.carregarAlunos();
    }
    carregarAlunos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (fs.existsSync(DATABASE_FILE)) {
                    const data = yield fs.readFile(DATABASE_FILE, 'utf8');
                    this.alunos = JSON.parse(data);
                    console.log(`✨ Alunos carregados do arquivo: ${DATABASE_FILE}`);
                }
                else {
                    console.log(`Arquivo de dados não encontrado em: ${DATABASE_FILE}. Iniciando com lista vazia.`);
                }
            }
            catch (error) {
                console.error(`Erro ao carregar alunos: ${error.message}`);
                this.alunos = []; // Garante que a lista esteja vazia em caso de erro
            }
        });
    }
    salvarAlunos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.ensureDir(DATABASE_DIR); // Garante que a pasta database exista
                yield fs.writeFile(DATABASE_FILE, JSON.stringify(this.alunos, null, 2), 'utf8');
                console.log(`💾 Alunos salvos em: ${DATABASE_FILE}`);
            }
            catch (error) {
                console.error(`Erro ao salvar alunos: ${error.message}`);
            }
        });
    }
    adicionarAluno(novoAluno) {
        return __awaiter(this, void 0, void 0, function* () {
            const matriculaLowerCase = novoAluno.matricula.toLowerCase();
            const alunoExistente = this.alunos.find((aluno) => aluno.matricula.toLowerCase() === matriculaLowerCase);
            if (alunoExistente) {
                console.error(`\nErro: O aluno com matrícula '${novoAluno.matricula}' já está cadastrado!\n`);
            }
            else {
                this.alunos = [...this.alunos, novoAluno]; // Usando spread operator para imutabilidade
                yield this.salvarAlunos();
                console.log(`\n🎉 Aluno '${novoAluno.nome}' adicionado com sucesso!\n`);
            }
        });
    }
    listarAlunos() {
        if (this.alunos.length === 0) {
            console.log('\nNenhum aluno cadastrado.\n');
            return;
        }
        console.log('\n--- Lista de Alunos ---');
        this.alunos.forEach((alunoData) => {
            // Criando uma instância de Aluno para usar o método exibirDetalhes
            const aluno = new Aluno_1.Aluno(alunoData.matricula, alunoData.nome, alunoData.idade);
            aluno.exibirDetalhes();
        });
        console.log('-----------------------\n');
    }
}
exports.AlunoManager = AlunoManager;
