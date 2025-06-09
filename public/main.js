const ALERT_DURATION = 12000;
const MAX_ROW_ACTIVE_CASE = 180000;
const $tableBody = document.getElementById('table-body');
let alertTimer = null;

function showAlert(data) {
  const $alertCase = document.getElementById('alert-case');
  const $animateAlert = document.getElementById('animate-alert');
  const $caseCode = document.getElementById('caseCode');
  const $caseCompany = document.getElementById('caseCompany');
  const $caseCountry = document.getElementById('caseCountry');
  clearTimeout(alertTimer);
  if ($animateAlert) {
    $animateAlert.classList.remove('animate-case');
  }
  $caseCode.textContent = data.number;
  $caseCompany.textContent = data.company;
  $caseCountry.textContent = data.countries;
  $alertCase.classList.add('animate-case');
  alertTimer = setTimeout(() => {
    $alertCase.classList.remove('animate-case');
  }, ALERT_DURATION);
}

function createRow(data) {
  const $row = document.createElement('div');
  $row.classList.add('table-row');
  $row.classList.add('table-columns');
  $row.classList.add('row-active-case');
  $row.innerHTML = ` <span class="col-number">${data.number}</span>
      <span>${data.company}</span> <span>${data.subject}</span> <span>${data.dateCreated}</span>
      <span>${data.stage}</span> <div> <span class="status" data-status-id="${data.statusId}"> ${data.status} </span>
      </div> <span>${data.assignedTo}</span> <span>${data.countries}</span> <span>${data.timeOpen}</span>`;
  $tableBody.prepend($row);
  setTimeout(() => {
    $row.classList.remove('row-active-case');
  }, MAX_ROW_ACTIVE_CASE);
}

function updateCounter(data) {
  const $totalCases = document.getElementById('totalCases');
  $totalCases.textContent = Number($totalCases.textContent) + 1;
  const $status = document.querySelector(`div[data-status-id="${data.statusId}"]`);
  if (!$status) {
    createNewStatus(data);
    return;
  }
  $status.textContent = Number($status.textContent) + 1;
}

function createNewStatus(data) {
  const $statusDetails = document.getElementById('status-details');
  const $status = document.createElement('div');
  $status.classList.add('status-details__item');
  $status.classList.add('flex');
  $status.innerHTML = ` <div
      class="status square" data-status-id="${data.statusId}">1</div> <div class="status-title">${data.status}</div> `;
  $statusDetails.append($status);
}

function playAlertSound() {
  /* const audio = new Audio('/alert.mp3');
  audio.play(); */
}

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef
  const socket = io();
  socket.on('server:update-cases', (data) => {
    showAlert(data);
    createRow(data);
    updateCounter(data);
    playAlertSound();
  });
});
