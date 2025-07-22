#!/bin/bash

# Lista de arquivos para atualizar
FILES=$(find ./ifood -name "index.html" | sort)

# Loop por cada arquivo
for file in $FILES; do
  echo "Atualizando $file..."
  
  # Substitui links do tipo /X/ por /ifood/X/
  sed -i '' 's|window\.location\.href = buildUrlWithParams('\''\/\([0-9]\+\(-[0-9]\+\)*\)\/'\'')|window.location.href = buildUrlWithParams('\''/ifood/\1/'\'')|g' "$file"
  sed -i '' 's|url = new URL('\''\/\([0-9]\+\(-[0-9]\+\)*\)\/'\''|url = new URL('\''/ifood/\1/'\''|g' "$file"
  sed -i '' 's|onclick="window.location.href = buildUrlWithParams('\''\/\([0-9]\+\(-[0-9]\+\)*\)\/'\'')|onclick="window.location.href = buildUrlWithParams('\''/ifood/\1/'\'')|g' "$file"
  
  echo "Concluído: $file"
done

echo "Todos os links foram atualizados!" 