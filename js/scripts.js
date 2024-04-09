//Поисковик
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBox = document.querySelector('.input-container');
    
    let HasResult = false;

    
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        
        if (searchText === '') {
            searchInput.classList.remove("HasResult");
            searchBox.classList.remove("Active");
            return;
        }

        const postsContainer = document.querySelector('.posts-container');
        //Зедсь нужно получить все посты с установленными для ни id, а после взять загловок h2  
        const SearchedEements = postsContainer.querySelectorAll('h2'); //БД
        
        HasResult = false; //Обновляем значение для отслеживания результатов
        
        SearchedEements.forEach(function(element, index) {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchText)) {
                HasResult = true;
                const li = document.createElement('li');
                
                const link = document.createElement('a');
                link.textContent = element.textContent;
                //Для ссылки устанаыливается атрибут herf с сылкой  '#' + postId
                link.setAttribute('href', '#'); //БД
                
                li.appendChild(link);
                searchResults.appendChild(li);
            } 
        });
        

        if (HasResult) {
            searchBox.classList.add("Active");
            searchInput.classList.add("HasResult");
        } else {
            searchBox.classList.remove("Active");
            searchInput.classList.remove("HasResult");
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target)) {
            searchResults.style.display = 'none';
            searchBox.classList.remove("Active");
            searchInput.classList.remove("HasResult");
        }
    });

    searchInput.addEventListener('focus', function() {
        searchResults.style.display = 'block';

        if (HasResult === true) {
            searchBox.classList.add("Active");
            searchInput.classList.add("HasResult"); 
        }
    });
});

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


//Кнопки уебки в модальных окнах
document.addEventListener("DOMContentLoaded", function() {
    const themesForm = document.getElementById("ThemesForm");
    const eventsForm = document.getElementById("EventsForm");

    function handleFormSubmission(form, hiddenInput, submitButton) {
        let buttons = form.querySelectorAll('.btn_group button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => {
                    if (btn !== this) {
                        btn.classList.remove('selected');
                    }
                });
                this.classList.toggle('selected');
                this.selectedCategory = form === eventsForm ? this.getAttribute('data-category') : this.getAttribute('data-faculty');
                hiddenInput.value = this.selectedCategory;
            });
        });  

        submitButton.addEventListener("click", () => {
            const nameInput = form.querySelector('input[type="text"]');
            const dateInput = form.querySelector('input[type="datetime-local"]');
            const messageInput = form.querySelector('textarea');
            const selectedCategory = form.querySelector('input[type="hidden"]');
            if (!hiddenInput.value) {
                alert("Пожалуйста, заполните все поля.");
            }
            else {
                createPost();
            }
        });
    }
    
    handleFormSubmission(themesForm, document.getElementById("selectedFaculty"), themesForm.querySelector('input[type="submit"]'));
    handleFormSubmission(eventsForm, document.getElementById("selectedCategory"), eventsForm.querySelector('input[type="submit"]'));
});

//Прогресс бар
const progressBar = document.querySelector('.progress-bar-inner');

function updateProgressBar(value) {
progressBar.style.width = value + '%';
}
updateProgressBar(58);

//Открытие расткрытия
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


//Cортировка
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.querySelector('.posts-container'); 
    const posts = Array.from(document.querySelectorAll('.post')); //БД

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

const humb = document.querySelector('.hamb');
const hamb__field = document.querySelector('.hamb__field');
const menu = document.querySelector('.left-sidebar');

humb.addEventListener('click', (e) => {
    hamb__field.classList.toggle('active');
    menu.classList.toggle('open');
    e.stopPropagation(); 
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !humb.contains(e.target) && !modal.contains(e.target)) {
        hamb__field.classList.remove('active');
        menu.classList.remove('open');
    }
});

document.querySelector('.themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
  });