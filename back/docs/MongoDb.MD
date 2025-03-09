
# Restauración de una Base de Datos MongoDB desde Docker

Este tutorial explica cómo restaurar una base de datos MongoDB desde un respaldo utilizando un contenedor Docker.

## Paso 1: Identificar el Contenedor de MongoDB

Primero, debes identificar el contenedor Docker donde MongoDB está en ejecución. Usa el siguiente comando para listar los contenedores:

```bash
docker ps
```

Busca el contenedor de MongoDB en la lista. Supongamos que su nombre es `mongodb`.

## Paso 2: Copiar el Respaldo al Contenedor

Para restaurar desde el respaldo, debes copiar los archivos al contenedor usando `docker cp`. 

Ejecuta el siguiente comando para copiar la carpeta de respaldo desde tu máquina local al contenedor:

```bash
docker cp /Users/alex/Documents/nova/leanguagesia/labs_nova/backupsdb  mongodb:/backupsdb 
```

Aquí:
- `/Users/alex/Documents/nova/leanguagesia/labs_nova/backupsdb` es la ruta local donde tienes el respaldo.
- `mongodb:/backupsdb` es la ubicación de destino dentro del contenedor.

## Paso 3: Restaurar la Base de Datos Dentro del Contenedor

1. Abre una terminal interactiva en el contenedor:

   ```bash
   docker exec -it mongodb bash
   ```

2. Dentro del contenedor, ejecuta `mongorestore` para restaurar los datos:

   ```bash
   mongorestore --db leanguagesia /backupsdb/leanguagesia
   ```

   - Reemplaza `nombre_db_destino` con el nombre que quieres para la base de datos restaurada.
   - `/backupsdb/leanguagesia` es la ubicación del respaldo dentro del contenedor.

3. Para verificar, usa el cliente `mongosh`:

   ```bash
   mongosh
   ```

   Luego, cambia a la base de datos y lista las colecciones para confirmar:

   ```javascript
   use leanguagesia
   show collections

   use leanguagesia

   db.words.countDocuments()
   ```

4. Finalmente, sal de `mongosh` y del contenedor:

   ```bash
   exit  # Salir de mongosh
   exit  # Salir del contenedor
   ```
