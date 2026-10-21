// Endereço da API (mockapi.io). Para trocar de servidor, mude só aqui.
export const API = 'https://6ad6d880f71f154ac4872cb0.mockapi.io/Filmes';

// Transforma o erro do axios numa mensagem que dá pra entender na tela.
export function mensagemErro(err) {
    if (err.response) {
        return `Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`;
    }
    return `Sem resposta do servidor (${err.message}).`;
}
