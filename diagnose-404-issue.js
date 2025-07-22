#!/usr/bin/env node

/**
 * Script para diagnosticar a causa dos erros 404 na navegação
 */

const fs = require('fs');

console.log('🔍 DIAGNÓSTICO DE ERROS 404\n');

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

function diagnoseFile(pageNum) {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ Página ${pageNum}: Arquivo não encontrado`);
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // 1. Verificar se buildUrlWithParams existe
    if (!content.includes('function buildUrlWithParams')) {
        issues.push('Função buildUrlWithParams não encontrada');
    }
    
    // 2. Verificar se getUrlParams existe
    if (!content.includes('function getUrlParams')) {
        issues.push('Função getUrlParams não encontrada');
    }
    
    // 3. Verificar se há erros de sintaxe óbvios
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
        issues.push(`Chaves desbalanceadas: ${openBraces} abrir vs ${closeBraces} fechar`);
    }
    
    // 4. Verificar se há window.location.href calls
    const locationCalls = content.match(/window\.location\.href\s*=/g);
    if (locationCalls) {
        issues.push(`${locationCalls.length} chamadas de navegação encontradas`);
    }
    
    // 5. Verificar se há onclick handlers
    const onclickHandlers = content.match(/onclick\s*=/g);
    if (onclickHandlers) {
        issues.push(`${onclickHandlers.length} handlers onclick encontrados`);
    }
    
    // 6. Verificar se há erros específicos conhecidos
    if (content.includes("querySelectorAll('.button {")) {
        issues.push('Erro de sintaxe em querySelectorAll');
    }
    
    // 7. Verificar se há links relativos corretos
    const relativeLinks = content.match(/\.\.\//g);
    if (relativeLinks) {
        issues.push(`${relativeLinks.length} links relativos encontrados`);
    }
    
    // 8. Verificar se há console.error ou try/catch
    if (content.includes('console.error')) {
        issues.push('Tratamento de erro encontrado');
    }
    
    // 9. Verificar se há buildUrlWithParams duplicado
    const buildUrlMatches = content.match(/function buildUrlWithParams/g);
    if (buildUrlMatches && buildUrlMatches.length > 1) {
        issues.push(`Função buildUrlWithParams duplicada (${buildUrlMatches.length}x)`);
    }
    
    // 10. Verificar se há const url duplicado na mesma linha
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        const constUrlMatches = line.match(/const url/g);
        if (constUrlMatches && constUrlMatches.length > 1) {
            issues.push(`Linha ${index + 1}: const url duplicado na mesma linha`);
        }
    });
    
    if (issues.length === 0) {
        console.log(`✅ Página ${pageNum}: Sem problemas detectados`);
    } else {
        console.log(`⚠️ Página ${pageNum}:`);
        issues.forEach(issue => console.log(`   - ${issue}`));
    }
    
    return issues;
}

// Diagnosticar todas as páginas
console.log('📋 DIAGNÓSTICO POR PÁGINA:\n');
let totalIssues = 0;

pages.forEach(pageNum => {
    const issues = diagnoseFile(pageNum);
    if (issues && issues.length > 0) {
        totalIssues += issues.length;
    }
});

console.log(`\n📊 RESUMO:`);
console.log(`Total de problemas encontrados: ${totalIssues}`);

console.log('\n💡 POSSÍVEIS CAUSAS DOS 404s:');
console.log('1. Servidor não está rodando na porta correta');
console.log('2. Caminhos relativos incorretos (../página/)');
console.log('3. Erros JavaScript impedindo navegação');
console.log('4. Arquivos não existem no local esperado');
console.log('5. Problemas de CORS ou configuração do servidor');

console.log('\n🔧 PRÓXIMOS PASSOS:');
console.log('1. Verificar se o servidor está rodando: python3 -m http.server 8000');
console.log('2. Testar acesso direto: http://localhost:8000/ifood/1/');
console.log('3. Abrir DevTools e verificar Console e Network');
console.log('4. Verificar se os arquivos existem fisicamente');
console.log('5. Testar navegação manual entre páginas');