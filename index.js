const express = require('express');
const path = require('path');
const body = require('body-parser');
const { Op, Sequelize, where} = require('sequelize');

const server = express();
const basePath = path.join(__dirname, '/views/routes/'); // Sem o EJS - res.sendFile(basePath + '/index.html')
const viewPath = path.join(__dirname, '/views/routes/');

const connection = require('./database/database');
const Resposta = require('./database/resposta');
const Pessoa = require('./database/pessoa');
const Pergunta = require('./database/pergunta');

let authStatus = false;
let pessoaAtual = null;

server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

const checkAuth = (req, res, next) => {
    if (authStatus) {
        req.pessoaAtual = pessoaAtual;
        next(); 
    } else {
        res.redirect('/entrar'); 
    }
};


server.post('/validateUser', (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Pessoa.findOne({where: {email: email}}).then((pessoa) => {        
        if (pessoa){
            if (senha === pessoa.senha) {
                authStatus = true; 
                pessoaAtual = pessoa.id;
                res.redirect('/home');
            } else {
                res.render(viewPath + 'error', { message: 'Senha incorreta' });
            }
        } else {
            res.render(viewPath + 'error', { message: 'Usuário não encontrado' });
        }
    }).catch((e) => {
        console.log(e);
        
        res.render(viewPath + 'error', { message: 'Erro ao validar usuário' });
    });
});

server.post('/cadastrar', (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    Pessoa.create({
        nome: nome,
        email: email,
        senha: senha
    }).then((pessoa) => {
        authStatus = true; 
        pessoaAtual = pessoa.id
        res.redirect('/home');
    }).catch((e) => {
        if(e.name === 'SequelizeUniqueConstraintError'){
            res.render(viewPath + 'error', {
                message: 'Email já existe'
            });
        } else {
            res.render(viewPath + 'error', {
                message: 'Erro ao criar pessoa'
            });
        }
    });
});

server.post('/registrarPergunta', (req, res) => {
    const pessoa = req.body.pessoa;
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;

    Pergunta.create({
        id_pessoa: pessoa, 
        titulo: titulo, 
        descricao: descricao
    }).then(() => {
        res.redirect('/home');
    }).catch((e) => {
        res.render(viewPath + 'error', {
            message: 'Erro ao registrar pergunta'
        });    
    });
});

server.post('/resposta', (req, res) => {
    const pergunta = req.body.pergunta;
    const pessoa = req.body.pessoa;
    const resposta = req.body.resposta;

    if (!resposta || resposta.trim() === '') {
        return res.render(viewPath + 'error', {
            message: 'Resposta não pode ser vazia.'
        });
    }

    Resposta.create({
        id_pessoa: pessoa,
        id_pergunta: pergunta,
        resposta: resposta
    }).then(() => {
        res.redirect('/home');
    }).catch((e) => {
        res.render(viewPath + 'error', {
            message: 'Erro ao registrar resposta'
        });        
    });
});


server.get('/question/delete/:id', (req, res) => {
    const perguntaId = req.params.id;

    Pergunta.destroy({
        where: {
            id: perguntaId
        }
    }).then((deletedCount) => {
        if (deletedCount === 0) {
            throw new Error('Pergunta não encontrada');
        }

        return Resposta.destroy({
            where: {
                id_pergunta: perguntaId
            }
        }).then(() => {
            res.redirect('/perfil');
        });
    }).catch((e) => {
        res.render(viewPath + 'error', {
            message: 'Erro ao excluir pergunta: ' + e.message
        });
    });
});

