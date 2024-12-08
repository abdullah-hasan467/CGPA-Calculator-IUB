// Function to calculate GPA and total earned credits
function calculateGPA() {
  const tableBody = document.getElementById("gpaTableBody");
  let totalCredits = 0;
  let weightedSum = 0;

  // Iterate through all the rows to calculate total credits and weighted sum
  for (const row of tableBody.rows) {
    const creditInput = row.querySelector("input[id^='creditID']");
    const gpaInput = row.querySelector("input[id^='gradeID']");

    const credit = parseFloat(creditInput.value) || 0;
    const gpa = parseFloat(gpaInput.value) || 0;

    totalCredits += credit;
    weightedSum += credit * gpa;
  }

  // Update total earned credits display
  document.getElementById("totalCredits").textContent = totalCredits;

  // Handle credit warning
  if (totalCredits > 18) {
    document.getElementById("warningMessage").style.display = "block"; // Show warning
  } else {
    document.getElementById("warningMessage").style.display = "none"; // Hide warning
  }

  // Calculate and display the GPA
  const result = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
  document.getElementById("showResult").textContent = result;
}

// Function to reset all rows and CGPA
function ResetAll() {
  // Clear the table body
  const tableBody = document.getElementById("gpaTableBody");
  tableBody.innerHTML = ""; // Removes all rows

  // Ensure at least one row is present after reset
  ensureMinimumRow();

  // Reset the calculated CGPA to 0.00
  document.getElementById("showResult").textContent = "0.00";
  
  // Reset total earned credits to 00
  document.getElementById("totalCredits").textContent = "00";

  // Hide the warning message
  document.getElementById("warningMessage").style.display = "none";

  // Recalculate GPA
  calculateGPA();
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
          placeholder="Summer 2024"
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
        id="creditID-${rowCount}"  // Dynamic ID for credit input
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
        id="gradeID-${rowCount}"  // Dynamic ID for GPA input
        oninput="calculateGPA()"
      />
    </td>
    <td class="text-center">
      <button onclick="deleteRow(this)" class="btn btn-warning">
        Delete
      </button>
    </td>
  `;

  tableBody.appendChild(row);

  // Recalculate GPA after adding a new row
  calculateGPA();
}

// Function to remove a semester row
function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const tableBody = document.getElementById("gpaTableBody");

    // Check if there is more than one row
    if (tableBody.rows.length > 1) {
        row.remove(); // Remove the row if there is more than one
        // Re-index the remaining rows
        reIndexRows();
    } else {
        alert("At least one Semester must remain!");
    }

    // Recalculate GPA after removing a row
    calculateGPA();
}

// Function to re-index the rows after adding or deleting
function reIndexRows() {
  const tableBody = document.getElementById("gpaTableBody");
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    rows[i].querySelector("th").textContent = i + 1; // Update row number
    rows[i].querySelector("input[type='number'][id^='creditID']").id = `creditID-${i + 1}`; // Update credit input ID
    rows[i].querySelector("input[type='number'][id^='gradeID']").id = `gradeID-${i + 1}`; // Update grade input ID
  }
}
