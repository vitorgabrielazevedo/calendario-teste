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
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventSubmit = document.querySelector(".add-event-btn");
const addEventWrapper = document.querySelector(".add-event-wrapper");

// const deleteBtn = document.querySelector(".delete-event");
// const editBtn = document.querySelector(".edit-event");

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

const eventsArr = [
  {
    day: 16,
    month: 12,
    year: 2024,
    events: [
      {
        title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM",
      },
    ],
  },
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
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true;
            }
        });

        // adicionando a classe today se dia é today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            // days += `<div class="day today">${i}</div>`;
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            if (event) {
                days += `<div class="day today active event">${i}</div>`;
              } else {
                days += `<div class="day today active">${i}</div>`;
              }
        } else {
            // days += `<div class="day">${i}</div>`;
            if (event) {
                days += `<div class="day event">${i}</div>`;
              } else {
                days += `<div class="day ">${i}</div>`;
              }
        }
    }

    for (let i = 1; i <= nextDays; i++) {
        days += `<div class="day next-date">${i}</div>`;
    }

    daysContainer.innerHTML = days;

    addListner();
}

initCalendar();

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

function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      day.addEventListener("click", (e) => {
        getActiveDay(e.target.innerHTML);
        updateEvents(Number(e.target.innerHTML));
        activeDay = Number(e.target.innerHTML);
        //remove active
        days.forEach((day) => {
          day.classList.remove("active");
        });
        //if clicked prev-date or next-date switch to that month
        if (e.target.classList.contains("prev-date")) {
          prevMonth();
          //add active to clicked day afte month is change
          setTimeout(() => {
            //add active where no prev-date or next-date
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else if (e.target.classList.contains("next-date")) {
          nextMonth();
          //add active to clicked day afte month is changed
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("next-date") &&
                day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          e.target.classList.add("active");
        }
      });
    });
}

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
      if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year
      ) {
        event.events.forEach((event) => {
          events += `
            <div class="event">
                <i class="bi bi-circle"></i>
                <div class="event-title">${event.title}</div>
                <div class="event-time">${event.time}</div>
                <button class="edit-event">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="delete-event">
                    <i class="bi bi-trash"></i>
                </button>
            </div>`;
        });
      }
    });
    if (events === "") {
        events = `
        <div class="no-event">
            <h3>Nenhum evento</h3>
        </div>`;
    }
    eventsContainer.innerHTML = events;
    // saveEvents();
    const deleteButtons = document.querySelectorAll(".delete-event");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const eventElement = e.target.closest(".event");
            if (eventElement) {
                eventElement.remove();
            }
        });
    });

    const editButtons = document.querySelectorAll(".edit-event");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const eventElement = e.target.closest(".event");
            const eventTitle = eventElement.querySelector(".event-title").textContent;
            const eventTime = eventElement.querySelector(".event-time").textContent;
            editEvent(eventTitle, eventTime, activeDay, month + 1, year);
        })
    })
}

function convertTime(time) {
    //convert time to 24 hour format
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

function editEvent(eventTitle, eventTime, day, month, year) {
    // Preenche o formulário com os dados do evento atual
    addEventTitle.value = eventTitle;
    const timeRange = eventTime.split(" - ");
    addEventFrom.value = timeRange[0].replace(/AM|PM/, "").trim();
    addEventTo.value = timeRange[1].replace(/AM|PM/, "").trim();

    // Exibe o formulário
    addEventWrapper.classList.toggle("active");

    // Substitui o comportamento do botão de adicionar
    addEventSubmit.textContent = "Editar Evento";

    // Remove quaisquer listeners anteriores
    const newButton = addEventSubmit.cloneNode(true);
    addEventSubmit.parentNode.replaceChild(newButton, addEventSubmit);

    newButton.addEventListener("click", () => {
        const newTitle = addEventTitle.value;
        const newTimeFrom = addEventFrom.value;
        const newTimeTo = addEventTo.value;

        if (!newTitle || !newTimeFrom || !newTimeTo) {
            alert("Preencha todos os campos");
            return;
        }

        const timeFromArr = newTimeFrom.split(":");
        const timeToArr = newTimeTo.split(":");
        if (
            timeFromArr.length !== 2 ||
            timeToArr.length !== 2 ||
            timeFromArr[0] > 23 ||
            timeFromArr[1] > 59 ||
            timeToArr[0] > 23 ||
            timeToArr[1] > 59
        ) {
            alert("Formato de hora inválido");
            return;
        }

        const newTime = `${convertTime(newTimeFrom)} - ${convertTime(newTimeTo)}`;

        // Atualiza o evento no array
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === day && eventObj.month === month && eventObj.year === year) {
                eventObj.events = eventObj.events.map((event) =>
                    event.title === eventTitle && event.time === eventTime
                        ? { title: newTitle, time: newTime }
                        : event
                );
            }
        });

        // Atualiza a interface e fecha o formulário
        updateEvents(activeDay);
        addEventWrapper.classList.remove("active");
        addEventTitle.value = "";
        addEventFrom.value = "";
        addEventTo.value = "";

        // Restaura o comportamento do botão de adicionar
        newButton.textContent = "Adicionar Evento";
    });
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

addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;
    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
      alert("Preencha todos os campos");
      return;
    }
  
    //check correct time format 24 hour
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      timeFromArr[0] > 23 ||
      timeFromArr[1] > 59 ||
      timeToArr[0] > 23 ||
      timeToArr[1] > 59
    ) {
      alert("Formato de hora inválido");
      return;
    }
  
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
  
    //check if event is already added
    // let eventExist = false;
    // eventsArr.forEach((event) => {
    //   if (
    //     event.day === activeDay &&
    //     event.month === month + 1 &&
    //     event.year === year
    //   ) {
    //     event.events.forEach((event) => {
    //       if (event.title === eventTitle) {
    //         eventExist = true;
    //       }
    //     });
    //   }
    // });
    // if (eventExist) {
    //   alert("Event already added");
    //   return;
    // }
    const newEvent = {
      title: eventTitle,
      time: timeFrom + " - " + timeTo,
    };
    console.log(newEvent);
    console.log(activeDay);
    let eventAdded = false;
    if (eventsArr.length > 0) {
      eventsArr.forEach((item) => {
        if (
          item.day === activeDay &&
          item.month === month + 1 &&
          item.year === year
        ) {
          item.events.push(newEvent);
          eventAdded = true;
        }
      });
    }
  
    if (!eventAdded) {
      eventsArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newEvent],
      });
    }
  
    console.log(eventsArr);
    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";
    updateEvents(activeDay);
    //select active day and add event class if not added
    const activeDayEl = document.querySelector(".day.active");
    if (!activeDayEl.classList.contains("event")) {
      activeDayEl.classList.add("event");
    }
});

// initCalendar();

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

// Permitir apenas 50 caracteres no título
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// Formatação do horário
addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");

    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }

    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");

    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }

    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});
