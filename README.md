# ProjetoNode

# Projeto: Formulário de Perguntas e Respostas

## Descrição

Este projeto é um aplicativo web desenvolvido com Node.js e Express, criado com o propósito de adquirir e aprimorar conhecimentos em Node.js. O sistema permite aos usuários criar, visualizar, responder e excluir perguntas. É uma plataforma ideal para aprender e praticar operações CRUD (Criar, Ler, Atualizar e Excluir) em um banco de dados, além de gerenciar rotas em uma aplicação web.

O objetivo principal é fornecer uma base sólida para entender conceitos fundamentais de desenvolvimento web, como o gerenciamento de rotas e a manipulação de dados em um banco de dados relacional. A interface foi projetada para ser intuitiva e esteticamente agradável, oferecendo uma experiência de usuário eficiente e moderna.

## Funcionalidades

- **Criação de Perguntas:** Os usuários podem enviar novas perguntas através de um formulário simples e direto.
- **Visualização de Perguntas:** As perguntas enviadas são exibidas em uma lista, permitindo que os usuários vejam o conteúdo e detalhes das perguntas.
- **Respostas a Perguntas:** Os usuários podem responder às perguntas diretamente na interface, com as respostas armazenadas e associadas às perguntas correspondentes.
- **Exclusão:** Oferece a capacidade de excluir perguntas e respostas, permitindo a manutenção e gerenciamento dos dados de forma eficaz.
- **Interface Intuitiva:** A interface é projetada para ser clara e atraente, com uma navegação fácil e uma experiência de usuário agradável.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução para JavaScript no lado do servidor.
- **Express:** Framework web para Node.js que simplifica o gerenciamento de rotas e middleware.
- **Banco de Dados:** Armazena perguntas e respostas, utilizando uma solução de banco de dados relacional (como PostgreSQL ou MySQL) para persistência de dados.
- **EJS:** Motor de templates para renderizar páginas dinâmicas no lado do servidor.

## Estrutura do Projeto

- **Rotas:** Configuradas para gerenciar operações Create, Read e Delete para perguntas e respostas.
- **Modelos:** Definidos para interagir com o banco de dados e estruturar dados de perguntas e respostas.
- **Views:** Páginas EJS para exibir formulários e resultados, estilizadas para uma apresentação clara e profissional.
- **CSS:** Arquivos de estilo para garantir que a aplicação seja visualmente atraente e fácil de usar.

## Como Executar

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/MaduFurini/ProjetoNode.git
   
2. **Instale as Dependências:**

   ```bash
   npm install

3. **Instale o Nodemon:**

   ```bash
   npm install nodemon

4. **Atualize as Dependências:**

   ```bash
   npm update

5. **Configure um banco de dados local:**

     Certifique-se de que o banco de dados está configurado conforme especificado no arquivo de configuração (/database/database.js)

6. **Inicie o servidor:**

   ```bash
   npm start

7. **Acesse a aplicação:**

     Abra o navegador e vá para http://localhost:3000 para interagir com o formulário de perguntas e respostas.

## Fotos do projeto

### Login
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/login.png)

### Erro de cadastro de usuários com mesmo email
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/emailExistente.png)

### Entrar
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/entrar.png)

### Erro de senha incorreta
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/senhaIncorreta.png)

### Home
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/home.png)

### Nova Pergunta
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/novaPergunta.png)

### Home com perguntas registradas
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/homePerguntas.png)

### Visualizar e responder perguntas
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/viewPergunta.png)

### Perfil do usuário
![](https://raw.githubusercontent.com/MaduFurini/ProjetoNode/main/projectImages/perguntasUser.png)
