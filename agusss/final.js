let savedImages = JSON.parse(localStorage.getItem('savedImages')) || {};

function showMonth(month) {
    document.getElementById("months").classList.remove("active");
    document.getElementById("calendar-container").classList.add("active");
    document.getElementById("calendar-container").innerHTML = generateCalendar(month);
}

function generateCalendar(month) {
    let daysInMonth = {
        "noviembre1": 30, "diciembre1": 31, "enero": 31, "febrero": 28, "marzo": 31, "abril": 30, "mayo": 31, "junio": 30,
        "julio": 31, "agosto": 31, "septiembre": 30, "octubre": 31, "noviembre": 30, "diciembre": 31
    };

    let startDays = {
        "noviembre1": 4,"diciembre1":6, "enero": 2, "febrero": 5, "marzo": 5, "abril": 1, "mayo": 3, "junio": 6,
        "julio": 1, "agosto": 4, "septiembre": 0, "octubre": 2, "noviembre": 5, "diciembre": 0
    };

    let startDay = startDays[month];
    let calendarHtml = `<h3>${month} 2025</h3>`;
    calendarHtml += '<button class="back-btn" onclick="goBackToMonths()">Volver</button>';
    calendarHtml += "<table><tr>";

    let daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    for (let day of daysOfWeek) calendarHtml += `<th>${day}</th>`;
    calendarHtml += "</tr><tr>";

    let currentDay = 1;
    for (let i = 0; i < 7; i++) {
        if (i < startDay) {
            calendarHtml += "<td></td>";
        } else {
            // Modificación: no marcar los días sin imágenes guardadas
            if (savedImages[month + '-' + currentDay]) {
                calendarHtml += `<td class="highlight" onclick="openDay('${month}', ${currentDay})">${currentDay}</td>`;
            } else {
                calendarHtml += `<td onclick="openDay('${month}', ${currentDay})">${currentDay}</td>`;
            }
            currentDay++;
        }
    }
    calendarHtml += "</tr>";

    while (currentDay <= daysInMonth[month]) {
        calendarHtml += "<tr>";
        for (let i = 0; i < 7 && currentDay <= daysInMonth[month]; i++) {
            // Modificación: no marcar los días sin imágenes guardadas
            if (savedImages[month + '-' + currentDay]) {
                calendarHtml += `<td class="highlight" onclick="openDay('${month}', ${currentDay})">${currentDay}</td>`;
            } else {
                calendarHtml += `<td onclick="openDay('${month}', ${currentDay})">${currentDay}</td>`;
            }
            currentDay++;
        }
        calendarHtml += "</tr>";
    }
    calendarHtml += "</table>";
    return calendarHtml;
}

function openDay(month, day) {
    document.getElementById("calendar-container").classList.remove("active");
    document.getElementById("day-container").classList.add("active");
    document.getElementById("day-title").textContent = `${day} de ${month} de 2025`;
    let eventContent = document.getElementById("event-content");

    // Mostrar las imágenes guardadas en el día específico
    if (savedImages[month + '-' + day]) {
        eventContent.innerHTML = savedImages[month + '-' + day].map(imgSrc => `<img src="${imgSrc}" alt="Imagen guardada">`).join('');
        document.getElementById("delete-btn").style.display = 'inline-block';
    } else {
        eventContent.innerHTML = "";
        document.getElementById("delete-btn").style.display = 'none';
    }
}

function saveImage() {
    let input = document.getElementById("image-input");
    let file = input.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let [day, month] = document.getElementById("day-title").textContent.split(" de ");
            let dayKey = month + '-' + day;

            // Si ya existen imágenes para el día, las agregamos a la lista
            if (!savedImages[dayKey]) {
                savedImages[dayKey] = [];
            }

            savedImages[dayKey].push(e.target.result);
            localStorage.setItem('savedImages', JSON.stringify(savedImages));

            // Mostrar las nuevas imágenes
            document.getElementById("event-content").innerHTML += `<img src="${e.target.result}" alt="Imagen guardada">`;
            document.getElementById("delete-btn").style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
}

function deleteImage() {
    let [day, month] = document.getElementById("day-title").textContent.split(" de ");
    let dayKey = month + '-' + day;

    // Eliminar las imágenes del día
    delete savedImages[dayKey];
    localStorage.setItem('savedImages', JSON.stringify(savedImages));

    // Limpiar las imágenes en la vista
    document.getElementById("event-content").innerHTML = "";
    document.getElementById("delete-btn").style.display = 'none';
}

function closeDay() {
    document.getElementById("day-container").classList.remove("active");
    document.getElementById("calendar-container").classList.add("active");
}

function goBackToMonths() {
    document.getElementById("calendar-container").classList.remove("active");
    document.getElementById("months").classList.add("active");
}

// Resetear calendario
function resetCalendar() {
    // Limpiar el localStorage y el calendario
    localStorage.removeItem('savedImages');
    savedImages = {};
    alert("Calendario reseteado correctamente.");
    location.reload();
}