//Поисковик
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBox = document.querySelector('.input-container');
    
    const postsContainer = document.querySelector('.posts-container');
    const posts = document.querySelectorAll('.posts-container .post');

    let HasResult = false;

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        
        if (searchText === '') {
            HasResult = false;
            searchInput.classList.remove("HasResult");
            searchBox.classList.remove("Active");
            return;
        }

        // Создаем массив для заголовков h2
        let h2Array = [];
        // Проходим по каждому посту и ищем в нем элемент h2 и добавляем в массив
        posts.forEach(function(post) {
            const h2 = post.querySelector('h2');
            if (h2) {
                h2Array.push(h2.textContent);
            }
        });
        
        //Обновляем значение для отслеживания результатов
        HasResult = false;
        
        let resultCount = 0;
        const maxResults = 8; //Максимальное количество результатов

        h2Array.forEach(function(text, index) {
            if (text.toLowerCase().includes(searchText) && resultCount < maxResults) {
                HasResult = true;
                const li = document.createElement('li');
                
                const link = document.createElement('a');
                link.textContent = text;
                
                const postId = posts[index].id; // Получаем post-id текущего поста
                link.setAttribute('href', '#' + postId); // Устанавливаем атрибут href с post-id
                
                li.appendChild(link);
                searchResults.appendChild(li); // Проходим по всем постам и скрываем те, которые не соответствуют результатам поиска
                resultCount++; // Увеличиваем счетчик результатов
            } 
        });
        
        //Появления результатов
        if (HasResult) {
            searchBox.classList.add("Active");
            searchInput.classList.add("HasResult");
        } else {
            searchBox.classList.remove("Active");
            searchInput.classList.remove("HasResult");
        }
    });
    
    // Инпут в фокусе
    searchInput.addEventListener('focus', function() {
        searchResults.style.display = 'block';

        if (HasResult === true) {
            searchBox.classList.add("Active");
            searchInput.classList.add("HasResult"); 
        }
    });

    // Клик вне инпута
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target)) {
            searchResults.style.display = 'none';
            searchBox.classList.remove("Active");
            searchInput.classList.remove("HasResult");
        }
    });
});

var posts = Array.from(document.querySelectorAll('.post')); //БД
const postsContainer = document.querySelector('.posts-container');

// Создание темы
document.addEventListener("DOMContentLoaded", function() {
    const themesForm = document.getElementById("ThemesForm");

    function handleThemesSubmission(form, hiddenInput, submitButton) {
        let buttons = form.querySelectorAll('.btn_group button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => {
                    if (btn !== this) {
                        btn.classList.remove('selected');
                    }
                });
                this.classList.toggle('selected');
                this.selectedCategory = this.getAttribute('data-faculty');
                hiddenInput.value = this.selectedCategory;
            });
        });  

        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const nameInput = form.querySelector('input[type="text"]');
            const messageInput = form.querySelector('textarea');

            localStorage.setItem('name', nameInput.value);
            localStorage.setItem('message', messageInput.value);
            localStorage.setItem('faculty', hiddenInput.value);
            console.log('Сохраненные значения:');
            console.log('Имя: ' + localStorage.getItem('name'));
            console.log('Сообщение: ' + localStorage.getItem('message'));
            console.log('Факультет: ' + localStorage.getItem('faculty'));

            if (!nameInput.value || !hiddenInput.value || !messageInput.value) {
                alert("Пожалуйста, заполните все поля.");
            }
            else {
                toggleModal('ThemesCreater', 'close');
                createThemesPost(nameInput.value, hiddenInput.value, messageInput.value);
                nameInput.value = '';
                messageInput.value = '';
                hiddenInput.value = '';
                buttons.forEach(button => {
                    button.classList.remove('selected');
                });
            }
        });
    }
    handleThemesSubmission(themesForm, document.getElementById("selectedFaculty"), themesForm.querySelector('input[type="submit"]'));
});

