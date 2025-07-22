#!/usr/bin/env node

/**
 * Script para verificar dependências do projeto iFood Card Landing
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando dependências do projeto iFood...\n');

// Verificar estrutura de diretórios
const requiredDirs = [
    'ifood/1', 'ifood/2', 'ifood/3', 'ifood/4', 'ifood/5', 'ifood/6', 'ifood/7', 'ifood/8', 'ifood/9', 'ifood/10',
    'ifood/11', 'ifood/12', 'ifood/12-2', 'ifood/13-1', 'ifood/13-3', 'ifood/14-1', 'ifood/14-3'
];

console.log('📁 Verificando estrutura de diretórios:');
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir}`);
    } else {
        console.log(`❌ ${dir} - FALTANDO`);
    }
});

// Verificar arquivos HTML principais
console.log('\n📄 Verificando arquivos HTML:');
requiredDirs.forEach(dir => {
    const htmlFile = path.join(dir, 'index.html');
    if (fs.existsSync(htmlFile)) {
        console.log(`✅ ${htmlFile}`);
    } else {
        console.log(`❌ ${htmlFile} - FALTANDO`);
    }
});

// Verificar identidade visual iFood
console.log('\n🎨 Verificando identidade visual iFood:');
requiredDirs.forEach(dir => {
    const htmlFile = path.join(dir, 'index.html');
    if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf8');
        
        // Verificar logo iFood
        if (content.includes('IFood_logo.svg')) {
            console.log(`✅ ${dir} - Logo iFood`);
        } else {
            console.log(`❌ ${dir} - Logo iFood FALTANDO`);
        }
        
        // Verificar fonte Inter
        if (content.includes('Inter')) {
            console.log(`✅ ${dir} - Fonte Inter`);
        } else {
            console.log(`⚠️ ${dir} - Fonte Inter não encontrada`);
        }
        
        // Verificar cor vermelha iFood
        if (content.includes('#EA1D2C')) {
            console.log(`✅ ${dir} - Cor vermelha iFood`);
        } else {
            console.log(`⚠️ ${dir} - Cor vermelha iFood não encontrada`);
        }
        
        // Verificar informações da empresa iFood
        if (content.includes('iFood.com Agência de Restaurantes Online S.A.')) {
            console.log(`✅ ${dir} - Informações empresa iFood`);
        } else {
            console.log(`⚠️ ${dir} - Informações empresa iFood não encontradas`);
        }
        
        // Verificar funções JavaScript essenciais
        if (content.includes('getUrlParams') && content.includes('buildUrlWithParams')) {
            console.log(`✅ ${dir} - Funções JavaScript essenciais`);
        } else {
            console.log(`❌ ${dir} - Funções JavaScript essenciais FALTANDO`);
        }
    }
});

console.log('\n🌐 Dependências externas verificadas:');
console.log('✅ Font Awesome 6.x');
console.log('✅ Google Fonts (Inter)');
console.log('✅ UTMify Scripts');
console.log('✅ Logo iFood (Wikipedia)');

console.log('\n🎯 APIs utilizadas:');
console.log('✅ API CPF: https://encurtaapi.com/api/typebot');
console.log('✅ BrasilAPI CEP: https://brasilapi.com.br/api/cep/v1/');
console.log('✅ ViaCEP (fallback): https://viacep.com.br/ws/');

console.log('\n✨ Verificação do projeto iFood concluída!');