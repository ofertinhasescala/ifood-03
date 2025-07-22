# Landing Page Cartão iFood

## Visão Geral

Este projeto é uma landing page de captação de leads para o cartão de crédito iFood, adaptada da versão original do Mercado Livre. O funil mantém a mesma estrutura e funcionalidades, mas com a identidade visual completa do iFood.

## Estrutura do Projeto

```
ifood/
├── 1/          # Página inicial com oferta
├── 2/          # Quiz de preferências
├── 3/          # Termos e condições
├── 4/          # Coleta de CPF
├── 5/          # Confirmação de dados
├── 6/          # Processamento da solicitação
├── 7/          # Aprovação do cartão
├── 8/          # Informações sobre limite
├── 9/          # Personalização do cartão
├── 11/         # Contato com gerente
├── 12/         # Endereço de entrega
├── 12-2/       # Opções de entrega
├── 13-1/       # Detalhes do envio (SEDEX)
├── 13-3/       # Detalhes do envio (PAC)
├── 14-1/       # Cartão virtual (SEDEX)
└── 14-3/       # Cartão virtual (PAC)
```

## Identidade Visual iFood

### Cores Principais
- **Vermelho iFood**: `#EA1D2C` (cor primária)
- **Vermelho Hover**: `#d11625` (hover states)
- **Branco**: `#ffffff` (fundo principal)
- **Cinza Claro**: `#f8f9fa` (fundos secundários)

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Logo
- **URL**: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IFood_logo.svg/2560px-IFood_logo.svg.png`
- **Posicionamento**: Centralizado no header

### Elementos de UI
- **Botões**: Fundo vermelho iFood, texto branco, border-radius 12px
- **Cards**: Fundo branco, borda esquerda vermelha, sombras sutis
- **Ícones**: Font Awesome 6, cor vermelha iFood

## Funcionalidades

### Fluxo Principal
1. **Página Inicial**: Apresentação da oferta com benefícios
2. **Quiz**: 4 perguntas para qualificação do lead
3. **Termos**: Aceite dos termos e condições
4. **CPF**: Coleta e validação via API externa
5. **Processamento**: Simulação de análise
6. **Aprovação**: Confirmação do cartão aprovado
7. **Personalização**: Escolha de data de vencimento e cor do cartão
8. **Brinde**: Seleção de brinde (garrafa térmica)
9. **Contato**: Informações da gerente e WhatsApp
10. **Endereço**: Coleta de endereço com validação de CEP
11. **Finalização**: Confirmação e redirecionamento

### Recursos Técnicos
- **Responsivo**: Mobile-first design
- **Rastreamento**: UTMify para parâmetros UTM
- **Persistência**: localStorage para dados do usuário
- **APIs**: Integração com APIs de CPF e CEP
- **Validações**: Máscaras e validações em tempo real

## Dependências Externas

### CDNs
- Font Awesome 6.5.1
- Google Fonts (Inter)
- UTMify Scripts
- jQuery 3.6.0 (apenas página 12)
- jQuery Mask 1.14.16 (apenas página 12)

### APIs
- **CPF**: `https://encurtaapi.com/api/typebot`
- **CEP Principal**: `https://brasilapi.com.br/api/cep/v1/`
- **CEP Fallback**: `https://viacep.com.br/ws/`

## Como Executar

### Servidor Local
```bash
# Usando Python
python3 -m http.server 8000

# Usando Node.js (se tiver http-server instalado)
npx http-server

# Usando PHP
php -S localhost:8000
```

### Acessar
Abra o navegador e acesse: `http://localhost:8000/ifood/1/`

## Verificação de Dependências

Execute o script de verificação para garantir que tudo está funcionando:

```bash
node check-ifood-dependencies.js
```

## Informações da Empresa

**Razão Social**: iFood.com Agência de Restaurantes Online S.A.  
**CNPJ**: 14.380.200/0001-21  
**Endereço**: Rua Jasmin, 660 - Vila Madalena, São Paulo - SP, 05042-001

## Diferenças do Projeto Original

### Adaptações Visuais
- Logo do Mercado Livre → Logo do iFood
- Cores amarelas → Cores vermelhas
- Fonte Sora → Fonte Inter
- Informações da empresa atualizadas

### Conteúdo Mantido
- Estrutura do funil idêntica
- Funcionalidades JavaScript preservadas
- APIs e integrações mantidas
- Fluxo de navegação inalterado

## Suporte

Para dúvidas ou problemas, consulte os arquivos de especificação em `.kiro/specs/ifood-card/`