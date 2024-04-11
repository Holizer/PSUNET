//Поисковик
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchBox = document.querySelector('.input-container');

    const postsContainer = document.querySelector('.posts-container');
    const posts = document.querySelectorAll('.posts-container .post');

    let HasResult = false;

    searchInput.addEventListener('input', function () {
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
        posts.forEach(function (post) {
            const h2 = post.querySelector('h2');
            if (h2) {
                h2Array.push(h2.textContent);
            }
        });

        //Обновляем значение для отслеживания результатов
        HasResult = false;

        let resultCount = 0;
        const maxResults = 8; //Максимальное количество результатов

        h2Array.forEach(function (text, index) {
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
    searchInput.addEventListener('focus', function () {
        searchResults.style.display = 'block';

        if (HasResult === true) {
            searchBox.classList.add("Active");
            searchInput.classList.add("HasResult");
        }
    });

    // Клик вне инпута
    document.addEventListener('click', function (event) {
        if (!searchInput.contains(event.target)) {
            searchResults.style.display = 'none';
            searchBox.classList.remove("Active");
            searchInput.classList.remove("HasResult");
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const posts = document.querySelectorAll('.posts-container .post');
    let i = 0;

    posts.forEach(function (post) {
        i++;
        post.setAttribute('post-id', i);
    });
});

//Модальные окна и создание постов
document.addEventListener("DOMContentLoaded", function () {
    const themesForm = document.getElementById("ThemesForm");
    const eventsForm = document.getElementById("EventsForm");

    function handleFormSubmission(form, hiddenInput, submitButton) {
        let buttons = form.querySelectorAll('.btn_group button');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
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

function popular() {
    const posts = document.querySelectorAll('.post__items');
    var rate = [];

    posts.forEach(e => {
        rate.push([e.parentNode.parentNode.id, e.textContent.match(/\d+/g).map(function (x) {
            return parseInt(x);
        }).reduce((arr, x) => arr + x, 0) //суммируем коммы, лайки закладки
        ])
    });

    rate.sort(function (t, o) {
        if (t[1] > o[1]) {
            return -1;
        }
        else if (t[1] < o[1]) {
            return 1;
        }
        else if (t[0] > o[0]) {
            return -1;
        }
        return 1;
    })

    for (let i = 1; i < rate.length; i++) {
        insertAfter(document.getElementById(rate[i][0]), document.getElementById(rate[i - 1][0]));
    } //swap постов
    
    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }//+- синтаксический сахар
}