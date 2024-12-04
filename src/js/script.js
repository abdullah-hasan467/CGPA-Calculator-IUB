// Function to calculate GPA
function calculateResult() {
  let totalCredits = 0;
  let weightedGPA = 0;

  const rows = document.querySelectorAll("#gpaTableBody tr");
  rows.forEach((row, index) => {
    const credit = parseFloat(row.querySelector(`#creditID-${index + 1}`).value) || 0;
    const grade = row.querySelector(`#gradeID-${index + 1}`).value;

    let gradePoint = 0;
    switch (grade) {
      case "A": gradePoint = 4.0; break;
      case "A-": gradePoint = 3.7; break;
      case "B+": gradePoint = 3.3; break;
      case "B": gradePoint = 3.0; break;
      case "B-": gradePoint = 2.7; break;
      case "C+": gradePoint = 2.3; break;
      case "C": gradePoint = 2.0; break;
      case "C-": gradePoint = 1.7; break;
      case "D+": gradePoint = 1.3; break;
      case "D": gradePoint = 1.0; break;
      case "F": gradePoint = 0.0; break;
      default: gradePoint = 0.0; break;
    }

    totalCredits += credit;
    weightedGPA += credit * gradePoint;
  });

  const calculatedGPA = totalCredits > 0 ? (weightedGPA / totalCredits).toFixed(2) : "0.00";
  document.getElementById("showResult").textContent = calculatedGPA;
}

// Function to calculate CGPA
function calculateCGPA() {
  let totalSemesters = 0;
  let cumulativeGPA = 0;

  const rows = document.querySelectorAll("#cgpaTableBody tr");
  rows.forEach((row, index) => {
    const gpa = parseFloat(row.querySelector(`#gpaID-${index + 1}`).value) || 0;

    totalSemesters += 1;
    cumulativeGPA += gpa;
  });

  const calculatedCGPA = totalSemesters > 0 ? (cumulativeGPA / totalSemesters).toFixed(2) : "0.00";
  document.getElementById("showResult").textContent = calculatedCGPA;
}

// Function to toggle between GPA and CGPA views
function hideGPA() {
  document.getElementById("gpa").classList.add("hidden");
  document.getElementById("cgpa").classList.remove("hidden");
  document.getElementById("GPAID").classList.remove("tab-active");
  document.getElementById("CGPAID").classList.add("tab-active");
}

function hideCGPA() {
  document.getElementById("cgpa").classList.add("hidden");
  document.getElementById("gpa").classList.remove("hidden");
  document.getElementById("CGPAID").classList.remove("tab-active");
  document.getElementById("GPAID").classList.add("tab-active");
}

// Add More Rows for CGPA Table
function addMoreRowCGPA() {
  const tableBody = document.getElementById("cgpaTableBody");
  const rowCount = tableBody.getElementsByTagName("tr").length + 1;

  const newRow = document.createElement("tr");
  newRow.classList.add("hover", "rounded-lg");
  newRow.innerHTML = `
    <th>${rowCount}</th>
    <td>
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Semester Name" />
        <span class="badge badge-info">Optional</span>
      </label>
    </td>
    <td>
      <input
        type="number"
        placeholder="GPA"
        class="input input-bordered input-primary w-full max-w-xs"
        max="4"
        min="0"
        id="gpaID-${rowCount}"
      />
    </td>
    <td class="text-center">
      <button onclick="deleteRowCGPA(this)" class="btn btn-warning">Delete</button>
    </td>
  `;
  tableBody.appendChild(newRow);
}

// Delete Row for CGPA Table
function deleteRowCGPA(button) {
  const tableBody = document.getElementById("cgpaTableBody");
  const rows = tableBody.getElementsByTagName("tr");

  if (rows.length > 1) {
    const row = button.parentElement.parentElement;
    row.remove();
  } else {
    alert("At least one row must remain in the table.");
  }
}
