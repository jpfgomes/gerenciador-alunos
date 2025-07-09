
import { AlunoManager } from './managers/AlunoManager';
import { promptParaDetalhesDoAluno, promptMenuPrincipal } from './utils/prompts';

async function main() {
  const alunoManager = new AlunoManager();

  let rodando = true;
  while (rodando) {
    const escolha = await promptMenuPrincipal();

    switch (escolha) {
      case 'adicionar':
        console.log('\n--- Adicionar Novo Aluno ---');
        try {
          const novoAluno = await promptParaDetalhesDoAluno();
          await alunoManager.adicionarAluno(novoAluno);
        } catch (error) {
          console.error(`Erro ao adicionar aluno: ${(error as Error).message}`);
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
}

// Inicia a aplicação
main().catch(console.error);