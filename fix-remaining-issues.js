#!/usr/bin/env node

/**
 * Corrigir os problemas restantes nas páginas específicas
 */

const fs = require('fs');

console.log('🔧 Corrigindo problemas restantes...\n');

const pagesToFix = [4, 5, 6, 12, '14-3'];

function fixSpecificPage(pageNum) {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ Página ${pageNum}: Não encontrada`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let fixes = [];
    
    // Corrigir informações da empresa
    if (!content.includes('iFood.com Agência de Restaurantes Online S.A.')) {
        content = content.replace(
            /Mercado Livre Brasil LTDA/g,
            'iFood.com Agência de Restaurantes Online S.A.'
        );
        content = content.replace(
            /CNPJ: 79\.379\.491\.0008-50/g,
            'CNPJ: 14.380.200/0001-21'
        );
        content = content.replace(
            /Av\. das Nações Unidas, 3000 - Bonfim, Osasco - SP, 06233-903/g,
            'Rua Jasmin, 660 - Vila Madalena, São Paulo - SP, 05042-001'
        );
        fixes.push('Informações da empresa');
    }
    
    // Corrigir fundo branco
    if (!content.includes('background-color: #ffffff') || 
        content.includes('background-color: #f5f5f5')) {
        content = content.replace(
            /body\s*{[^}]*}/g,
            `body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
        }`
        );
        fixes.push('Fundo branco');
    }
    
    // Corrigir botões
    if (!content.includes('background-color: #EA1D2C') || 
        content.includes('background-color: #ffffff')) {
        content = content.replace(
            /\.button\s*{[^}]*}/g,
            `.button {
            background-color: #EA1D2C;
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
        fixes.push('Botões vermelhos');
    }
    
    fs.writeFileSync(filePath, content);
    
    if (fixes.length > 0) {
        console.log(`✅ Página ${pageNum}: ${fixes.join(', ')} corrigidos`);
    } else {
        console.log(`✅ Página ${pageNum}: Já estava correta`);
    }
}

// Corrigir páginas específicas
pagesToFix.forEach(pageNum => {
    fixSpecificPage(pageNum);
});

console.log('\n🔧 Correções específicas concluídas!');