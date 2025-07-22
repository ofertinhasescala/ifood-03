#!/usr/bin/env node

/**
 * Script para corrigir cores das páginas iFood (ifood/4 até ifood/14-1)
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Corrigindo cores das páginas iFood...\n');

// Cores corretas do iFood
const correctColors = {
    primary: '#EA1D2C',        // Vermelho principal iFood
    primaryHover: '#d11625',   // Vermelho hover
    secondary: '#FF6900',      // Laranja secundário (se necessário)
    background: '#ffffff',     // Fundo branco
    backgroundGray: '#f8f9fa', // Fundo cinza claro
    text: '#1c1c1c',          // Texto principal
    textSecondary: '#666',     // Texto secundário
    success: '#4CAF50',        // Verde sucesso
    error: '#ff5252',          // Vermelho erro
    border: '#EA1D2C'          // Bordas vermelhas
};

// Páginas para corrigir
const pagesToFix = [4, 5, 6, 7, 8, 9, 10, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

function fixIfoodColors(content) {
    let fixedContent = content;
    
    // Corrigir fonte para Inter
    fixedContent = fixedContent.replace(
        /font-family:\s*Arial[^;]*/g,
        `font-family: 'Inter', sans-serif`
    );
    
    // Garantir que o header tenha as cores corretas do iFood
    fixedContent = fixedContent.replace(
        /\.header\s*{[^}]*}/g,
        `.header {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            background-color: ${correctColors.background};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }`
    );
    
    // Corrigir botões principais para vermelho iFood
    fixedContent = fixedContent.replace(
        /\.button\s*{[^}]*}/g,
        `.button {
            background-color: ${correctColors.primary};
            color: #ffffff;
            padding: 18px 30px;
            border-radius: 12px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            text-decoration: none;
            display: inline-block;
            text-align: center;
            box-sizing: border-box;
            border: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(234, 29, 44, 0.3);
        }`
    );
    
    // Corrigir hover dos botões
    fixedContent = fixedContent.replace(
        /\.button:hover\s*{[^}]*}/g,
        `.button:hover {
            background-color: ${correctColors.primaryHover};
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(234, 29, 44, 0.4);
        }`
    );
    
    // Corrigir cores antigas do Mercado Livre para iFood
    fixedContent = fixedContent.replace(/#FFE600/g, correctColors.primary);
    fixedContent = fixedContent.replace(/#e6cf00/g, correctColors.primaryHover);
    fixedContent = fixedContent.replace(/#3483fa/g, correctColors.primary);
    fixedContent = fixedContent.replace(/#2968c8/g, correctColors.primaryHover);
    fixedContent = fixedContent.replace(/#aa9900/g, correctColors.primary);
    
    // Garantir que o body tenha fundo correto
    fixedContent = fixedContent.replace(
        /body\s*{[^}]*}/g,
        function(match) {
            let bodyStyles = match;
            if (!bodyStyles.includes('background-color')) {
                bodyStyles = bodyStyles.replace('}', `            background-color: ${correctColors.background};\n        }`);
            } else {
                bodyStyles = bodyStyles.replace(/background-color:[^;]*;/, `background-color: ${correctColors.background};`);
            }
            // Garantir fonte Inter
            if (!bodyStyles.includes('font-family')) {
                bodyStyles = bodyStyles.replace('}', `            font-family: 'Inter', sans-serif;\n        }`);
            } else {
                bodyStyles = bodyStyles.replace(/font-family:[^;]*;/, `font-family: 'Inter', sans-serif;`);
            }
            return bodyStyles;
        }
    );
    
    // Corrigir containers de conteúdo
    fixedContent = fixedContent.replace(
        /\.content[^{]*{[^}]*}/g,
        function(match) {
            let contentStyles = match;
            if (!contentStyles.includes('background-color')) {
                contentStyles = contentStyles.replace('}', `            background-color: ${correctColors.background};\n        }`);
            } else {
                contentStyles = contentStyles.replace(/background-color:[^;]*;/, `background-color: ${correctColors.background};`);
            }
            return contentStyles;
        }
    );
    
    // Corrigir bordas para vermelho iFood
    fixedContent = fixedContent.replace(
        /border:\s*[^;]*solid\s*#[a-fA-F0-9]{6}/g,
        `border: 2px solid ${correctColors.primary}`
    );
    
    // Corrigir ícones para vermelho iFood
    fixedContent = fixedContent.replace(
        /color:\s*#FFE600/g,
        `color: ${correctColors.primary}`
    );
    
    // Corrigir fundos inline
    fixedContent = fixedContent.replace(
        /background:\s*#FFE600/g,
        `background: ${correctColors.primary}`
    );
    
    // Corrigir informações da empresa para iFood
    fixedContent = fixedContent.replace(
        /Mercado Livre Brasil LTDA/g,
        'iFood.com Agência de Restaurantes Online S.A.'
    );
    
    fixedContent = fixedContent.replace(
        /CNPJ: 79\.379\.491\.0008-50/g,
        'CNPJ: 14.380.200/0001-21'
    );
    
    fixedContent = fixedContent.replace(
        /Av\. das Nações Unidas, 3000 - Bonfim, Osasco - SP, 06233-903/g,
        'Rua Jasmin, 660 - Vila Madalena, São Paulo - SP, 05042-001'
    );
    
    fixedContent = fixedContent.replace(
        /Mercado Livre/g,
        'iFood'
    );
    
    // Garantir logo iFood
    fixedContent = fixedContent.replace(
        /src="logo\.png"/g,
        'src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IFood_logo.svg/2560px-IFood_logo.svg.png"'
    );
    
    return fixedContent;
}

// Processar cada página
pagesToFix.forEach(pageNum => {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (fs.existsSync(filePath)) {
        try {
            // Ler conteúdo original
            const originalContent = fs.readFileSync(filePath, 'utf8');
            
            // Aplicar correções de cores
            const fixedContent = fixIfoodColors(originalContent);
            
            // Escrever arquivo corrigido
            fs.writeFileSync(filePath, fixedContent);
            
            console.log(`✅ Cores iFood corrigidas na página ${pageNum}`);
        } catch (error) {
            console.log(`❌ Erro ao corrigir página ${pageNum}:`, error.message);
        }
    } else {
        console.log(`⚠️ Página ${pageNum} não encontrada`);
    }
});

console.log('\n🎨 Correção de cores iFood concluída!');
console.log('\n📋 Cores aplicadas:');
console.log(`- Vermelho principal: ${correctColors.primary}`);
console.log(`- Vermelho hover: ${correctColors.primaryHover}`);
console.log(`- Fundo: ${correctColors.background}`);
console.log(`- Fonte: Inter`);
console.log(`- Logo: iFood oficial`);