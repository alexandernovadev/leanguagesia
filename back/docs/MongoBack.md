## 🚀 Make backup

```bash
mongodump --db leanguagesia --out ~/novalabs/leanguagesia/labs_nova/backupsdb/leanguagesia/
```

___

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
mongorestore --db leanguagesia --drop /root/novalabs/labs_nova/backupsdb/leanguagesia/
```

📌 **Explicación:**  
- `--db leanguagesia` → Nombre de la base de datos donde se restaurará el backup.  
- `--drop` → Borra los datos previos antes de restaurar (evita duplicados).  
- ` /root/novalabs/labs_nova/backupsdb/leanguagesia/` → Ruta donde están los archivos `.bson` y `.metadata.json`.  

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
mongorestore --uri "mongodb+srv://USER:PASS@cluster0.111111.mongodb.net/tu_basededatos"
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

