#!/bin/bash

# Configuración
FRONTEND_DIR="/root/novalabs/leanguagesia/front"
BUILD_DIR="$FRONTEND_DIR/dist"
DEPLOY_DIR="/var/www/languages-ai"

echo "🚀 Iniciando despliegue del frontend..."

# 1️⃣ Entrar al directorio del frontend
cd $FRONTEND_DIR || { echo "❌ No se pudo acceder al directorio del frontend"; exit 1; }

# 2️⃣ Instalar dependencias
echo "📦 Instalando dependencias..."
yarn install --silent || { echo "❌ Error al instalar dependencias"; exit 1; }

# 3️⃣ Construir el proyecto
echo "⚙️  Generando nueva versión..."
yarn build || { echo "❌ Error al construir el frontend"; exit 1; }

# 4️⃣ Eliminar archivos anteriores
echo "🗑️  Eliminando versión anterior..."
rm -rf $DEPLOY_DIR/*

# 5️⃣ Copiar nuevos archivos al directorio de producción
echo "📂 Copiando nueva versión..."
cp -r $BUILD_DIR/* $DEPLOY_DIR/

# 6️⃣ Ajustar permisos
echo "🔧 Ajustando permisos..."
chown -R www-data:www-data $DEPLOY_DIR
chmod -R 755 $DEPLOY_DIR

# 7️⃣ Reiniciar Nginx
echo "🔄 Reiniciando Nginx..."
systemctl reload nginx

echo "✅ Despliegue completado con éxito 🚀"
