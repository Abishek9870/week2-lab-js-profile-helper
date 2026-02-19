// ==========================
// Week 2 Lab — Student Profile Helper
// ==========================

console.log('Week 2 lab loaded ✅');

// ==========================
// Part 2 — Console Skills
// ==========================

console.log('Log message');
console.info('Info message');
console.warn('Warning message');
console.error('Error message example');

const demo = [
  { name: 'Asha', country: 'Nepal', age: 20 },
  { name: 'Rafi', country: 'Bangladesh', age: 22 }
];

console.table(demo);

const ageValue = Number('not-a-number');
console.assert(Number.isFinite(ageValue), 'Age must be a number');

console.time('loop');
let total = 0;
for (let i = 0; i < 1000000; i++) total += i;
console.timeEnd('loop');
console.log('total =', total);


// ==========================
// Part 3 — Variables & Types
// ==========================

const moduleCode = 'CTEC3705';
const lesson = 'Week 2: JavaScript Foundations';
const isLab = true;
const room = 101;

console.log(typeof moduleCode);
console.log(typeof lesson);
console.log(typeof isLab);
console.log(typeof room);

let counter = 0;
counter++;
counter++;
counter++;
console.log('counter:', counter);

const pageTitle = document.querySelector('#pageTitle');
pageTitle.textContent = `${moduleCode} — ${lesson}`;


// ==========================
// Part 4 — DOM + Events
// ==========================

// Data model
const students = [];

// Select DOM elements
const nameInput = document.querySelector('#nameInput');
const countryInput = document.querySelector('#countryInput');
const ageInput = document.querySelector('#ageInput');
const skillsInput = document.querySelector('#skillsInput');

const addBtn = document.querySelector('#addBtn');
const clearBtn = document.querySelector('#clearBtn');
const showAllBtn = document.querySelector('#showAllBtn');
const filterBtn = document.querySelector('#filterBtn');
const randomBtn = document.querySelector('#randomBtn');
const avgBtn = document.querySelector('#avgBtn');
const resetBtn = document.querySelector('#resetBtn');

const formMsg = document.querySelector('#formMsg');
const summary = document.querySelector('#summary');


// ==========================
// Render Function
// ==========================

function renderStudentList(list) {

  const ul = document.querySelector('#studentList');
  ul.innerHTML = '';

  for (const student of list) {
    const li = document.createElement('li');

    li.textContent =
      `${student.name} (${student.country}) — age ${student.age} — skills: ${student.skills.join(', ')}`;

    ul.appendChild(li);
  }
}


// ==========================
// Add Student
// ==========================

addBtn.addEventListener('click', function () {

  const name = nameInput.value.trim();
  const country = countryInput.value;
  const age = Number(ageInput.value);

  const skillsArr = skillsInput.value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (name === '') {
    formMsg.textContent = 'Name cannot be empty.';
    return;
  }

  if (country === '') {
    formMsg.textContent = 'Please select a country.';
    return;
  }

  if (!Number.isFinite(age) || age < 0) {
    formMsg.textContent = 'Age must be a valid number ≥ 0.';
    return;
  }

  const student = {
    name,
    country,
    age,
    skills: skillsArr
  };

  students.push(student);

  // Ternary message
  const progressMessage =
    student.skills.length >= 3
      ? 'Good progress 💪'
      : 'Keep going 🚀';

  formMsg.textContent = `✅ Student added. ${progressMessage}`;


  renderStudentList(students);
});


// ==========================
// Clear Form
// ==========================

clearBtn.addEventListener('click', function () {
  nameInput.value = '';
  countryInput.value = '';
  ageInput.value = '';
  skillsInput.value = '';
  formMsg.textContent = 'Form cleared.';
});


// ==========================
// Show All
// ==========================

showAllBtn.addEventListener('click', function () {

  if (students.length === 0) {
    summary.textContent = 'No students to show.';
    return;
  }

  renderStudentList(students);
  summary.textContent = `Showing all ${students.length} students.`;
});


// ==========================
// Filter (Nepal / Bangladesh)
// ==========================

filterBtn.addEventListener('click', function () {

  const filtered = students.filter(student =>
    student.country === 'Nepal' ||
    student.country === 'Bangladesh'
  );

  renderStudentList(filtered);
  summary.textContent = `Filtered list (${filtered.length} students).`;
});


// ==========================
// Random Student + Switch
// ==========================

randomBtn.addEventListener('click', function () {

  if (students.length === 0) {
    summary.textContent = 'No students available.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * students.length);
  const student = students[randomIndex];

  let greeting;

  switch (student.country) {
    case 'Nepal':
      greeting = 'Namaste';
      break;
    case 'Bangladesh':
      greeting = 'Assalamu Alaikum';
      break;
    case 'Denmark':
      greeting = 'Hej';
      break;
    default:
      greeting = 'Hello';
  }

  summary.textContent =
    `${greeting}, ${student.name}! You are ${student.age} years old.`;
});


// ==========================
// Average Age
// ==========================

avgBtn.addEventListener('click', function () {

  if (students.length === 0) {
    summary.textContent = 'No students to calculate average.';
    return;
  }

  let totalAge = 0;

  for (const student of students) {
    totalAge += student.age;
  }

  const average = totalAge / students.length;

  summary.textContent =
    `Average age: ${average.toFixed(1)}`;
});


// ==========================
// Reset List
// ==========================

resetBtn.addEventListener('click', function () {

  if (students.length === 0) {
    summary.textContent = 'Nothing to reset.';
    return;
  }

  const confirmed = confirm('Are you sure you want to reset the list?');

  if (confirmed) {
    students.length = 0;
    renderStudentList(students);
    summary.textContent = 'Student list has been reset.';
  }
});
// ==========================
// Part 7 — Strings
// ==========================

// Task 7.1 — Skills cleanup demo
const messySkills = ' HTML, CSS, JS ,  ';

const cleanedSkills = messySkills
  .split(',')
  .map(s => s.trim())
  .filter(s => s.length > 0);

console.log('Cleaned skills:', cleanedSkills);


// Task 7.2 — Email includes check
const demoEmail = '  student@example.com  ';
const cleanedEmail = demoEmail.trim();

console.log('Valid email?', cleanedEmail.includes('@'));


// Task 7.3 — replace example
let message = 'Welcome to Week 2 Lab';
let updatedMessage = message.replace('Week 2', 'Advanced JavaScript');

console.log(updatedMessage);
// Task 9.2 — Map uppercase names
function showUppercaseNames() {

  const namesUpper = students.map(student =>
    student.name.toUpperCase()
  );

  console.table(namesUpper);
}
// Task 9.3 — forEach log
function logStudents() {

  students.forEach(student => {
    console.log(`${student.name} from ${student.country}`);
  });

}
// ==========================
// Part 10 — Objects
// ==========================

// Task 10.1 — Bracket notation demo
const demoStudent = {
  name: 'Test',
  country: 'Denmark',
  age: 25
};

demoStudent['full name'] = demoStudent.name;
console.log(demoStudent);


// Task 10.2 — for...in loop
const demoObject = {
  a: 1,
  b: 2,
  c: 3
};

for (const key in demoObject) {
  console.log(key, demoObject[key]);
}
