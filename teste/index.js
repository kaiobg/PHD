import { firebaseService } from '../services';

function navigateTo(option) {
    switch (option) {
        case 'perfil':
            alert('Redirecionando para Meu Perfil...');
            // window.location.href = '/perfil.html';
            break;
        case 'alunos':
            alert('Redirecionando para Gerenciar Alunos...');
            // window.location.href = '/alunos.html';
            break;
        case 'treinos':
            alert('Redirecionando para Criar Treinos...');
            // window.location.href = '/treinos.html';
            break;
        case 'estatisticas':
            alert('Redirecionando para Ver Estatísticas...');
            // window.location.href = '/estatisticas.html';
            break;
        default:
            alert('Opção inválida!');
    }
}