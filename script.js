document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addAppointment();
});

function addAppointment() {
    const title = document.getElementById('appointmentTitle').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;

    if (title === '' || date === '' || time === '') {
        alert('Please fill in all fields');
        return;
    }

    const appointment = {
        title: title,
        date: date,
        time: time
    };

    const appointments = getAppointments();
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
    document.getElementById('appointmentForm').reset();
}

function getAppointments() {
    const appointments = localStorage.getItem('appointments');
    return appointments ? JSON.parse(appointments) : [];
}

function displayAppointments() {
    const appointmentList = document.getElementById('appointmentList');
    appointmentList.innerHTML = '';

    const appointments = getAppointments();
    appointments.forEach((appointment, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            <div>
                <strong>${appointment.title}</strong> <br>
                ${appointment.date} at ${appointment.time}
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteAppointment(${index})">Delete</button>
        `;
        appointmentList.appendChild(li);
    });
}

function deleteAppointment(index) {
    const appointments = getAppointments();
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments();
}

document.addEventListener('DOMContentLoaded', displayAppointments);