// Создание мероприятия
document.addEventListener("DOMContentLoaded", function() {
    const eventsForm = document.getElementById("EventsForm");
    
    function handleEventsSubmission(form, submitButton) {
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const nameInput = form.querySelector('input[type="text"]');
            const dateInput = form.querySelector('input[type="datetime-local"]');
            const tegInput = form.querySelector('select');
            const messageInput = form.querySelector('textarea');
            
            const participantsInput = document.getElementById('number_of_participants');
            const switchInput = document.getElementById('group_recruitment');
            const isSwitchOn = switchInput.checked;
            
            localStorage.setItem('name', nameInput.value);
            localStorage.setItem('date', dateInput.value);
            localStorage.setItem('message', messageInput.value);
            localStorage.setItem('switchState', isSwitchOn);
            if(isSwitchOn) {
                localStorage.setItem('numberOf', participantsInput.value);
            }

            console.log('Сохраненные значения:');
            console.log('Имя: ' + localStorage.getItem('name'));
            console.log('Дата: ' + localStorage.getItem('date'));
            console.log('Сообщение: ' + localStorage.getItem('message'));
            console.log('Состояние свитча: ' + localStorage.getItem('switchState'));

            if(isSwitchOn) {
                console.log('Необходимое количество участников: ' + localStorage.getItem('numberOf'));
            }

            if (!nameInput.value || !dateInput.value || !messageInput.value || !tegInput.value) {
                alert("Пожалуйста, заполните все поля.");
            } else {
                toggleModal('ThemesCreater', 'close');
                createEventsPost(nameInput.value, dateInput.value, messageInput.value, tegInput.value, switchInput.checked, participantsInput.value);
                nameInput.value = '';
                dateInput.value = '';
                messageInput.value = '';
                tegInput.value = '';
                switchInput.checked = false;
                participantsInput.value = '';
                participantsInput.setAttribute('disabled', '');
            }
        });
    }
    
    handleEventsSubmission(eventsForm, eventsForm.querySelector('input[type="submit"]'));
});

