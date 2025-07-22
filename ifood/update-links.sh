#!/bin/bash

# Lista de arquivos para atualizar
FILES=$(find . -name "index.html" | sort)

# Loop por cada arquivo
for file in $FILES; do
  echo "Atualizando $file..."
  
  # Substitui links do tipo ../X/index.html por /X/
  sed -i '' 's|\.\.\/\([0-9]\+\(-[0-9]\+\)*\)\/index\.html|\/\1\/|g' "$file"
  sed -i '' 's|\.\.\/\([0-9]\+\(-[0-9]\+\)*\)\/|\/\1\/|g' "$file"
  
  echo "Concluído: $file"
done

echo "Todos os links foram atualizados!" 