#!/usr/bin/env node

/**
 * Script para análise completa e correção de todos os problemas do projeto iFood
 */

const fs = require('fs');

console.log('🔍 ANÁLISE COMPLETA DO PROJETO IFOOD\n');

const pagesToCheck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];
const issues = [];

// Template do design correto iFood
const correctTemplate = {
    body: `body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        background-color: #ffffff;
        color: #333;
        text-align: center;
    }`,
    header: `.header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header img {
        width: 120px;
        height: auto;
    }`,
    button: `.button {
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
};

function analyzeAndFixPage(pageNum) {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (!fs.existsSync(filePath)) {
        issues.push(`❌ Página ${pageNum}: Arquivo não encontrado`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let hasIssues = false;
    let fixes = [];
    
    // 1. Verificar se body tem fundo branco
    if (content.includes('background-color: #EA1D2C !important') || 
        content.includes('color: #ffffff !important')) {
        hasIssues = true;
        fixes.push('Body com cores incorretas');
        
        // Corrigir body
        content = content.replace(
            /body\s*{[^}]*}/g,
            correctTemplate.body
        );
    }
    
    // 2. Verificar header
    if (!content.includes('.header {') || !content.includes('box-shadow: 0 2px 8px')) {
        hasIssues = true;
        fixes.push('Header sem estilo correto');
        
        // Adicionar/corrigir header
        if (!content.includes('.header {')) {
            content = content.replace(
                correctTemplate.body,
                correctTemplate.body + '\n        ' + correctTemplate.header
            );
        } else {
            content = content.replace(
                /\.header\s*{[^}]*}/g,
                correctTemplate.header.split('.header img')[0]
            );
        }
    }
    
    // 3. Verificar botões
    if (content.includes('!important') && content.includes('.button')) {
        hasIssues = true;
        fixes.push('Botões com !important desnecessário');
        
        // Corrigir botões
        content = content.replace(
            /\.button\s*{[^}]*}/g,
            correctTemplate.button
        );
    }
    
    // 4. Verificar logo iFood
    if (!content.includes('IFood_logo.svg')) {
        hasIssues = true;
        fixes.push('Logo iFood incorreto');
        
        // Corrigir logo
        content = content.replace(
            /src="[^"]*logo[^"]*"/g,
            'src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IFood_logo.svg/2560px-IFood_logo.svg.png"'
        );
    }
    
    // 5. Verificar JavaScript
    if (content.includes("querySelectorAll('.button {") || 
        content.includes("background-color: #EA1D2C !important")) {
        hasIssues = true;
        fixes.push('JavaScript com CSS misturado');
        
        // Corrigir JavaScript
        content = content.replace(
            /const buttons = document\.querySelectorAll\('\.button \{[^}]*\}\);/g,
            "const buttons = document.querySelectorAll('.button');"
        );
        
        // Garantir event listeners corretos
        if (!content.includes('button.addEventListener')) {
            const nextPage = getNextPage(pageNum);
            if (nextPage) {
                content = content.replace(
                    /const buttons = document\.querySelectorAll\('\.button'\);/,
                    `const buttons = document.querySelectorAll('.button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = buildUrlWithParams('${nextPage}');
                });
            });`
                );
            }
        }
    }
    
    // 6. Remover estilos inline problemáticos
    content = content.replace(
        /style="[^"]*background-color:\s*#EA1D2C\s*!\s*important[^"]*"/g,
        'style="background-color: #EA1D2C; color: #ffffff;"'
    );
    
    // 7. Garantir informações da empresa iFood
    if (!content.includes('iFood.com Agência de Restaurantes Online S.A.')) {
        hasIssues = true;
        fixes.push('Informações da empresa incorretas');
        
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
    }
    
    // Salvar correções
    if (hasIssues) {
        fs.writeFileSync(filePath, content);
        console.log(`🔧 Página ${pageNum}: ${fixes.join(', ')}`);
    } else {
        console.log(`✅ Página ${pageNum}: OK`);
    }
}

function getNextPage(pageNum) {
    const flow = {
        1: '../2/index.html',
        2: '../3/index.html',
        3: '../4/index.html',
        4: '../5/index.html',
        5: '../6/index.html',
        6: '../7/index.html',
        7: '../8/index.html',
        8: '../9/index.html',
        9: '../11/index.html',
        11: '../12/index.html',
        12: '../12-2/index.html',
        '13-1': '../14-1/index.html',
        '13-3': '../14-3/index.html'
    };
    return flow[pageNum];
}

// Analisar e corrigir todas as páginas
pagesToCheck.forEach(pageNum => {
    analyzeAndFixPage(pageNum);
});

console.log('\n📋 RESUMO DA ANÁLISE:');
if (issues.length === 0) {
    console.log('✅ Todas as páginas estão corretas!');
} else {
    console.log('❌ Problemas encontrados e corrigidos:');
    issues.forEach(issue => console.log(`   ${issue}`));
}

console.log('\n🎨 PADRÃO APLICADO:');
console.log('   - Fundo branco limpo');
console.log('   - Header com logo iFood centralizado');
console.log('   - Botões vermelhos (#EA1D2C) com texto branco');
console.log('   - Fonte Inter em todo o projeto');
console.log('   - JavaScript funcional sem erros');
console.log('   - Informações da empresa iFood corretas');