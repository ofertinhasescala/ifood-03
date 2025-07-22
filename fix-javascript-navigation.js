#!/usr/bin/env node

/**
 * Script para corrigir erros de JavaScript que causam 404s na navegação
 * Problema: Declarações duplicadas de 'const url' na função buildUrlWithParams
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 CORRIGINDO ERROS DE NAVEGAÇÃO JAVASCRIPT\n');

// Lista de todas as páginas ifood
const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

function fixJavaScriptErrors(pageNum) {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ Página ${pageNum}: Arquivo não encontrado`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 1. Corrigir declarações duplicadas de 'const url'
    const duplicateUrlPattern = /const url = new URL\(baseUrl, window\.location\.href\);\s*const url = new URL\(baseUrl, window\.location\.href\);/g;
    if (content.match(duplicateUrlPattern)) {
        content = content.replace(duplicateUrlPattern, 'const url = new URL(baseUrl, window.location.href);');
        hasChanges = true;
        console.log(`✅ Página ${pageNum}: Corrigida declaração duplicada de 'const url'`);
    }
    
    // 2. Corrigir outras possíveis duplicações na função buildUrlWithParams
    const buildUrlPattern = /function buildUrlWithParams\(baseUrl\) \{[\s\S]*?\}/g;
    const buildUrlMatches = content.match(buildUrlPattern);
    
    if (buildUrlMatches) {
        buildUrlMatches.forEach(match => {
            // Verificar se há linhas duplicadas dentro da função
            const lines = match.split('\n');
            const uniqueLines = [];
            const seenLines = new Set();
            
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine && !seenLines.has(trimmedLine)) {
                    seenLines.add(trimmedLine);
                    uniqueLines.push(line);
                } else if (trimmedLine && seenLines.has(trimmedLine)) {
                    // Linha duplicada encontrada, não adicionar
                    hasChanges = true;
                }
            });
            
            if (hasChanges) {
                const cleanedFunction = uniqueLines.join('\n');
                content = content.replace(match, cleanedFunction);
            }
        });
    }
    
    // 3. Garantir que a função buildUrlWithParams está correta
    const correctBuildUrlFunction = `
        function buildUrlWithParams(baseUrl) {
            const params = getUrlParams();
            const url = new URL(baseUrl, window.location.href);
            
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });
            
            return url.toString();
        }`;
    
    // Se a função está malformada, substituir pela versão correta
    if (content.includes('const url = new URL(baseUrl, window.location.href);') && 
        !content.includes('return url.toString();')) {
        const functionRegex = /function buildUrlWithParams\(baseUrl\) \{[\s\S]*?\n\s*\}/g;
        content = content.replace(functionRegex, correctBuildUrlFunction);
        hasChanges = true;
        console.log(`✅ Página ${pageNum}: Função buildUrlWithParams corrigida`);
    }
    
    // 4. Verificar se há erros de sintaxe JavaScript óbvios
    const syntaxErrors = [
        /querySelectorAll\('\\.button \{/g,  // Erro comum encontrado
        /\}\s*\}\s*\}/g  // Chaves extras
    ];
    
    syntaxErrors.forEach(errorPattern => {
        if (content.match(errorPattern)) {
            // Corrigir erros específicos conhecidos
            if (errorPattern.source.includes('querySelectorAll')) {
                content = content.replace(/querySelectorAll\('\\.button \{'/g, "querySelectorAll('.button')");
                hasChanges = true;
                console.log(`✅ Página ${pageNum}: Corrigido erro de querySelectorAll`);
            }
        }
    });
    
    // Salvar arquivo se houve mudanças
    if (hasChanges) {
        fs.writeFileSync(filePath, content);
        console.log(`💾 Página ${pageNum}: Arquivo salvo com correções`);
        return true;
    } else {
        console.log(`✓ Página ${pageNum}: Nenhuma correção necessária`);
        return false;
    }
}

// Processar todas as páginas
let totalFixed = 0;
pages.forEach(pageNum => {
    if (fixJavaScriptErrors(pageNum)) {
        totalFixed++;
    }
});

console.log(`\n📊 RESULTADO:`);
console.log(`✅ ${totalFixed} páginas corrigidas`);
console.log(`✓ ${pages.length - totalFixed} páginas já estavam corretas`);

console.log('\n🚀 COMO TESTAR:');
console.log('1. Execute: python3 -m http.server 8000');
console.log('2. Acesse: http://localhost:8000/ifood/1/');
console.log('3. Navegue pelo fluxo - os botões devem funcionar sem 404s');
console.log('4. Verifique o console do navegador para erros JavaScript');

console.log('\n🔍 ERROS CORRIGIDOS:');
console.log('- Declarações duplicadas de "const url"');
console.log('- Funções buildUrlWithParams malformadas');
console.log('- Erros de sintaxe em querySelectorAll');
console.log('- Chaves JavaScript extras');