// Создание поста мероприятия
function createEventsPost(name, date, message, teg, isSwitchOn, numberOf) {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const newPost = {
        name: name,
        date: date,
        message: message,
        teg: teg,
        likes: 0,
        comments: 0,
        favorites: 0,
        time: formattedTime,
        isSwitchOn: isSwitchOn,
        numberOf: numberOf
    };
    // Опционально: добавляем новый пост в DOM
    const postElement = document.createElement('div');
    postElement.classList.add("post");
    var postHTML = `
        <div class="user__info">
            <img class="user_img" src="img/users_img/legenda_img.svg" alt="">
            <div class="user_details">
                <div class="user_name">Денис Гришкевич</div>
                <div class="time_of_creation">только что</div>
            </div>
        </div>
        <div class="post__content">
            <h2>${newPost.name}</h2>
            <p>${newPost.message}</p>
        </div>
    `;
    if(isSwitchOn) {
        postHTML += `
        <div class="participant_recruitment_box">
            <div class="progress_box">
                <div class="progress-bar">
                    <div class="progress-bar-inner"></div>
                </div>
                <div class="membrs__box">
                    <span class="curent_number">0</span>/<span class="required_number">${newPost.numberOf}</span>
                    <div class="membrs__photo">
                    </div>
                </div>
            </div>
            <button class="tooltip" disabled>Участвовать
                <span class="tooltiptext">Вы являетесь создателем этого поста!</span>
            </button>
        </div>
        `;
    }
    postHTML += `
        <div class="post_footer">
            <div class="post__items">
                <button class="likes">
                    <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4344 6.00005H16.5134C16.9343 6.00005 17.338 6.15809 17.6357 6.43939C17.9333 6.72069 18.1006 7.10223 18.1006 7.50005V9.07805C18.1008 9.27407 18.0603 9.46823 17.9815 9.64955L15.5254 15.2858C15.4654 15.4232 15.3637 15.5407 15.233 15.6234C15.1023 15.706 14.9485 15.7501 14.7913 15.7501H1.43513C1.22466 15.7501 1.02281 15.671 0.873978 15.5304C0.725151 15.3897 0.641541 15.199 0.641541 15.0001V7.50005C0.641541 7.30114 0.725151 7.11037 0.873978 6.96972C1.02281 6.82907 1.22466 6.75005 1.43513 6.75005H4.19842C4.32547 6.75008 4.45067 6.72128 4.5635 6.66608C4.67632 6.61087 4.77347 6.53087 4.84678 6.4328L9.17424 0.63755C9.22894 0.564284 9.30962 0.51197 9.40163 0.490093C9.49365 0.468215 9.59091 0.478222 9.67579 0.5183L11.1154 1.19855C11.5205 1.38992 11.8441 1.70654 12.0325 2.09579C12.2209 2.48504 12.2627 2.92349 12.151 3.3383L11.4344 6.00005ZM5.40309 7.94105V14.2501H14.2596L16.5134 9.07805V7.50005H11.4344C11.1927 7.50002 10.9541 7.4478 10.737 7.34739C10.5199 7.24698 10.3299 7.10103 10.1815 6.92066C10.0332 6.7403 9.93036 6.53029 9.88094 6.30667C9.83153 6.08304 9.83682 5.8517 9.89641 5.6303L10.613 2.9693C10.6354 2.8863 10.6271 2.79854 10.5894 2.72062C10.5518 2.64271 10.487 2.57934 10.4059 2.54105L9.88133 2.29355L6.14351 7.29755C5.94511 7.56305 5.69116 7.78055 5.40309 7.94105ZM3.81591 8.25005H2.22872V14.2501H3.81591V8.25005Z" fill="var(--icnos-fill-color)" />
                    </svg>
                    <span>${newPost.likes}</span>
                </button>
                <button class="comments">
                    <div class="icon">
                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.93589 0.25H10.1103C11.794 0.25 13.4089 0.882141 14.5995 2.00736C15.7901 3.13258 16.459 4.6587 16.459 6.25C16.459 7.8413 15.7901 9.36742 14.5995 10.4926C13.4089 11.6179 11.794 12.25 10.1103 12.25V14.875C6.1423 13.375 0.587158 11.125 0.587158 6.25C0.587158 4.6587 1.25604 3.13258 2.44666 2.00736C3.63728 0.882141 5.2521 0.25 6.93589 0.25ZM8.52307 10.75H10.1103C10.7356 10.75 11.3547 10.6336 11.9324 10.4075C12.5101 10.1813 13.035 9.84984 13.4772 9.43198C13.9193 9.01412 14.2701 8.51804 14.5094 7.97208C14.7486 7.42611 14.8718 6.84095 14.8718 6.25C14.8718 5.65905 14.7486 5.07389 14.5094 4.52792C14.2701 3.98196 13.9193 3.48588 13.4772 3.06802C13.035 2.65016 12.5101 2.31869 11.9324 2.09254C11.3547 1.8664 10.7356 1.75 10.1103 1.75H6.93589C5.67305 1.75 4.46193 2.22411 3.56897 3.06802C2.676 3.91193 2.17434 5.05653 2.17434 6.25C2.17434 8.9575 4.12816 10.7245 8.52307 12.61V10.75Z" fill="var(--icnos-fill-color)" />
                        </svg>
                    </div>
                    <span>${newPost.comments}</span>
                </button>
                <button class="favorites">
                    <div class="icon">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.66395 0.5H12.7742C12.9847 0.5 13.1866 0.579018 13.3354 0.71967C13.4842 0.860322 13.5678 1.05109 13.5678 1.25V15.6073C13.5679 15.6743 13.549 15.7402 13.513 15.7979C13.477 15.8557 13.4253 15.9033 13.3632 15.9358C13.3011 15.9683 13.231 15.9844 13.16 15.9826C13.0891 15.9807 13.02 15.9609 12.9599 15.9252L7.21909 12.5225L1.47825 15.9245C1.41823 15.9601 1.3492 15.9799 1.27835 15.9818C1.20749 15.9837 1.13739 15.9676 1.07534 15.9352C1.01329 15.9029 0.96155 15.8554 0.925502 15.7977C0.889454 15.74 0.870414 15.6742 0.870361 15.6073V1.25C0.870361 1.05109 0.953972 0.860322 1.1028 0.71967C1.25163 0.579018 1.45348 0.5 1.66395 0.5ZM11.9806 2H2.45754V13.574L7.21909 10.7533L11.9806 13.574V2Z" fill="var(--icnos-fill-color)" />
                        </svg>
                    </div>
                    <span>${newPost.favorites}</span>
                </button>
            </div>

            <div class="post_type">
                <div class="post_type__img">
                <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 7.4691L12.4722 0.465332L0 7.4691V21.5309L12.4722 28.5346L25 21.5309V7.4691Z" fill="#E4E4E4"/>
                </svg>
                </div>
                <div class="post_type__teg">
                    <span>${newPost.teg}</span>
                </div>
            </div>
        </div>
    `;
    postElement.innerHTML = postHTML;
    // Добавляем новый пост в массив
    posts.push(postElement);
    postsContainer.prepend(postElement);
}

