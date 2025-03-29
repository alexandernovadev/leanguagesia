# MongoDB Database Restoration Using Docker

This guide provides a detailed step-by-step process for restoring a MongoDB database backup using a Docker container.

---

## Prerequisites: Ensure MongoDB Server is Running (Server-Side)
Before proceeding with the restoration, make sure the MongoDB server is running on your server machine:

```bash
sudo systemctl status mongod
```

If MongoDB is not active, start it with:

```bash
sudo systemctl start mongod
```

---

## 🟢 Creating a Database Backup (Server-Side)
To create a backup of the database on your server, use the `mongodump` command:

```bash
mongodump --db leanguagesia --out ~/novalabs/leanguagesia/labs_nova/backupsdb/leanguagesia/
```

This command backs up the database `leanguagesia` to the specified directory.

---

## Step 1: Identify the MongoDB Docker Container (Local Environment)
Before restoring the database, identify the MongoDB container name using the following command:

```bash
docker ps
```

Locate the container running MongoDB, referred to as `mongodb` in this guide.

---

## Step 2: Transfer Backup Files to the Docker Container (Local Environment)
Copy the backup files from your local environment to the Docker container using:

```bash
docker cp labs_nova/backupsdb/leanguagesia mongodb:/backupsdb
```

Explanation:
- `labs_nova/backupsdb/leanguagesia`: Local backup directory.
- `mongodb:/backupsdb`: Destination directory inside the container.

✅ If a backup already exists, consider removing the old one first:

```bash
docker exec -it mongodb bash -c "rm -rf /backupsdb/leanguagesia"
```

---

## Step 3: Restore the Database Inside the Docker Container (Local Environment)
1. Access the MongoDB container:

```bash
docker exec -it mongodb bash
```

2. Restore the database using `mongorestore`:

```bash
mongorestore --db leanguagesia /backupsdb/leanguagesia
```

This command restores the database from the specified backup folder.

3. Verify the restoration using `mongosh`:

```bash
mongosh
```

Then, switch to the database and check the collections:

```javascript
use leanguagesia
show collections
db.words.countDocuments()
```

4. Exit the MongoDB shell and container:

```bash
exit  # Exit mongosh
exit  # Exit container
```

---

## 🎉 Restoration Complete!
Your MongoDB database has been successfully restored using Docker. Repeat these steps as needed, ensuring no data is overwritten unintentionally.

