//inputs
let name_sanf = document.getElementById("name_sanf");
let nowh_sanf = document.getElementById("nowh_sanf");
let wehdet_sanf = document.getElementById("wehdet_sanf");
let camia_sanf = document.getElementById("camia_sanf");
let date_sanf = document.getElementById("date_sanf");
let serch_sanf = document.getElementById("serch_sanf");

//buttons
let button_adaft_sanf = document.getElementById("button_adaft_sanf");
let button_name_sanf = document.getElementById("button_serch_name_sanf");
let button_serch_nowh_sanf = document.getElementById("button_serch_nowh_sanf");

let currentIndex = null;

//save localstordg
let allData;
if (localStorage.product != null) {
  allData = JSON.parse(localStorage.product);
} else {
  allData = [];
}

//cryat sanf3

button_adaft_sanf.onclick = function () {
  //To ensure that the data is not empty
  if (
    name_sanf.value.trim() === "" ||
    nowh_sanf.value.trim() === "" ||
    wehdet_sanf.value.trim() === "" ||
    camia_sanf.value.trim() === "" ||
    date_sanf.value.trim() === ""
  ) {
    alert("يرجى ملء جميع الحقول قبل إضافة الصنف");
    return;
  }
  if (currentIndex === null) {
    let currentIndex = null;

    let newPro = {
      name: name_sanf.value,
      nwoh: nowh_sanf.value,
      allwhda: wehdet_sanf.value,
      alCmia: camia_sanf.value,
      date: date_sanf.value,
    };
    allData.push(newPro);
  } else {
    allData[currentIndex] = {
      name: name_sanf.value,
      nwoh: nowh_sanf.value,
      allwhda: wehdet_sanf.value,
      alCmia: camia_sanf.value,
      date: date_sanf.value,
    };
    currentIndex = null;
    button_adaft_sanf.innerText = "إضافة صنف";
  }

  localStorage.setItem("product", JSON.stringify(allData));
  showData();
  clearInputs();
};

// clear inputs
function clearInputs() {
  name_sanf.value = "";
  nowh_sanf.value = "";
  wehdet_sanf.value = "";
  camia_sanf.value = "";
  date_sanf.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < allData.length; i++) {
    table += `
<tr id="tr-${i}">
            <td>${i + 1}</td>
            <td>${allData[i].name}</td>
            <td>${allData[i].nwoh}</td>
            <td>${allData[i].allwhda}</td>
            <td>${allData[i].alCmia}</td>
            <td>${allData[i].date}</td>
            <td><button id="update" onclick="updateSanf(${i})">تحديث</button> <button onclick="deleteData(${i})" id="delete">حذف</button></td>

</tr>
        
        `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (allData.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="DeleteAll()"> حذف الكل</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
  clearInputs();
}

// delete

function deleteData(i) {
  let tr = document.getElementById(`tr-${i}`);
  tr.style.backgroundColor = "#d6d6d636";
  let tds = tr.querySelectorAll("td");
  tds.forEach((td) => {
    td.style.color = "#99999900";
  });

  setTimeout(() => {
    allData.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(allData));
    showData();
  }, 100);
}

function DeleteAll() {
  localStorage.clear();
  allData.splice(0);
  showData();
}

//update

function updateSanf(i) {
  currentIndex = i;

  name_sanf.value = allData[i].name;
  nowh_sanf.value = allData[i].nwoh;
  wehdet_sanf.value = allData[i].allwhda;
  camia_sanf.value = allData[i].alCmia;
  date_sanf.value = allData[i].date;

  button_adaft_sanf.innerText = "حفظ التعديلات";
}

showData();

//read
//cunt
//search
// البحث عن طريق النوع
// البحث عن طريق الاسم
button_name_sanf.onclick = function () {
  let searchValue = serch_sanf.value.trim().toLowerCase();

  if (searchValue === "") {
    showData(); // إذا كان مربع البحث فارغًا، يتم عرض جميع البيانات
    return;
  }

  let filteredData = allData.filter((item) =>
    item.name.toLowerCase().includes(searchValue)
  );

  displaySearchResults(filteredData);

  // مسح قيمة البحث بعد الضغط
  serch_sanf.value = "";
};

// البحث عن طريق النوع
button_serch_nowh_sanf.onclick = function () {
  let searchValue = serch_sanf.value.trim().toLowerCase();

  if (searchValue === "") {
    showData(); // إذا كان مربع البحث فارغًا، يتم عرض جميع البيانات
    return;
  }

  let filteredData = allData.filter((item) =>
    item.nwoh.toLowerCase().includes(searchValue)
  );

  displaySearchResults(filteredData);

  // مسح قيمة البحث بعد الضغط
  serch_sanf.value = "";
};

// دالة عرض نتائج البحث
function displaySearchResults(filteredData) {
  let table = "";

  if (filteredData.length === 0) {
    table = `<tr><td colspan="6" style="text-align:right;">❌لا توجد نتائج مطابقة</td></tr>`;
  } else {
    for (let i = 0; i < filteredData.length; i++) {
      table += `
<tr>
    <td>${i + 1}</td>
    <td>${filteredData[i].name}</td>
    <td>${filteredData[i].nwoh}</td>
    <td>${filteredData[i].allwhda}</td>
    <td>${filteredData[i].alCmia}</td>
    <td>${filteredData[i].date}</td>
</tr>`;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

//clean data
