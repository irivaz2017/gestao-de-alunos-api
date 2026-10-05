import request from 'supertest';
//import app from '../src/app.js';
import { expect } from 'chai';


describe('***Login***', () => {
    it('*Deve retornar 200 quando usuario e senha forem corretos*', async () => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({'email': 'admin@escola.com', 'senha': 'admin123'});
        
            expect(loginResposta.status).to.equal(200);
            expect(loginResposta.body).to.have.property('token');

    });

    it('*Deve retornar 400 quando a senha nao for informada*', async () => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({'email': 'admin@escola.com', 'senha': ''});
        
            expect(loginResposta.status).to.equal(400);
            expect(loginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
            
            //console.log(loginResposta.body);
            //console.log(loginResposta.body.error);
            
    });


     it('*Deve retornar 401 quando usuário estiver correto, mas a senha está*', async () => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({'email': 'admin@escola.com', 'senha': 'admin1234'});
        
            expect(loginResposta.status).to.equal(401);
            expect(loginResposta.body.error).to.equal('E-mail ou senha inválidos.');

    });

});