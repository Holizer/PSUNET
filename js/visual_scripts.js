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
/*
var eventsListContainer = document.querySelector('.subscribed_events .items');
var eventsListitem = Array.from(document.querySelectorAll('.subscribed_events .item')); 
eventsListContainer.innerHTML = "";
*/
//Список запланированных событий
var eventsListContainer = document.querySelector('.subscribed_events .items');
var eventsListitem = Array.from(document.querySelectorAll('.subscribed_events .item')); 
//Прогресс бар
posts.forEach(post => {
    // Проверяем, есть ли в посте элемент с классом 'participant_recruitment_box'
    const box = post.querySelector('.participant_recruitment_box');
    if (box) {
        // Если есть, то продолжаем как обычно
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
        
                // Получаем значение h2 из текущего поста
                const postTitle = post.querySelector('h2').textContent;
                const postDataTime = post.querySelector('.data_time').textContent;
                
                // Создаем новый элемент списка
                const newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `<span>${postDataTime}</span> ${postTitle}`;
                eventsListitem.push(newItem);
                // Добавляем новый элемент в список событий
                eventsListContainer.appendChild(newItem);
            }
            else {
                isPressed = false;
                currentNumberElement.textContent--;
                supportButton.textContent = "Участвовать";
                updateProgressBar(currentNumberElement, requiredNumberElement, progressBar);
                if (eventsListContainer.lastChild) {
                    eventsListContainer.removeChild(eventsListContainer.lastChild);
                }
            }
        });

        function updateProgressBar(currentNumberElement, requiredNumberElement, progressBar) {
            const currentNumber = parseInt(currentNumberElement.textContent, 10);
            const requiredNumber = parseInt(requiredNumberElement.textContent, 10);
            const progressPercentage = (currentNumber / requiredNumber) * 100;
            progressBar.style.width = progressPercentage + '%';
        }
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
let themeToggleSvg = themeToggle.querySelector('svg');