// Массив факультетов
let facultyArray = [
    {
        name: "ГФ",
        url: "img/Faculties_img/gf.svg"
    }, 
    {
        name: "ИСФ",
        url: "img/Faculties_img/isf.svg"
    },
    {
        name: "МТФ",
        url: "img/Faculties_img/mtf.svg"
    },
    {
        name: "ФИТ",
        url: "img/Faculties_img/fit.svg"
    },
    {
        name: "ФКНиЭ",
        url: "img/Faculties_img/fkne.svg"
    },
    {
        name: "ФЭФ",
        url: "img/Faculties_img/fef.svg"
    },
    {
        name: "ЮФ",
        url: "img/Faculties_img/fit.svg"
    },
    {
        name: "ПГУ",
        url: "img/PsuLogo.svg"
    }
];

// Создание поста темы
function createThemesPost(name, faculty, message) {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const facultyObj = facultyArray.find(obj => obj.name === faculty);
    const url = facultyObj ? facultyObj.url : '';
    const teg = facultyObj ? facultyObj.name : '';

    const newPost = {
        name: name,
        faculty: faculty,
        message: message,
        url: url,
        teg: teg, 
        likes: 0,
        comments: 0,
        favorites: 0,
        time: formattedTime
    };
    
    const postElement = document.createElement('div');
    postElement.classList.add("post");

    var postHTML = `
    <div class="user__info">
        <img class="user_img" src="img/users_img/legenda_img.svg" alt="">
        <div class="user_details">
            <div class="user_name">Денис Гришкевич</div>
            <div class="time_of_creation">только что</div>
        </div>
    </div>
    <div class="post__content">
        <h2>${newPost.name}</h2>
        <p>${newPost.message}</p>
    </div>
    <div class="post_footer">
        <div class="post__items">
            <button class="likes">
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4344 6.00005H16.5134C16.9343 6.00005 17.338 6.15809 17.6357 6.43939C17.9333 6.72069 18.1006 7.10223 18.1006 7.50005V9.07805C18.1008 9.27407 18.0603 9.46823 17.9815 9.64955L15.5254 15.2858C15.4654 15.4232 15.3637 15.5407 15.233 15.6234C15.1023 15.706 14.9485 15.7501 14.7913 15.7501H1.43513C1.22466 15.7501 1.02281 15.671 0.873978 15.5304C0.725151 15.3897 0.641541 15.199 0.641541 15.0001V7.50005C0.641541 7.30114 0.725151 7.11037 0.873978 6.96972C1.02281 6.82907 1.22466 6.75005 1.43513 6.75005H4.19842C4.32547 6.75008 4.45067 6.72128 4.5635 6.66608C4.67632 6.61087 4.77347 6.53087 4.84678 6.4328L9.17424 0.63755C9.22894 0.564284 9.30962 0.51197 9.40163 0.490093C9.49365 0.468215 9.59091 0.478222 9.67579 0.5183L11.1154 1.19855C11.5205 1.38992 11.8441 1.70654 12.0325 2.09579C12.2209 2.48504 12.2627 2.92349 12.151 3.3383L11.4344 6.00005ZM5.40309 7.94105V14.2501H14.2596L16.5134 9.07805V7.50005H11.4344C11.1927 7.50002 10.9541 7.4478 10.737 7.34739C10.5199 7.24698 10.3299 7.10103 10.1815 6.92066C10.0332 6.7403 9.93036 6.53029 9.88094 6.30667C9.83153 6.08304 9.83682 5.8517 9.89641 5.6303L10.613 2.9693C10.6354 2.8863 10.6271 2.79854 10.5894 2.72062C10.5518 2.64271 10.487 2.57934 10.4059 2.54105L9.88133 2.29355L6.14351 7.29755C5.94511 7.56305 5.69116 7.78055 5.40309 7.94105ZM3.81591 8.25005H2.22872V14.2501H3.81591V8.25005Z" fill="var(--icnos-fill-color)" />
                </svg>
                <span>${newPost.likes}</span>
            </button>
            <button class="comments">
                <div class="icon">
                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.93589 0.25H10.1103C11.794 0.25 13.4089 0.882141 14.5995 2.00736C15.7901 3.13258 16.459 4.6587 16.459 6.25C16.459 7.8413 15.7901 9.36742 14.5995 10.4926C13.4089 11.6179 11.794 12.25 10.1103 12.25V14.875C6.1423 13.375 0.587158 11.125 0.587158 6.25C0.587158 4.6587 1.25604 3.13258 2.44666 2.00736C3.63728 0.882141 5.2521 0.25 6.93589 0.25ZM8.52307 10.75H10.1103C10.7356 10.75 11.3547 10.6336 11.9324 10.4075C12.5101 10.1813 13.035 9.84984 13.4772 9.43198C13.9193 9.01412 14.2701 8.51804 14.5094 7.97208C14.7486 7.42611 14.8718 6.84095 14.8718 6.25C14.8718 5.65905 14.7486 5.07389 14.5094 4.52792C14.2701 3.98196 13.9193 3.48588 13.4772 3.06802C13.035 2.65016 12.5101 2.31869 11.9324 2.09254C11.3547 1.8664 10.7356 1.75 10.1103 1.75H6.93589C5.67305 1.75 4.46193 2.22411 3.56897 3.06802C2.676 3.91193 2.17434 5.05653 2.17434 6.25C2.17434 8.9575 4.12816 10.7245 8.52307 12.61V10.75Z" fill="var(--icnos-fill-color)" />
                    </svg>
                </div>
                <span>${newPost.comments}</span>
            </button>
            <button class="favorites">
                <div class="icon">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66395 0.5H12.7742C12.9847 0.5 13.1866 0.579018 13.3354 0.71967C13.4842 0.860322 13.5678 1.05109 13.5678 1.25V15.6073C13.5679 15.6743 13.549 15.7402 13.513 15.7979C13.477 15.8557 13.4253 15.9033 13.3632 15.9358C13.3011 15.9683 13.231 15.9844 13.16 15.9826C13.0891 15.9807 13.02 15.9609 12.9599 15.9252L7.21909 12.5225L1.47825 15.9245C1.41823 15.9601 1.3492 15.9799 1.27835 15.9818C1.20749 15.9837 1.13739 15.9676 1.07534 15.9352C1.01329 15.9029 0.96155 15.8554 0.925502 15.7977C0.889454 15.74 0.870414 15.6742 0.870361 15.6073V1.25C0.870361 1.05109 0.953972 0.860322 1.1028 0.71967C1.25163 0.579018 1.45348 0.5 1.66395 0.5ZM11.9806 2H2.45754V13.574L7.21909 10.7533L11.9806 13.574V2Z" fill="var(--icnos-fill-color)" />
                    </svg>
                </div>
                <span>${newPost.favorites}</span>
            </button>
        </div>

        <div class="post_type">
            <div class="post_type__img">
                <img src=${newPost.url} alt="ФИТ">
            </div>
            <div class="post_type__teg">
                <span>${newPost.teg}</span>
            </div>
        </div>
    </div>
    `;
    postElement.innerHTML = postHTML;
    // Добавляем новый пост в массив
    posts.push(postElement);
    postsContainer.prepend(postElement);
    
};

