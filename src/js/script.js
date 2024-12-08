function calculateResult() {
    const tableBody = document.getElementById("gpaTableBody");
    const rows = tableBody.getElementsByTagName("tr");

    let totalCreditHours = 0;
    let weightedGradePoints = 0;

    const gradePointsMap = {
        "A": 4.00,
        "A-": 3.70,
        "B+": 3.30,
        "B": 3.00,
        "B-": 2.70,
        "C+": 2.30,
        "C": 2.00,
        "C-": 1.70,
        "D+": 1.30,
        "D": 1.00,
        "F": 0.00,
    };

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const creditInput = row.querySelector(`#creditID-${i + 1}`);
        const gradeSelect = row.querySelector(`#gradeID-${i + 1}`);

        const creditHours = parseFloat(creditInput?.value || 0);
        const grade = gradeSelect?.value;

        if (creditHours > 0 && grade in gradePointsMap) {
            totalCreditHours += creditHours;
            weightedGradePoints += gradePointsMap[grade] * creditHours;
        }
    }

    const gpa =
        totalCreditHours > 0
            ? (weightedGradePoints / totalCreditHours).toFixed(2)
            : "N/A";
    const resultElement = document.getElementById("showResult");
    resultElement.textContent = gpa;

    // Update total credits
    const totalCreditsElement = document.getElementById("totalCredits");
    totalCreditsElement.textContent = totalCreditHours;

    // Show warning if total credits exceed 18
    const warningMessage = document.getElementById("warningMessage");
    if (totalCreditHours > 18) {
        warningMessage.style.display = "block"; // Show warning
    } else {
        warningMessage.style.display = "none"; // Hide warning
    }
}

function addMoreRow() {
    const tableBody = document.getElementById("gpaTableBody");
    const rowCount = tableBody.getElementsByTagName("tr").length + 1; // Ensure proper indexing
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <th>${rowCount}</th>
        <td>
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="Course Name" />
                <span class="badge badge-info">Optional</span>
            </label>
        </td>
        <td>
            <input
                type="number"
                placeholder="Credit"
                class="input input-bordered input-primary w-full max-w-xs"
                max="3"
                min="1"
                id="creditID-${rowCount}" 
                oninput="calculateResult()" />
        </td>
        <td>
            <label class="form-control w-full max-w-xs">
                <select class="select select-bordered" id="gradeID-${rowCount}" onchange="calculateResult()">
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
        </td>
        <td class="text-center">
            <button onclick="deleteRow(this)" class="btn btn-warning">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
    calculateResult(); // Recalculate when a new row is added
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    const tableBody = document.getElementById("gpaTableBody");

    if (tableBody.rows.length > 1) {
        row.remove(); // Remove the row
    } else {
        alert("At least one Course must remain!");
    }

    // Re-index remaining rows
    const rows = tableBody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].querySelector("th").textContent = i + 1; // Update row number
        rows[i].querySelector("input[type='number']").id = `creditID-${i + 1}`; // Update credit input ID
        rows[i].querySelector("select").id = `gradeID-${i + 1}`; // Update grade select ID
    }

    calculateResult(); // Recalculate after row deletion
}
