const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Username MySQL default di XAMPP adalah 'root'
  password: '',      // Password default biasanya kosong di XAMPP
  database: 'crud_db' // Ganti dengan nama database Anda
});

// Cek koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route: Test koneksi
app.get('/', (req, res) => {
  res.send('Hello, MySQL is connected!');
});

// Route: Ambil semua data mata kuliah
app.get('/matakuliah', (req, res) => {
  const query = 'SELECT * FROM mata_kuliah';
  const data = db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    res.json({
      message : "Berhasil mendapat data",
      data : results
    });
  });
});

// Route: Tambah data mata kuliah baru
app.post('/matakuliah', (req, res) => {
  const { mataKuliah, namaDosen, hari } = req.body;
  const query = 'INSERT INTO mata_kuliah (mataKuliah, namaDosen, hari) VALUES (?, ?, ?)';
  db.query(query, [mataKuliah, namaDosen, hari], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send('Data berhasil ditambahkan');
  });
});

// Route: Hapus data berdasarkan ID
app.delete('/matakuliah/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM mata_kuliah WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
      return;
    }
    res.send('Data berhasil dihapus');
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