//Cортировка
document.addEventListener('DOMContentLoaded', () => {
    const sortCheckboxes = document.querySelectorAll('.checkbox__container input');
    sortCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', sortItems);
    });

    function sortItems() {
        // Создаем массив тегов (все активированные кнопки фильтра закидывают свои значения в массив checkedTags)
        const checkedTags = Array.from(document.querySelectorAll('.checkbox__container input:checked')).map(checkbox => checkbox.dataset.displayValue);
        // Если нет выбранных тегов, возвращаем все посты(чтобы посты не исчизали после отключения фильтров)
        if (checkedTags.length === 0) {
            updateDOM(posts);
            return;
        }

        const filteredPosts = posts.filter(post => { 
            // Из каждого поста достаем его теги и закидываем их в создаваемый массив postTags
            const postTags = Array.from(post.querySelectorAll('.post_type__teg span')).map(tag => tag.textContent);
            // Проверяем, содержит ли хотя бы один из тегов поста (postTags) значение из массива checkedTags
            return checkedTags.some(tag => postTags.includes(tag));
        });

        updateDOM(filteredPosts);
    }

    function updateDOM(filteredPosts) {
        postsContainer.innerHTML = '';
        filteredPosts.forEach(post => postsContainer.appendChild(post));
    }
});

function popular() {
    posts.sort((a, b) => {
        let totalA = parseInt(a.querySelector('.likes span').textContent) +
                    parseInt(a.querySelector('.comments span').textContent) +
                    parseInt(a.querySelector('.favorites span').textContent);

        let totalB = parseInt(b.querySelector('.likes span').textContent) +
                    parseInt(b.querySelector('.comments span').textContent) +
                    parseInt(b.querySelector('.favorites span').textContent);

        return totalB - totalA; 
    });

    // Затем очистите postsContainer и добавьте отсортированные посты
    postsContainer.innerHTML = '';
    posts.forEach(post => {
    postsContainer.appendChild(post);
})};

function toHome() {
    function convertToDate(text) {
        let now = new Date();
        if (text === 'только что') {
            return now;
        } else if (text.endsWith('минут назад')) {
            let minutes = parseInt(text.split(' ')[0]);
            now.setMinutes(now.getMinutes() - minutes);
            return now;
        } else if (text.endsWith('часов назад')) {
            let hours = parseInt(text.split(' ')[0]);
            now.setHours(now.getHours() - hours);
            return now;
        } else if (text === 'сегодня') {
            return new Date(now.setHours(0,0,0,0));
        } else if (text === 'вчера') {
            return new Date(now.setDate(now.getDate() - 1));
        } else if (text.endsWith('дней назад')) {
            let days = parseInt(text.split(' ')[0]);
            now.setDate(now.getDate() - days);
            return now;
        }
    }

    posts.sort((a, b) => {
        let dateA = convertToDate(a.querySelector('.time_of_creation').textContent);
        let dateB = convertToDate(b.querySelector('.time_of_creation').textContent);
        return dateB - dateA;
    });
}