import { api } from './api.js';

/*export async function getToken(emailUser, passUser) {
    const loginResposta = await request("http://localhost:3000")
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: emailUser,//"admin@escola.com",
            senha: passUser//"admin123"
        });
    return loginResposta.body.token;
} */

let tokenEmCache = null

async function autenticar(email, senha) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({ email, senha });

    if (loginResposta.status !== 200 || !loginResposta.body.token) {
        throw new Error(`Falha na autenticação. HTTP ${loginResposta.status}: ${loginResposta.body.error || 'token não retornado'}`);
    }

    return loginResposta.body.token;
}

export async function comTokenDeAdmin() {
    if(!tokenEmCache) {
        tokenEmCache = await autenticar(
            process.env.ADMIN_EMAIL || 'admin@escola.com',
            process.env.ADMIN_SENHA || 'admin123'
        );
    }
    

    return `Bearer ${tokenEmCache}`;
}

export async function getToken(emailUser, passUser) {
    return autenticar(emailUser, passUser);
}

export async function comTokenDeAluno(emailUser, passUser) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: emailUser,
            senha: passUser
        });

    return `Bearer ${loginResposta.body.token}`;
}    
