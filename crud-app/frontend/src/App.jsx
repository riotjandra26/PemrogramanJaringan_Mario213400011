import { useState } from 'react';
import './App.css';

function App() {
  // State untuk menyimpan input data
  const [mataKuliah, setMataKuliah] = useState('');
  const [namaDosen, setNamaDosen] = useState('');
  const [hari, setHari] = useState('');
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // State untuk tracking index data yang sedang diedit

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Jika editIndex ada, berarti kita sedang mengedit data
    if (editIndex !== null) {
      const updatedData = data.map((item, index) =>
        index === editIndex
          ? { mataKuliah, namaDosen, hari }
          : item
      );
      setData(updatedData);
      setEditIndex(null); // Reset index setelah edit
    } else {
      // Menambahkan data yang diinput ke dalam array data
      setData([...data, { mataKuliah, namaDosen, hari }]);
    }

    // Reset form
    setMataKuliah('');
    setNamaDosen('');
    setHari('');
  };

  // Fungsi untuk menghapus data berdasarkan index
  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  // Fungsi untuk mengedit data berdasarkan index
  const handleEdit = (index) => {
    const itemToEdit = data[index];
    setMataKuliah(itemToEdit.mataKuliah);
    setNamaDosen(itemToEdit.namaDosen);
    setHari(itemToEdit.hari);
    setEditIndex(index); // Menyimpan index yang sedang diedit
  };

  return (
    <>
      <div className="container">
        <h1>Input Mata Kuliah</h1>

        {/* Form input */}
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

        {/* Tabel untuk menampilkan data */}
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
    </>
  );
}

export default App;
