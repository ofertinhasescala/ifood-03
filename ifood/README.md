# Projeto Cartão iFood

Este é um projeto de site estático com múltiplas páginas que simulam o fluxo de solicitação de um cartão de crédito iFood.

## Estrutura do Projeto

O projeto é composto por múltiplas páginas HTML organizadas em diretórios numerados:

- `/1` - Página inicial
- `/2` - Quiz de preferências
- `/3` - Termos e condições
- `/4` - Cadastro de CPF
- `/5` - Interesses do usuário
- `/6` - Processamento do cartão
- `/7` - Aprovação do cartão
- `/8` - `/9` - `/11` - `/12` - `/12-2` - `/13-1` - `/13-3` - `/14-1` - `/14-3` - Páginas subsequentes do fluxo

## Configuração para Vercel

O projeto está configurado para deploy na plataforma Vercel, utilizando as seguintes configurações:

1. O arquivo `vercel.json` na raiz define as regras de roteamento para todas as páginas
2. O arquivo `index.html` na raiz redireciona o usuário para a primeira página
3. Todas as referências de links entre páginas foram alteradas para usar caminhos absolutos compatíveis com o roteamento da Vercel

## Como Fazer o Deploy

1. **Criar uma conta na Vercel**: Se ainda não tiver, crie uma conta em [vercel.com](https://vercel.com)

2. **Instalar a CLI da Vercel** (opcional):
   ```
   npm install -g vercel
   ```

3. **Opção 1 - Deploy via CLI**:
   - Navegue até a pasta do projeto
   - Execute `vercel login` para autenticar
   - Execute `vercel` para fazer o deploy
   - Siga as instruções na tela

4. **Opção 2 - Deploy via Dashboard da Vercel**:
   - Faça login no [dashboard da Vercel](https://vercel.com/dashboard)
   - Clique em "New Project"
   - Importe o repositório ou faça upload do projeto
   - Clique em "Deploy"

## Configurações Importantes

- O projeto utiliza um arquivo `vercel.json` para configurar o roteamento
- A rota principal `/` é direcionada para a página inicial em `/1/index.html`
- Todas as navegações entre páginas usam caminhos absolutos
- Parâmetros de URL são preservados entre as navegações

## Desenvolvimento Local

Para testar o projeto localmente, você pode usar um servidor HTTP simples:

```bash
# Usando Python
python -m http.server

# Usando Node.js
npx serve
```

Acesse o site em `http://localhost:8000` ou na porta indicada pelo servidor. 