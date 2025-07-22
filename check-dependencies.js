#!/usr/bin/env node

/**
 * Script para verificar dependências do projeto Mercado Livre Card Landing
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando dependências do projeto...\n');

// Verificar estrutura de diretórios
const requiredDirs = [
    'ml/1', 'ml/2', 'ml/3', 'ml/4', 'ml/5', 'ml/6', 'ml/7', 'ml/8', 'ml/9', 'ml/10',
    'ml/11', 'ml/12', 'ml/12-2', 'ml/13-1', 'ml/13-3', 'ml/14-1', 'ml/14-3'
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

// Verificar imagens essenciais
console.log('\n🖼️ Verificando imagens essenciais:');
const requiredImages = [
    'ml/1/logo.png', 'ml/1/app.webp',
    'ml/6/chip.png', 'ml/6/visa.png',
    'ml/9/chip.png', 'ml/9/visa.png',
    'ml/10/garrafas.webp',
    'ml/11/gerente.png'
];

requiredImages.forEach(img => {
    if (fs.existsSync(img)) {
        console.log(`✅ ${img}`);
    } else {
        console.log(`❌ ${img} - FALTANDO`);
    }
});

// Verificar dependências externas nos arquivos HTML
console.log('\n🌐 Verificando dependências externas:');
const externalDeps = [
    'fonts.googleapis.com/css2?family=Sora',
    'cdnjs.cloudflare.com/ajax/libs/font-awesome',
    'cdn.utmify.com.br/scripts/utms/latest.js',
    'cdn.utmify.com.br/scripts/pixel/pixel.js'
];

// Verificar se as dependências estão sendo carregadas
requiredDirs.forEach(dir => {
    const htmlFile = path.join(dir, 'index.html');
    if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf8');
        
        // Verificar Font Awesome
        if (content.includes('font-awesome')) {
            console.log(`✅ ${dir} - Font Awesome`);
        } else {
            console.log(`⚠️ ${dir} - Font Awesome não encontrado`);
        }
        
        // Verificar Google Fonts
        if (content.includes('fonts.googleapis.com')) {
            console.log(`✅ ${dir} - Google Fonts`);
        } else {
            console.log(`⚠️ ${dir} - Google Fonts não encontrado`);
        }
        
        // Verificar UTMify
        if (content.includes('utmify.com.br')) {
            console.log(`✅ ${dir} - UTMify Scripts`);
        } else {
            console.log(`⚠️ ${dir} - UTMify Scripts não encontrado`);
        }
        
        // Verificar funções JavaScript essenciais
        if (content.includes('getUrlParams') && content.includes('buildUrlWithParams')) {
            console.log(`✅ ${dir} - Funções JavaScript essenciais`);
        } else {
            console.log(`❌ ${dir} - Funções JavaScript essenciais FALTANDO`);
        }
    }
});

console.log('\n🎯 APIs utilizadas:');
console.log('✅ API CPF: https://encurtaapi.com/api/typebot');
console.log('✅ BrasilAPI CEP: https://brasilapi.com.br/api/cep/v1/');
console.log('✅ ViaCEP (fallback): https://viacep.com.br/ws/');

console.log('\n✨ Verificação concluída!');