const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

// Função que inicializa o calendário

const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Atualiza a data no topo do calendário
    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let i = day; i > 0; i--) {
        days += `<div class="day prev-date">${prevDays - i + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        // adicionando a classe today se dia é today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }

    for (let i = 1; i <= nextDays; i++) {
        days += `<div class="day next-date">${i}</div>`;
    }

    daysContainer.innerHTML = days;
}

// prev month

const prevMonth = () => {
    month--;

    if (month < 0) {
        month = 11;
        year--;
    }

    initCalendar();
}

const nextMonth = () => {
    month++;

    if (month > 11) {
        month = 0;
        year++;
    }

    initCalendar();
}

const gotoDate = () => {
    const dateArr = dateInput.value.split("/");

    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }

    alert("Data inválida");
}

// Eventos

// Navegação entre meses 
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// Navegando escolhendo a data e ir para hoje
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }

    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

initCalendar();

// Verifica se tem algum usuário logado

if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "signin.html";
}
  
const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
const logado = document.querySelector("#logado");
logado.innerHTML = `Bem vindo(a), ${userLogado.nome}`;
  
function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "signin.html";
}
