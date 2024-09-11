# ProjetoNode

# Projeto: Formulário de Perguntas e Respostas

## Descrição

Este projeto é um aplicativo web desenvolvido com Node.js e Express que permite aos usuários criar, visualizar, responder e excluir perguntas. O principal objetivo é fornecer uma plataforma para aprendizado e prática de rotas e operações CRUD (Criar, Ler, Atualizar e Excluir) com um banco de dados. A interface foi projetada para ser intuitiva e esteticamente agradável, proporcionando uma experiência de usuário eficiente e moderna.

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

3. **Configure um banco de dados local:**

  Certifique-se de que o banco de dados está configurado conforme especificado no arquivo de configuração (/database/database.js)

4. **Inicie o servidor:**

   ```bash
   npm start

5. **Acesse a aplicação:**
  Abra o navegador e vá para http://localhost:3000 para interagir com o formulário de perguntas e respostas.
