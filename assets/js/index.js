const students = [
    { name: "Pandu", age: 21, grade: 8.5, address: "Hyderabad", gender: "M" },
    { name: "Siri", age: 22, grade: 9.1, address: "Bangalore", gender: "F" },
    { name: "Rahul", age: 23, grade: 7.8, address: "Hyderabad", gender: "M" },
    { name: "Meera", age: 20, grade: 8.2, address: "Bangalore", gender: "F" },
    { name: "Teja", age: 24, grade: 6.9, address: "Hyderabad", gender: "M" },
    { name: "Latha", age: 19, grade: 9.0, address: "Bangalore", gender: "F" },
    { name: "Kiran", age: 22, grade: 7.5, address: "Hyderabad", gender: "M" },
    { name: "Divya", age: 21, grade: 8.8, address: "Bangalore", gender: "F" },
    { name: "Arjun", age: 25, grade: 7.2, address: "Hyderabad", gender: "M" },
    { name: "Neha", age: 20, grade: 8.9, address: "Bangalore", gender: "F" },
    { name: "Suman", age: 23, grade: 7.0, address: "Hyderabad", gender: "M" },
    { name: "Priya", age: 22, grade: 9.3, address: "Bangalore", gender: "F" },
];
const tbody = document.getElementById("tbody");
const searchBox = document.getElementById("search");
const genderBox = document.getElementById("gender");
const sortBox = document.getElementById("sort");
const rowsBox = document.getElementById("rowsPerPage");
let rowsToShow = 10;
function showTable() {
    tbody.innerHTML = "";
    let result = students.slice();
    const searchText = searchBox.value.trim().toLowerCase();
    if (searchText !== "") {
        const temp = [];
        const searchNum = parseFloat(searchText);
        for (const student of result) {
            const nameMatch = student.name.toLowerCase().includes(searchText);
            const cityMatch = student.address.toLowerCase().includes(searchText);
            const gradeMatch = !isNaN(searchNum) && Math.abs(student.grade - searchNum) < 0.01;
            if (nameMatch || cityMatch || gradeMatch) {
                temp.push(student);
            }
        }
        result = temp;
    }
    if (genderBox.value === "M" || genderBox.value === "F") {
        const selectedGender = genderBox.value;
        const temp = [];
        for (const student of result) {
            if (student.gender === selectedGender) {
                temp.push(student);
            }
        }
        result = temp;
    }
    if (sortBox.value === "low") {
        result.sort((a, b) => a.grade - b.grade);
    }
    else if (sortBox.value === "high") {
        result.sort((a, b) => b.grade - a.grade);
    }
    const limit = rowsToShow === 50 ? result.length : rowsToShow;
    const finalList = [];
    for (const student of result) {
        if (finalList.length < limit) {
            finalList.push(student);
        }
        else {
            break;
        }
    }
    if (finalList.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td colspan="5" style="text-align:center; color:red; padding:30px;">
        No student found
      </td>`;
        tbody.appendChild(row);
    }
    else {
        for (const s of finalList) {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${s.name}</td>
        <td>${s.age}</td>
        <td>${s.grade}</td>
        <td>${s.address}</td>
        <td>${s.gender === "M" ? "Male" : "Female"}</td>
      `;
            tbody.appendChild(row);
        }
    }
}
searchBox.addEventListener("input", showTable);
genderBox.addEventListener("change", showTable);
sortBox.addEventListener("change", showTable);
rowsBox.addEventListener("change", () => {
    rowsToShow = Number(rowsBox.value) || 10;
    showTable();
});
showTable();
export {};
//# sourceMappingURL=index.js.map