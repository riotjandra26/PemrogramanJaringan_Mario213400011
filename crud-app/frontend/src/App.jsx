import { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [mataKuliah, setMataKuliah] = useState('');
  const [namaDosen, setNamaDosen] = useState('');
  const [hari, setHari] = useState('');
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fungsi untuk mengambil data dari backend
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/matakuliah');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Edit data (belum ditambahkan pada backend)
      const updatedData = data.map((item, index) =>
        index === editIndex ? { mataKuliah, namaDosen, hari } : item
      );
      setData(updatedData);
      setEditIndex(null);
    } else {
      // Tambahkan data baru ke backend
      try {
        await axios.post('http://localhost:5000/matakuliah', {
          mataKuliah,
          namaDosen,
          hari,
        }
      );
        fetchData(); // Refresh data setelah menambahkan
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }

    setMataKuliah('');
    setNamaDosen('');
    setHari('');
  };

  // Fungsi untuk menghapus data
  const handleDelete = async (index) => {
    const id = data[index].id;
    console.log(id)
    try {
      await axios.delete(`http://localhost:5000/matakuliah/${id}`);
      fetchData(); // Refresh data setelah menghapus
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (index) => {
    const itemToEdit = data[index];
    setMataKuliah(itemToEdit.mataKuliah);
    setNamaDosen(itemToEdit.namaDosen);
    setHari(itemToEdit.hari);
    setEditIndex(index);
  };


  return (
    <div className="container">
      <h1>Input Mata Kuliah</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mataKuliah">Mata Kuliah: </label>
          <input
            type="text"
            id="mataKuliah"
            value={mataKuliah}
            onChange={(e) => setMataKuliah(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="namaDosen">Nama Dosen: </label>
          <input
            type="text"
            id="namaDosen"
            value={namaDosen}
            onChange={(e) => setNamaDosen(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="hari">Hari: </label>
          <input
            type="text"
            id="hari"
            value={hari}
            onChange={(e) => setHari(e.target.value)}
            required
          />
        </div>

        <button type="submit">{editIndex !== null ? 'Update' : 'Tambahkan'}</button>
      </form>

      <h2>Daftar Mata Kuliah</h2>
      <table>
        <thead>
          <tr>
            <th>Mata Kuliah</th>
            <th>Nama Dosen</th>
            <th>Hari</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.mataKuliah}</td>
              <td>{item.namaDosen}</td>
              <td>{item.hari}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
