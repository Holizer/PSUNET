//Открытие модальных окон
function toggleModal(modalId, action) {
    var modal = document.getElementById(modalId);
    var body = document.body;

    if (!modal) {
        return; // Проверяем, существует ли модальное окно с заданным идентификатором
    }

    if (action === "open") {
        modal.classList.add("open");
        body.classList.add("modal-open");
    } else if (action === "close") {
        modal.classList.remove("open");
        body.classList.remove("modal-open");
    }

    // Обработчик события для клика внутри модального окна
    document.querySelector(`#${modalId} .modal__box`).addEventListener('click', event => {
        event._isClickWithInModal = true;
    });

    // Обработчик события для клика вне модального окна
    document.getElementById(modalId).addEventListener('click', event => {
        if (event._isClickWithInModal) {
            return;
        }
        event.currentTarget.classList.remove('open');
        body.classList.remove("modal-open");
    });
}

//Прогресс бар
document.querySelectorAll('.participant_recruitment_box').forEach(box => {
    const currentNumberElement = box.querySelector('.curent_number');
    const requiredNumberElement = box.querySelector('.required_number');
    const progressBar = box.querySelector('.progress-bar-inner');
    const supportButton = box.querySelector('button');
    let isPressed = false;
    
    updateProgressBar(currentNumberElement, requiredNumberElement, progressBar);

    supportButton.addEventListener('click', () => {
        if (!isPressed) {
            isPressed = true;
            currentNumberElement.textContent++;
            supportButton.textContent = "Отменить голос";
            updateProgressBar(currentNumberElement, requiredNumberElement, progressBar);
        }
        else {
            isPressed = false;
            currentNumberElement.textContent--;
            supportButton.textContent = "Участвовать";
            updateProgressBar(currentNumberElement, requiredNumberElement, progressBar);
        }
    });

    function updateProgressBar(currentNumberElement, requiredNumberElement, progressBar) {
        const currentNumber = parseInt(currentNumberElement.textContent, 10);
        const requiredNumber = parseInt(requiredNumberElement.textContent, 10);
        const progressPercentage = (currentNumber / requiredNumber) * 100;
        progressBar.style.width = progressPercentage + '%';
    }
});

//Кнопки расткрытия контента
function toggleButtons() {
    var toggleButtons = document.querySelectorAll(".toggleBtn");
    var arrows = document.querySelectorAll(".arrow");
    
    toggleButtons.forEach(function(btn, index) {
        btn.addEventListener("click", function() {
            var content = this.nextElementSibling;
            content.classList.toggle("expanded");
            arrows[index].classList.toggle("open");
        });
    });
}
toggleButtons();


//Ограничения на дату создания
function SetDateBoundaries() {
    //Минимум текущая дата и время
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // добавляем ведущий ноль для однозначных месяцев 01 05
    var day = ('0' + currentDate.getDate()).slice(-2);
    var hours = ('0' + currentDate.getHours()).slice(-2);
    var minutes = ('0' + currentDate.getMinutes()).slice(-2);

    // Форматируем дату и время в формат, поддерживаемый input type="datetime-local"
    var formattedDate = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;

    // Устанавливаем минимальное значение для поля ввода даты равным текущему времени
    document.getElementById('date').min = formattedDate;

    //Максимум + 3 месяца вперед
    var maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate());

    // Форматируем дату в формат, поддерживаемый input type="datetime-local"
    var formattedMaxDate = maxDate.toISOString().slice(0, 16);

    // Устанавливаем максимальное значение для поля ввода даты
    document.getElementById('date').max = formattedMaxDate;
}
SetDateBoundaries();

//Меню бургер
const humb = document.querySelector('.hamb');
const hamb__field = document.querySelector('.hamb__field');
const menu = document.querySelector('.left-sidebar');

humb.addEventListener('click', (e) => {
    hamb__field.classList.toggle('active');
    menu.classList.toggle('open');
    e.stopPropagation(); 
    
    if (!menu.contains(e.target) && !humb.contains(e.target) && !modal.contains(e.target)) {
        hamb__field.classList.remove('active');
        menu.classList.remove('open');
    }
});

//Темная тема
const themeToggle = document.querySelector('.themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

const groupRecruitmentCheckbox = document.getElementById('group_recruitment');
const numberOfParticipantsInput = document.getElementById('number_of_participants');

// Добавляем обработчик события 'change' на чекбокс
groupRecruitmentCheckbox.addEventListener('change', () => {
    // Если чекбокс отмечен, удаляем атрибут 'disabled' у поля ввода
    if (groupRecruitmentCheckbox.checked) {
        numberOfParticipantsInput.removeAttribute('disabled');
    } else {
        // Если чекбокс не отмечен, добавляем атрибут 'disabled' обратно
        numberOfParticipantsInput.setAttribute('disabled', 'disabled');
    }
});

function updateDateTimeLocalInput(id) {
    var input = document.getElementById(id);
    var now = new Date();
    var localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,16);
    input.value = localDateTime;
  }

  // Вызовите эту функцию при загрузке страницы и когда вам нужно обновить значение
  document.addEventListener('DOMContentLoaded', function() {
    updateDateTimeLocalInput('date');
  });