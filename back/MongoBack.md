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

¡Éxito con la restauración! 🎯