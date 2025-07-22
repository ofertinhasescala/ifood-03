#!/usr/bin/env node

/**
 * Script para corrigir especificamente os headers das páginas iFood
 */

const fs = require('fs');

console.log('🔧 Corrigindo headers das páginas iFood...\n');

const pagesToFix = [4, 5, 6, 7, 8, 9, 10, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

pagesToFix.forEach(pageNum => {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (fs.existsSync(filePath)) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Corrigir header para ter fundo branco (não vermelho)
            content = content.replace(
                /background-color:\s*#EA1D2C;/g,
                function(match, offset, string) {
                    // Só substituir se estiver dentro do .header
                    const beforeMatch = string.substring(0, offset);
                    const lastHeaderIndex = beforeMatch.lastIndexOf('.header');
                    const lastCloseBrace = beforeMatch.lastIndexOf('}');
                    
                    if (lastHeaderIndex > lastCloseBrace) {
                        return 'background-color: #ffffff;';
                    }
                    return match;
                }
            );
            
            // Garantir que não há border-bottom vermelho no header
            content = content.replace(
                /border-bottom:\s*1px\s*solid\s*#EA1D2C;/g,
                'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);'
            );
            
            // Garantir que o logo está centralizado
            content = content.replace(
                /\.logo\s*{[^}]*}/g,
                `.logo {
                    margin-left: auto;
                    margin-right: auto;
                }`
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Header corrigido na página ${pageNum}`);
        } catch (error) {
            console.log(`❌ Erro na página ${pageNum}:`, error.message);
        }
    }
});

console.log('\n✨ Correção de headers concluída!');