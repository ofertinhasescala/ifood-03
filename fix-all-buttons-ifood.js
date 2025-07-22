#!/usr/bin/env node

/**
 * Script para garantir que TODOS os botões do fluxo iFood sejam vermelhos com texto branco
 */

const fs = require('fs');

console.log('🔴 Corrigindo TODOS os botões para vermelho com texto branco...\n');

const pagesToFix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

function fixAllButtons(content) {
    let fixedContent = content;
    
    // 1. Corrigir TODOS os estilos de botão para vermelho com texto branco
    fixedContent = fixedContent.replace(
        /\.button[^{]*{[^}]*}/g,
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
    
    // 2. Corrigir hover dos botões
    fixedContent = fixedContent.replace(
        /\.button:hover[^{]*{[^}]*}/g,
        `.button:hover {
            background-color: #d11625;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(234, 29, 44, 0.4);
        }`
    );
    
    // 3. Corrigir botões com classes específicas (button2, etc.)
    fixedContent = fixedContent.replace(
        /\.button2[^{]*{[^}]*}/g,
        `.button2 {
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
    
    // 4. Corrigir botões inline com estilos específicos
    fixedContent = fixedContent.replace(
        /style="[^"]*background[^"]*#EA1D2C[^"]*"/g,
        function(match) {
            if (!match.includes('color:')) {
                return match.replace('"', '; color: #ffffff;"');
            } else {
                return match.replace(/color:\s*#[0-9a-fA-F]{6};/, 'color: #ffffff;');
            }
        }
    );
    
    // 5. Corrigir botões com background inline diferente
    fixedContent = fixedContent.replace(
        /style="[^"]*background:\s*#[0-9a-fA-F]{6}[^"]*"/g,
        function(match) {
            let newMatch = match.replace(/background:\s*#[0-9a-fA-F]{6};/, 'background: #EA1D2C;');
            if (!newMatch.includes('color:')) {
                newMatch = newMatch.replace('"', '; color: #ffffff;"');
            } else {
                newMatch = newMatch.replace(/color:\s*#[0-9a-fA-F]{6};/, 'color: #ffffff;');
            }
            return newMatch;
        }
    );
    
    // 6. Corrigir elementos <a> e <button> que podem ter cores diferentes
    fixedContent = fixedContent.replace(
        /<(a|button)([^>]*class="[^"]*button[^"]*"[^>]*)>/g,
        function(match, tag, attributes) {
            if (!attributes.includes('style=')) {
                return `<${tag}${attributes} style="background-color: #EA1D2C; color: #ffffff;">`;
            } else {
                let newAttributes = attributes.replace(/style="([^"]*)"/, function(styleMatch, styles) {
                    let newStyles = styles;
                    if (!newStyles.includes('background-color:')) {
                        newStyles += '; background-color: #EA1D2C';
                    } else {
                        newStyles = newStyles.replace(/background-color:\s*[^;]*;/, 'background-color: #EA1D2C;');
                    }
                    if (!newStyles.includes('color:')) {
                        newStyles += '; color: #ffffff';
                    } else {
                        newStyles = newStyles.replace(/color:\s*[^;]*;/, 'color: #ffffff;');
                    }
                    return `style="${newStyles}"`;
                });
                return `<${tag}${newAttributes}>`;
            }
        }
    );
    
    // 7. Corrigir qualquer referência a cores antigas em botões
    fixedContent = fixedContent.replace(
        /background-color:\s*#FFE600/g,
        'background-color: #EA1D2C'
    );
    
    fixedContent = fixedContent.replace(
        /background:\s*#FFE600/g,
        'background: #EA1D2C'
    );
    
    // 8. Garantir que textos em botões sejam brancos
    fixedContent = fixedContent.replace(
        /color:\s*#1c1c1c/g,
        function(match, offset, string) {
            // Verificar se está dentro de um contexto de botão
            const beforeMatch = string.substring(Math.max(0, offset - 200), offset);
            if (beforeMatch.includes('.button') || beforeMatch.includes('background-color: #EA1D2C')) {
                return 'color: #ffffff';
            }
            return match;
        }
    );
    
    return fixedContent;
}

// Processar cada página
pagesToFix.forEach(pageNum => {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (fs.existsSync(filePath)) {
        try {
            const originalContent = fs.readFileSync(filePath, 'utf8');
            const fixedContent = fixAllButtons(originalContent);
            fs.writeFileSync(filePath, fixedContent);
            
            console.log(`✅ Todos os botões corrigidos na página ${pageNum}`);
        } catch (error) {
            console.log(`❌ Erro ao corrigir página ${pageNum}:`, error.message);
        }
    } else {
        console.log(`⚠️ Página ${pageNum} não encontrada`);
    }
});

console.log('\n🔴 Correção completa de botões concluída!');
console.log('📋 Padrão aplicado: Fundo vermelho (#EA1D2C) + Texto branco (#ffffff)');