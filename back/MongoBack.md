# ✨ Restaurar MongoDB Atlas desde Docker

## **📝 Pasos para restaurar una base de datos en MongoDB Atlas usando Docker**

---

## **1. Copiar los archivos BSON al contenedor**
Ejecuta este comando en tu terminal para copiar los archivos de backup desde tu máquina local al contenedor de MongoDB en Docker: AQUI 8281f2819b67 es el ID de docker PS

```bash
docker cp MIFOLDER 8281f2819b67:/backup
```

**💡 Nota:** Reemplaza `8281f2819b67` con el **Container ID** obtenido de `docker ps`.

---

## **2. Acceder al contenedor de MongoDB**
Una vez copiados los archivos, entra al contenedor de MongoDB:

```bash
docker exec -it 8281f2819b67 bash
```

Ahora deberías ver un prompt similar a:
```bash
root@8281f2819b67:/#
```

---

## **3. Restaurar la base de datos en MongoDB Atlas**
Dentro del contenedor, ejecuta el siguiente comando:

```bash
mongorestore --uri "mongodb+srv://USER:PASS@cluster0.111111.mongodb.net/tu_basededatos" --drop /backup
```

### **📂 Explicación:**
- `--uri "mongodb+srv://..."` → URL de conexión a **MongoDB Atlas**.
- `--drop` → Borra las colecciones antes de restaurarlas (evita duplicados).
- `/backup` → Ruta donde copiamos los archivos BSON en el contenedor.

---

## **4. Verificar que los datos se restauraron**
Puedes revisar los datos restaurados en **MongoDB Atlas** o **Mongo Compass**.
También puedes ejecutar este comando dentro del contenedor para listar las colecciones restauradas:

```bash
mongosh "mongodb+srv://USER:PASS@cluster0.11111.mongodb.net/tu_basededatos" --eval "show collections"
```

Si ves tus colecciones en la lista, ¡todo está listo! 🚀🔥

---

## **🌟 Conclusión**
Siguiendo estos pasos, puedes restaurar una base de datos en **MongoDB Atlas** sin necesidad de instalar herramientas adicionales en tu máquina. Todo se ejecuta directamente dentro del contenedor de **MongoDB en Docker**. 😃

Si tienes algún problema, revisa los logs de MongoDB en el contenedor con:

```bash
docker logs 8281f2819b67
```

_______

## 🚀 Restaurar Base de Datos en MongoDB Local y Configurar Backend

### **1️⃣ Verificar que MongoDB está corriendo**
Antes de restaurar, asegúrate de que el servidor de MongoDB está funcionando:

```bash
sudo systemctl status mongod
```

Si no está activo, inícialo con:

```bash
sudo systemctl start mongod
```

---

### **2️⃣ Restaurar la base de datos desde el backup**
Usa `mongorestore` para importar los datos a tu MongoDB local. Asumiendo que la base de datos se llama **"leanguagesia"**, ejecuta:

```bash
mongorestore --db leanguagesia --drop backupsdb/test/
```

📌 **Explicación:**  
- `--db leanguagesia` → Nombre de la base de datos donde se restaurará el backup.  
- `--drop` → Borra los datos previos antes de restaurar (evita duplicados).  
- `backupsdb/test/` → Ruta donde están los archivos `.bson` y `.metadata.json`.  

---

### **3️⃣ Verificar que los datos se restauraron**
Abre el shell de MongoDB y revisa si las colecciones están en la base de datos:

```bash
mongosh
use leanguagesia
show collections
```

Si ves `lectures` y `words`, la restauración fue exitosa. 🚀  

También puedes hacer una consulta rápida:

```js
db.lectures.findOne()
db.words.findOne()
```

---

### **4️⃣ Configurar el Backend para usar MongoDB Local**

Edita el archivo `.env` en tu backend y cambia:

```env
MONGO_URL=mongodb+srv://mongoatlas:mongoatlas@cluster0.0nyyj.mongodb.net/tu_basededatos
```

Por:

```env
MONGO_URL=mongodb://localhost:27017/leanguagesia
```

Si el backend corre en otro servidor, usa la IP en lugar de `localhost`:

```env
MONGO_URL=mongodb://IP_DEL_SERVIDOR:27017/leanguagesia
```

Guarda los cambios.

---

### **5️⃣ Reiniciar la aplicación**
Si tu backend usa **Node.js**, reinícialo para que cargue el nuevo `.env`:

```bash
pm2 restart all  # Si usas PM2
# O si usas npm directamente:
npm run dev  # O el comando que inicie tu app
```

