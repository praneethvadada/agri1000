let editTargetRow = null;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const tableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("search");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name && email) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="p-2 border name-cell">${name}</td>
        <td class="p-2 border email-cell">${email}</td>
        <td class="p-2 border space-x-2">
          <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editUser(this)">Edit</button>
          <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteRow(this)">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
      form.reset();
      updateUserCount();
    }
  });

  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
      const name = row.querySelector(".name-cell").textContent.toLowerCase();
      const email = row.querySelector(".email-cell").textContent.toLowerCase();
      row.style.display = (name.includes(keyword) || email.includes(keyword)) ? "" : "none";
    });
  });
});

function deleteRow(button) {
  button.closest("tr").remove();
  updateUserCount();
}

function updateUserCount() {
  const count = document.querySelectorAll("#userTableBody tr").length;
  document.getElementById("totalUsers").textContent = count;
}

function editUser(button) {
  editTargetRow = button.closest("tr");
  const name = editTargetRow.querySelector(".name-cell").textContent;
  const email = editTargetRow.querySelector(".email-cell").textContent;

  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = email;

  document.getElementById("editModal").classList.remove("hidden");
  document.getElementById("editModal").classList.add("flex");
}

function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
  document.getElementById("editModal").classList.remove("flex");
}

function saveEdit() {
  const newName = document.getElementById("editName").value.trim();
  const newEmail = document.getElementById("editEmail").value.trim();

  if (newName && newEmail && editTargetRow) {
    editTargetRow.querySelector(".name-cell").textContent = newName;
    editTargetRow.querySelector(".email-cell").textContent = newEmail;
    closeEditModal();
  }
}
