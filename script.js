let contacts = [];
let editIndex = -1;
let sortAscending = true; // true = A-Z, false = Z-A

window.onload = function () {
  if (localStorage.getItem("contacts")) {
    contacts = JSON.parse(localStorage.getItem("contacts"));
    tampilData();
  }
};

function tambahData() {
  let nama = document.getElementById("nama").value;
  let telepon = document.getElementById("telepon").value;

  if (nama === "" || telepon === "") {
    alert("Data tidak boleh kosong!");
    return;
  }

  if (editIndex === -1) {
    contacts.push({ nama: nama, telepon: telepon });
  } else {
    contacts[editIndex] = { nama: nama, telepon: telepon };
    editIndex = -1;
  }

  sortContacts();

  localStorage.setItem("contacts", JSON.stringify(contacts));
  tampilData();
  resetForm();
}

function tampilData() {
  let table = document.getElementById("dataTable");
  table.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    table.innerHTML += `
      <tr>
        <td>${contacts[i].nama}</td>
        <td>${contacts[i].telepon}</td>
        <td>
          <button onclick="editData(${i})">Edit</button>
          <button onclick="hapusData(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
}

function editData(index) {
  document.getElementById("nama").value = contacts[index].nama;
  document.getElementById("telepon").value = contacts[index].telepon;
  editIndex = index;
}

function hapusData(index) {
  if (confirm("Yakin mau hapus data ini?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    tampilData();
  }
}

function resetForm() {
  document.getElementById("nama").value = "";
  document.getElementById("telepon").value = "";
  editIndex = -1;
}

function sortContacts() {
  contacts.sort(function (a, b) {
    if (sortAscending) {
      return a.nama.localeCompare(b.nama);
    } else {
      return b.nama.localeCompare(a.nama);
    }
  });
}

function toggleSort() {
  sortAscending = !sortAscending;

  sortContacts();
  localStorage.setItem("contacts", JSON.stringify(contacts));
  tampilData();

  document.getElementById("sortBtn").innerText = sortAscending ? "⬆️" : "⬇️";
}
