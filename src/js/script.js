let rowCount = 1;  // Keep track of the number of rows

// Function to add a new row
function addMoreRow() {
  rowCount++;
  const tableBody = document.querySelector("#gpaTableBody");

  // Create a new row
  const newRow = document.createElement("tr");
  newRow.classList.add("hover");

  newRow.innerHTML = `
    <th>${rowCount}</th>
    <td>
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Course Name" />
        <span class="badge badge-info">Optional</span>
      </label>
    </td>
    <td>
      <input type="number" placeholder="Credit" class="input input-bordered input-primary w-full max-w-xs" max="3" min="1" id="creditID-${rowCount}" />
    </td>
    <td class="mt-5">
      <div class="flex items-center">
        <label class="form-control w-full max-w-xs">
          <select class="select select-bordered" id="gradeID-${rowCount}">
            <option disabled selected>Grade</option>
            <option>A</option>
            <option>A-</option>
            <option>B+</option>
            <option>B</option>
            <option>B-</option>
            <option>C+</option>
            <option>C</option>
            <option>C-</option>
            <option>D+</option>
            <option>D</option>
            <option>F</option>
          </select>
        </label>
      </div>
    </td>
    <td class="text-center">
      <button onclick="deleteRow(this)" class="btn btn-warning">Delete</button>
    </td>
  `;

  // Append the new row to the table body
  tableBody.appendChild(newRow);
}

// Function to delete a specific row
function deleteRow(button) {
  const rows = document.querySelectorAll("#gpaTableBody tr");
  
  // Check if there is only 1 row remaining
  if (rows.length === 1) {
    // Display an alert if the last row is being deleted
    alert("You cannot delete the last row.");
    return;  // Prevent deletion if it's the last row
  }

  const row = button.closest("tr"); // Get the closest row
  row.remove(); // Remove that row
  rowCount--; // Adjust the row count
  updateRowSerials(); // Update the serial numbers
}

// Function to update serial numbers after a row is deleted
function updateRowSerials() {
  const rows = document.querySelectorAll("#gpaTableBody tr");
  rows.forEach((row, index) => {
    row.querySelector("th").textContent = index + 1; // Update serial number
  });
}

// Placeholder for the GPA calculation function



const   getID =(htmlID)=>{
const innerID = document.getElementById(htmlID);
return innerID;


}




function hideCGPA(){
const cgpaId =  getID (CGPAID);
const gpaID = getId (GPAID);
const flexGPA = getId(gpa);
const flexCGPA = getId (cgpa);



}