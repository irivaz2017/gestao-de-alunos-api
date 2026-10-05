import request from 'supertest';
import app from '../../src/app.js';
import { expect } from 'chai';
import * as sinon from 'sinon';
import authService from '../../src/services/auth.service.js';


describe('***Login***', () => {
    it('*Deve retornar 200 quando usuario e senha forem corretos*', async () => {
        const loginResposta = await request(app)//uso do teste interno=acesso a aplicacao
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({'email': 'admin@escola.com', 'senha': 'admin123'});
        
            expect(loginResposta.status).to.equal(200);
            expect(loginResposta.body).to.have.property('token');

    });

    it('*Deve retornar 400 quando a senha nao for informada*', async () => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({'email': 'admin@escola.com', 'senha': ''});
        
            expect(loginResposta.status).to.equal(400);
            expect(loginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
            
            //console.log(loginResposta.body);
            //console.log(loginResposta.body.error);
            
        });
        
        
        it('*Deve retornar 401 quando usuário estiver correto, mas a senha está incorreta*', async () => {
               const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'admin@escola.com','senha': 'admin123456' });    
                  
            
         
            
            expect(loginResposta.status).to.equal(401);
            expect(loginResposta.body.error).to.equal('E-mail ou senha inválidos.');
    });
    
    it('deve retornar 500 quando acontecer algum problema de conexão com o banco de dados', async () => {
        const authServiceMock = sinon.stub(authService, 'login');//foi mocado o metodo login atraves do stub
        authServiceMock.throws(new Error('ERRO CATASTRÓFICOOOOO!!!!!!!'));
        
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 
                email: 'admin@escola.com',
                senha: 'admin123' 
            });

        
        //console.log(loginResposta.body);
        //console.log(loginResposta.status);    
        expect(loginResposta.status).to.equal(500);
        expect(loginResposta.body.error).to.equal('Erro interno do servidor.');

        sinon.restore();

    
    })


});