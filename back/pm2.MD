
1. Instalar PM2 (Para gestionar el proceso de Node.js)

```
npm install -g pm2
```

2. Correr con PM2

```
pm2 start ts-node --name languages-ai-back -- src/main.ts
```

## PM2 - Comandos esenciales

### Ver todos los procesos en PM2
```sh
pm2 list
```

### Ver detalles de un proceso específico
```sh
pm2 show languages-ai-back
```

### Ver logs en tiempo real
```sh
pm2 logs languages-ai-back
```

### Detener un proceso en PM2
```sh
pm2 stop languages-ai-back
```

### Eliminar un proceso en PM2
```sh
pm2 delete languages-ai-back
```

### Eliminar todos los procesos en PM2
```sh
pm2 delete all
```

### Reiniciar un proceso en PM2
```sh
pm2 restart languages-ai-back
```

### Guardar el estado de los procesos para que se ejecuten al reiniciar el servidor
```sh
pm2 save
```

### Hacer que PM2 se inicie automáticamente al reiniciar el servidor
```sh
pm2 startup
```