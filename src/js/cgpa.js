// Ensure at least one row remains
function ensureMinimumRow() {
  const tableBody = document.getElementById("gpaTableBody");
  if (tableBody.rows.length === 0) {
    addNewSemesterRow();
  }
}

// Function to add a new semester row
function addNewSemesterRow() {
  const tableBody = document.getElementById("gpaTableBody");
  const rowCount = tableBody.rows.length + 1;

  const row = document.createElement("tr");
  row.classList.add("hover", "rounded-lg");

  row.innerHTML = `
    <th>${rowCount}</th>
    <td>
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="text"
          class="grow"
          placeholder="Semester Name"
        />
        <span class="badge badge-info">Optional</span>
      </label>
    </td>
    <td>
      <input
        type="number"
        placeholder="Earned Credit"
        class="input input-bordered input-primary w-full max-w-xs"
        min="1"
        oninput="calculateGPA()"
      />
    </td>
    <td>
      <input
        type="number"
        placeholder="GPA"
        class="input input-bordered input-primary w-full max-w-xs"
        max="4"
        min="0"
        oninput="calculateGPA()"
      />
    </td>
    <td class="text-center">
      <button onclick="removeSemesterRow(this)" class="btn btn-warning">
        Delete
      </button>
    </td>
  `;

  tableBody.appendChild(row);
}

// Function to remove a semester row
function removeSemesterRow(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  ensureMinimumRow();
  calculateGPA();
}

// Function to calculate GPA
function calculateGPA() {
  const tableBody = document.getElementById("gpaTableBody");
  let totalCredits = 0;
  let weightedSum = 0;

  for (const row of tableBody.rows) {
    const creditInput = row.cells[2].querySelector("input");
    const gpaInput = row.cells[3].querySelector("input");

    const credit = parseFloat(creditInput.value) || 0;
    const gpa = parseFloat(gpaInput.value) || 0;

    totalCredits += credit;
    weightedSum += credit * gpa;
  }

  const result = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
  document.getElementById("showResult").textContent = result;
}

// Initial setup: Ensure one row is always present
document.addEventListener("DOMContentLoaded", () => {
  ensureMinimumRow();
});