themeToggle.addEventListener('click', () => {
    if(document.body.classList.contains("dark-theme")) {
        themeToggleSvg.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5756 2.84112C13.851 3.67806 14 4.57206 14 5.49988C14 10.1943 10.1944 13.9999 5.5 13.9999C4.57218 13.9999 3.67818 13.8509 2.84124 13.5755C4.15425 16.199 6.86765 17.9999 10 17.9999C14.4183 17.9999 18 14.4182 18 9.99988C18 6.86753 16.1991 4.15413 13.5756 2.84112ZM11.0498 0.76987C11.2957 0.401272 11.7763 0.14152 12.3182 0.270179C16.7228 1.31609 20 5.27404 20 9.99988C20 15.5227 15.5228 19.9999 10 19.9999C5.27417 19.9999 1.31621 16.7227 0.270301 12.318C0.141642 11.7762 0.401395 11.2956 0.769993 11.0497C1.12974 10.8097 1.64074 10.7562 2.07927 11.0282C3.07222 11.6441 4.24303 11.9999 5.5 11.9999C9.08985 11.9999 12 9.08973 12 5.49988C12 4.24291 11.6442 3.0721 11.0283 2.07915C10.7563 1.64061 10.8098 1.12962 11.0498 0.76987Z" fill="var(--icnos-fill-color)" /> </svg>';
    }
    else {
        themeToggleSvg.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 3C9.44771 3 9 2.55228 9 2V1C9 0.447715 9.44771 0 10 0C10.5523 0 11 0.447715 11 1V2C11 2.55228 10.5523 3 10 3ZM10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7ZM5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10ZM17 10C17 9.44771 17.4477 9 18 9H19C19.5523 9 20 9.44771 20 10C20 10.5523 19.5523 11 19 11H18C17.4477 11 17 10.5523 17 10ZM16.364 14.9498C15.9734 14.5593 15.3403 14.5593 14.9498 14.9498C14.5592 15.3403 14.5592 15.9735 14.9498 16.364L15.6569 17.0711C16.0474 17.4616 16.6805 17.4616 17.0711 17.0711C17.4616 16.6806 17.4616 16.0474 17.0711 15.6569L16.364 14.9498ZM14.9498 3.63615C14.5592 4.02668 14.5592 4.65984 14.9498 5.05037C15.3403 5.44089 15.9734 5.44089 16.364 5.05037L17.0711 4.34326C17.4616 3.95274 17.4616 3.31957 17.0711 2.92905C16.6805 2.53852 16.0474 2.53852 15.6569 2.92905L14.9498 3.63615ZM0 10C0 9.44771 0.447715 9 1 9H2C2.55228 9 3 9.44771 3 10C3 10.5523 2.55228 11 2 11H1C0.447715 11 0 10.5523 0 10ZM4.34315 2.92903C3.95263 2.53851 3.31946 2.53851 2.92894 2.92903C2.53842 3.31956 2.53842 3.95272 2.92894 4.34324L3.63605 5.05035C4.02657 5.44088 4.65974 5.44088 5.05026 5.05035C5.44079 4.65983 5.44079 4.02666 5.05026 3.63614L4.34315 2.92903ZM10 20C9.44771 20 9 19.5523 9 19V18C9 17.4477 9.44771 17 10 17C10.5523 17 11 17.4477 11 18V19C11 19.5523 10.5523 20 10 20ZM2.92894 15.6569C2.53841 16.0474 2.53841 16.6806 2.92894 17.0711C3.31946 17.4616 3.95263 17.4616 4.34315 17.0711L5.05026 16.364C5.44078 15.9735 5.44078 15.3403 5.05026 14.9498C4.65974 14.5593 4.02657 14.5593 3.63605 14.9498L2.92894 15.6569Z" fill="var(--icnos-fill-color)"/></svg>';
    }
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
/*
var likes = document.querySelectorAll('.likes');
likes.forEach((like) => {
    const count = like.querySelector('span');
    let counter = parseInt(count.textContent);
    like.addEventListener('click', () => {
        like.classList.toggle('active');
        like.classList.contains('active') ? counter++ : counter--;
        count.textContent = counter;
    });
});
*/
//Лайки
var likes = document.querySelectorAll('.likes');
likes.forEach((like) => {
    const count = like.querySelector('span');
    let counter = parseInt(count.textContent);
    let svg = like.querySelector('svg');
    like.addEventListener('click', () => {
        like.classList.toggle('active');
        like.classList.contains('active') ? counter++ : counter--;

        if (like.classList.contains('active')) {
            svg.innerHTML = `<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4344 6.00005H16.5134C16.9343 6.00005 17.338 6.15809 17.6357 6.43939C17.9333 6.72069 18.1006 7.10223 18.1006 7.50005V9.07805C18.1008 9.27407 18.0603 9.46823 17.9815 9.64955L15.5254 15.2858C15.4654 15.4232 15.3637 15.5407 15.233 15.6234C15.1023 15.706 14.9485 15.7501 14.7913 15.7501H1.43513C1.22466 15.7501 1.02281 15.671 0.873978 15.5304C0.725151 15.3897 0.641541 15.199 0.641541 15.0001V7.50005C0.641541 7.30114 0.725151 7.11037 0.873978 6.96972C1.02281 6.82907 1.22466 6.75005 1.43513 6.75005H4.19842C4.32547 6.75008 4.45067 6.72128 4.5635 6.66608C4.67632 6.61087 4.77347 6.53087 4.84678 6.4328L9.17424 0.63755C9.22894 0.564284 9.30962 0.51197 9.40163 0.490093C9.49365 0.468215 9.59091 0.478222 9.67579 0.5183L11.1154 1.19855C11.5205 1.38992 11.8441 1.70654 12.0325 2.09579C12.2209 2.48504 12.2627 2.92349 12.151 3.3383L11.4344 6.00005ZM5.40309 7.94105V14.2501H14.2596L16.5134 9.07805V7.50005H11.4344C11.1927 7.50002 10.9541 7.4478 10.737 7.34739C10.5199 7.24698 10.3299 7.10103 10.1815 6.92066C10.0332 6.7403 9.93036 6.53029 9.88094 6.30667C9.83153 6.08304 9.83682 5.8517 9.89641 5.6303L10.613 2.9693C10.6354 2.8863 10.6271 2.79854 10.5894 2.72062C10.5518 2.64271 10.487 2.57934 10.4059 2.54105L9.88133 2.29355L6.14351 7.29755C5.94511 7.56305 5.69116 7.78055 5.40309 7.94105ZM3.81591 8.25005H2.22872V14.2501H3.81591V8.25005Z" fill="var(--icnos-fill-color)" />
                             </svg>`;
        } else {
            svg.innerHTML = `<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4344 6.00005H16.5134C16.9343 6.00005 17.338 6.15809 17.6357 6.43939C17.9333 6.72069 18.1006 7.10223 18.1006 7.50005V9.07805C18.1008 9.27407 18.0603 9.46823 17.9815 9.64955L15.5254 15.2858C15.4654 15.4232 15.3637 15.5407 15.233 15.6234C15.1023 15.706 14.9485 15.7501 14.7913 15.7501H1.43513C1.22466 15.7501 1.02281 15.671 0.873978 15.5304C0.725151 15.3897 0.641541 15.199 0.641541 15.0001V7.50005C0.641541 7.30114 0.725151 7.11037 0.873978 6.96972C1.02281 6.82907 1.22466 6.75005 1.43513 6.75005H4.19842C4.32547 6.75008 4.45067 6.72128 4.5635 6.66608C4.67632 6.61087 4.77347 6.53087 4.84678 6.4328L9.17424 0.63755C9.22894 0.564284 9.30962 0.51197 9.40163 0.490093C9.49365 0.468215 9.59091 0.478222 9.67579 0.5183L11.1154 1.19855C11.5205 1.38992 11.8441 1.70654 12.0325 2.09579C12.2209 2.48504 12.2627 2.92349 12.151 3.3383L11.4344 6.00005ZM5.40309 7.94105V14.2501H14.2596L16.5134 9.07805V7.50005H11.4344C11.1927 7.50002 10.9541 7.4478 10.737 7.34739C10.5199 7.24698 10.3299 7.10103 10.1815 6.92066C10.0332 6.7403 9.93036 6.53029 9.88094 6.30667C9.83153 6.08304 9.83682 5.8517 9.89641 5.6303L10.613 2.9693C10.6354 2.8863 10.6271 2.79854 10.5894 2.72062C10.5518 2.64271 10.487 2.57934 10.4059 2.54105L9.88133 2.29355L6.14351 7.29755C5.94511 7.56305 5.69116 7.78055 5.40309 7.94105ZM3.81591 8.25005H2.22872V14.2501H3.81591V8.25005Z" fill="var(--icnos-fill-color)" />
                             </svg>`;
        }
        count.textContent = counter;
    });
});
