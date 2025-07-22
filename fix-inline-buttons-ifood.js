#!/usr/bin/env node

/**
 * Script para corrigir botões com estilos inline problemáticos
 */

const fs = require('fs');

console.log('🔧 Corrigindo botões com estilos inline...\n');

const pagesToFix = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

pagesToFix.forEach(pageNum => {
    const filePath = `ifood/${pageNum}/index.html`;
    
    if (fs.existsSync(filePath)) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Corrigir botões com texto preto específico
            content = content.replace(
                /<(button|a)([^>]*class="[^"]*button[^"]*"[^>]*)>([^<]*)<\/(button|a)>/g,
                function(match, openTag, attributes, text, closeTag) {
                    // Garantir que o botão tenha estilo vermelho com texto branco
                    let newAttributes = attributes;
                    
                    if (newAttributes.includes('style=')) {
                        newAttributes = newAttributes.replace(/style="([^"]*)"/, function(styleMatch, styles) {
                            let newStyles = styles;
                            
                            // Garantir background vermelho
                            if (!newStyles.includes('background-color:') && !newStyles.includes('background:')) {
                                newStyles += '; background-color: #EA1D2C';
                            } else {
                                newStyles = newStyles.replace(/background-color:\s*[^;]*;?/, 'background-color: #EA1D2C;');
                                newStyles = newStyles.replace(/background:\s*[^;]*;?/, 'background: #EA1D2C;');
                            }
                            
                            // Garantir texto branco
                            if (!newStyles.includes('color:')) {
                                newStyles += '; color: #ffffff';
                            } else {
                                newStyles = newStyles.replace(/color:\s*[^;]*;?/, 'color: #ffffff;');
                            }
                            
                            return `style="${newStyles}"`;
                        });
                    } else {
                        newAttributes += ' style="background-color: #EA1D2C; color: #ffffff;"';
                    }
                    
                    return `<${openTag}${newAttributes}>${text}</${closeTag}>`;
                }
            );
            
            // Corrigir especificamente elementos com onclick que podem ser botões
            content = content.replace(
                /<div([^>]*onclick[^>]*)>([^<]*(?:Continuar|Próxima|Finalizar|Li e concordo|QUERO|SIM)[^<]*)<\/div>/gi,
                function(match, attributes, text) {
                    let newAttributes = attributes;
                    
                    if (newAttributes.includes('style=')) {
                        newAttributes = newAttributes.replace(/style="([^"]*)"/, function(styleMatch, styles) {
                            let newStyles = styles;
                            
                            if (!newStyles.includes('background-color:')) {
                                newStyles += '; background-color: #EA1D2C';
                            } else {
                                newStyles = newStyles.replace(/background-color:\s*[^;]*;?/, 'background-color: #EA1D2C;');
                            }
                            
                            if (!newStyles.includes('color:')) {
                                newStyles += '; color: #ffffff';
                            } else {
                                newStyles = newStyles.replace(/color:\s*[^;]*;?/, 'color: #ffffff;');
                            }
                            
                            return `style="${newStyles}"`;
                        });
                    } else {
                        newAttributes += ' style="background-color: #EA1D2C; color: #ffffff;"';
                    }
                    
                    return `<div${newAttributes}>${text}</div>`;
                }
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Botões inline corrigidos na página ${pageNum}`);
        } catch (error) {
            console.log(`❌ Erro na página ${pageNum}:`, error.message);
        }
    }
});

console.log('\n✨ Correção de botões inline concluída!');