server.get('/question/:id', (req, res) => {
    const perguntaId = req.params.id;    

    Pergunta.findOne({ where: { id: perguntaId } })
        .then(pergunta => {
            if (pergunta) {
                return Resposta.findAll({
                    raw: true,
                    where: { id_pergunta: pergunta.id }
                }).then(respostas => {
                    return Pessoa.findAll({
                        raw: true,
                        where: {
                            id: {
                                [Op.in]: Sequelize.literal(`(SELECT id_pessoa from respostas)`)
                            }
                        },        
                        order: [['id', 'ASC']]
                    }).then(pessoas => {
                        res.render(viewPath + 'question', {
                            pergunta: pergunta,
                            respostas: respostas || [],
                            pessoas: pessoas,
                            pessoa: pessoaAtual
                        });
                    });
                });
            } else {
                res.redirect('/home');
            }
        })
        .catch(error => {
            console.error(error);
            res.render(viewPath + 'error', {
                message: 'Ocorreu um erro ao carregar a pergunta e as respostas.'
            });
        });
});

server.get('/newQuestion', (req, res) => {
    res.render(viewPath + 'newQuestion', {
        pessoa: pessoaAtual
    });
})

server.get('/perfil', (req, res) => {    
    Pessoa.findOne({
        where: {
            id: pessoaAtual
        }
    }).then((pessoa) => {
        return Pergunta.findAll({
            where: {
                id_pessoa: pessoaAtual
            }
        }).then((perguntas) => {            
            res.render(viewPath + 'perfil', {
                pessoa: pessoa,
                perguntas: perguntas
            });  
        });
    }).catch((e) => {
        res.render(viewPath + 'error', {
            message: 'Erro ao acessar perfil'
        });  
    });
});

server.get('/logout', (req, res) => {
    authStatus = false; 
    pessoaAtual = null;
    res.redirect('/');
});

server.get('/entrar', (req, res) => {
    res.render(viewPath + 'entrar');
});

server.get('/home', checkAuth, (req, res) => {
    const perguntasSemResposta = Pergunta.findAll({
        raw: true,
        where: {
            id: {
                [Op.notIn]: Sequelize.literal(`(SELECT id_pergunta FROM respostas)`)
            }
        },
        order: [['id', 'DESC']]
    });

    const perguntasComResposta = Pergunta.findAll({
        raw: true,
        where: {
            id: {
                [Op.in]: Sequelize.literal(`(SELECT id_pergunta FROM respostas)`)
            }
        },
        order: [['id', 'DESC']]
    });


    const pessoas = Pessoa.findAll({
        raw: true,
        where: {
            id: {
                [Op.in]: Sequelize.literal(`(SELECT id_pessoa from perguntas)`)
            }
        }
    });

    const pessoa = Pessoa.findOne({where: {id: req.pessoaAtual}});

    Promise.all([perguntasSemResposta, perguntasComResposta, pessoas, pessoa])
        .then(([perguntasSemResposta, perguntasComResposta, pessoas, pessoa]) => {
            console.log(perguntasSemResposta);
            

            res.render(viewPath + 'home', {
                perguntasSemResposta: perguntasSemResposta,
                perguntasComResposta: perguntasComResposta,
                pessoas: pessoas,
                pessoaObject: pessoa
            });  
        }).catch(e => {
            res.render(viewPath + 'error', {
                message: error.message 
            });
        });

});

server.get('/', (req, res) => {
    res.render(viewPath + 'login');
});

//Server startado
server.listen(3000, function(e){
    if(e){
        console.log(e);
    }else{
        console.log('Servidor iniciado');
    }
});

//Teste de conexão com o banco
connection.authenticate().then(() => {
    console.log('Conectado ao banco de dados');
}).catch((e) => {
    console.log(e);
});

/*
* ANOTAÇÕES
* Express => Manuseio de requisições de respostas
* Nodemon => Monitoramento automático das rotas (edição de código)
* EJS => Motor de template = uso dos parâmetros dentro do HTML
* Bootstrap => Componentes de interfaces prontos para auxiliar no front-end
*   class= container, form-control, btn btn-success, btn-danger, card, card-header, card-body
* Body-Parser => Capturar dados de formulário
* 
* Params => 
*   query => rota (/user/cpf?value=teste) => value seria o valor a ser acessado pela query
*   body => enviado do HTML
*   params => acessa o dado passado direto na rota
*/