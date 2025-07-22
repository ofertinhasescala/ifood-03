#!/usr/bin/env node

/**
 * Script para criar todas as páginas do funil iFood baseado no projeto Mercado Livre
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Criando páginas do funil iFood...\n');

// Mapeamento de cores e elementos visuais
const brandMapping = {
    // Cores Mercado Livre -> iFood
    '#FFE600': '#EA1D2C',  // Amarelo ML -> Vermelho iFood
    '#fff159': '#ffffff',  // Fundo amarelo -> Branco
    '#3483fa': '#EA1D2C',  // Azul ML -> Vermelho iFood
    '#aa9900': '#EA1D2C',  // Borda amarela -> Vermelha
    '#e6d950': '#EA1D2C',  // Borda amarela clara -> Vermelha
    '#dbd7af': '#f8f9fa',  // Fundo amarelo claro -> Cinza claro
    '#efa000': '#EA1D2C',  // Laranja ML -> Vermelho iFood
    '#2968c8': '#d11625',  // Azul hover -> Vermelho hover
    
    // Fontes
    'Sora': 'Inter',
    
    // Textos da empresa
    'Mercado Livre Brasil LTDA': 'iFood.com Agência de Restaurantes Online S.A.',
    'CNPJ: 79.379.491.0008-50': 'CNPJ: 14.380.200/0001-21',
    'Av. das Nações Unidas, 3000 - Bonfim, Osasco - SP, 06233-903': 'Rua Jasmin, 660 - Vila Madalena, São Paulo - SP, 05042-001',
    'Mercado Livre': 'iFood',
    'Cartão Mercado Livre': 'Cartão iFood',
    
    // Logo
    'logo.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IFood_logo.svg/2560px-IFood_logo.svg.png'
};

function adaptContentForIFood(content) {
    let adaptedContent = content;
    
    // Aplicar todas as substituições
    Object.keys(brandMapping).forEach(key => {
        const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        adaptedContent = adaptedContent.replace(regex, brandMapping[key]);
    });
    
    // Ajustes específicos de estilo
    adaptedContent = adaptedContent.replace(
        /font-family: 'Sora'/g, 
        "font-family: 'Inter'"
    );
    
    // Adicionar link para Inter font se não existir
    if (!adaptedContent.includes('Inter')) {
        adaptedContent = adaptedContent.replace(
            /fonts\.googleapis\.com\/css2\?family=Sora[^"]+/g,
            'fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        );
    }
    
    return adaptedContent;
}

// Lista de páginas para criar
const pagesToCreate = [4, 5, 6, 7, 8, 9, 10, 11, 12, '12-2', '13-1', '13-3', '14-1', '14-3'];

pagesToCreate.forEach(pageNum => {
    const sourcePath = `ml/${pageNum}/index.html`;
    const targetPath = `ifood/${pageNum}/index.html`;
    
    if (fs.existsSync(sourcePath)) {
        try {
            // Criar diretório se não existir
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
            
            // Ler conteúdo original
            const originalContent = fs.readFileSync(sourcePath, 'utf8');
            
            // Adaptar para iFood
            const adaptedContent = adaptContentForIFood(originalContent);
            
            // Escrever arquivo adaptado
            fs.writeFileSync(targetPath, adaptedContent);
            
            console.log(`✅ Criada página ${pageNum}`);
        } catch (error) {
            console.log(`❌ Erro ao criar página ${pageNum}:`, error.message);
        }
    } else {
        console.log(`⚠️ Página fonte ${pageNum} não encontrada`);
    }
});

console.log('\n✨ Processo concluído!');