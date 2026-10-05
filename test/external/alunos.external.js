import request from 'supertest';
import { expect } from 'chai';
import{ getToken} from '../helpers/auth.js';




describe('***Login***', () => {

    let token;
    before(async () => {
        token = await getToken('admin@escola.com', 'admin123');
    });

       it.only("deve cadastrar um aluno quando ele informa dados válidos", async () => {
      //Cadastrar o aluno
      const cadastroAlunoResposta = await request("http://localhost:3000")
          .post("/api/admin/alunos")
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${token}`)
          .send({
            nome: "Julio de Lima3",
            email: "julio.lima3@example.com",
            matricula: "2026-1015",
            senha: "123456",
          });

      //Validar que ele foi cadastrado
      expect(cadastroAlunoResposta.status).to.equal(201);
      expect(cadastroAlunoResposta.body.nome).to.equal("Julio de Lima3");
      expect(cadastroAlunoResposta.body.email).to.equal("julio.lima3@example.com");
      expect(cadastroAlunoResposta.body.matricula).to.equal("2026-1015");
    });          

      it('*Deve negarar de um aluno quando ele já existe*', async () => {
         //Obter o token
         const token = await getToken('admin@escola.com', 'admin123');
               
       //admin@escola.com",
        //senha: "admin123"
        //const token = loginResposta.body.token; // Supondo que você tenha obtido o token de autenticação do login do aluno 
       //Cadastrar um aluno
       const cadastroAlunoResposta = await request("http://localhost:3000")
          .post('/api/admin/alunos')
          .set('Content-Type', 'application/json')
          .set("Authorization", `Bearer ${token}`)  
          .send({
            nome: "Ana Souza",
            email: 'ana.souza@example.com',
            matricula: '2024001',
            senha: '123456'
           });
           //nome: 'Ana Souza', email: 'ana.souza@example.com', matricula: '2024001'
          // console.log(loginAlunoResposta.body);

       //Validar que ele foi Cadastrado
        expect(cadastroAlunoResposta.status).to.equal(409);
        expect(cadastroAlunoResposta.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.');
    

      });  

});      
