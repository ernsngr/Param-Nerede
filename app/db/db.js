import * as SQLite from "expo-sqlite";

let db;

/**
 * Veritabanını başlatır, tabloları oluşturur ve hazır kategorileri ekler
 */
export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("paramnede.db");

    // tabloları oluştur
    await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category_id INTEGER,
        note TEXT,
        date TEXT NOT NULL,
        FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL
      );
    `);

    // hazır kategoriler (ilk açılışta eklenir, tekrar eklenmez)
    const defaultCategories = [
      "Yemek",
      "Ulaşım",
      "Market",
      "Eğlence",
      "Faturalar",
      "Sağlık"
    ];

    for (const name of defaultCategories) {
      await db.runAsync(
        "INSERT OR IGNORE INTO categories (name) VALUES (?);",
        [name]
      );
    }
  }
  return db;
};

// kategori ekle (manuel ekleme için)
export const addCategory = async (name) => {
  const result = await db.runAsync(
    "INSERT OR IGNORE INTO categories (name) VALUES (?);",
    [name]
  );
  return result.lastInsertRowId;
};

// kategorileri getir
export const getCategories = async () => {
  return await db.getAllAsync("SELECT * FROM categories ORDER BY name;");
};

// işlem ekle
export const addTransaction = async (payload) => {
  const { amount, categoryId = null, note = "", date = new Date() } = payload;
  const iso = new Date(date).toISOString();

  const result = await db.runAsync(
    "INSERT INTO transactions (amount, category_id, note, date) VALUES (?, ?, ?, ?);",
    [amount, categoryId, note, iso]
  );
  return result.lastInsertRowId;
};

// işlemleri getir
export const getTransactions = async ({
  limit = 200,
  offset = 0,
  startDate,
  endDate,
} = {}) => {
  let sql = `SELECT t.id, t.amount, t.note, t.date, t.category_id, c.name as category_name
             FROM transactions t LEFT JOIN categories c ON t.category_id = c.id`;
  const params = [];
  const where = [];

  if (startDate) {
    where.push("date >= ?");
    params.push(startDate);
  }
  if (endDate) {
    where.push("date <= ?");
    params.push(endDate);
  }

  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY date DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  return await db.getAllAsync(sql, params);
};

// işlem güncelle
export const updateTransaction = async ({
  id,
  amount,
  categoryId = null,
  note = "",
  date = new Date(),
}) => {
  const iso = new Date(date).toISOString();
  const result = await db.runAsync(
    "UPDATE transactions SET amount = ?, category_id = ?, note = ?, date = ? WHERE id = ?;",
    [amount, categoryId, note, iso, id]
  );
  return result.changes;
};

// işlem sil
export const deleteTransaction = async (id) => {
  const result = await db.runAsync(
    "DELETE FROM transactions WHERE id = ?;",
    [id]
  );
  return result.changes;
};

// günlük toplam
export const getDailyTotal = async (
  date = new Date().toISOString().slice(0, 10)
) => {
  const row = await db.getFirstAsync(
    "SELECT COALESCE(SUM(amount),0) AS total FROM transactions WHERE substr(date,1,10) = ?;",
    [date]
  );
  return row.total;
};

// aylık toplam
export const getMonthlyTotal = async (
  yearMonth = new Date().toISOString().slice(0, 7)
) => {
  const row = await db.getFirstAsync(
    "SELECT COALESCE(SUM(amount),0) AS total FROM transactions WHERE substr(date,1,7) = ?;",
    [yearMonth]
  );
  return row.total;
};

// kategori bazlı toplamlar
export const getCategoryTotals = async () => {
  return await db.getAllAsync(`
    SELECT c.id, c.name, COALESCE(SUM(t.amount),0) AS total
    FROM categories c
    LEFT JOIN transactions t ON c.id = t.category_id
    GROUP BY c.id ORDER BY total DESC;
  `);
};
