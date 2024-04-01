function toggleModal(modalId, action) {
  var modal = document.getElementById(modalId);
  if (!modal) return; // Проверяем, существует ли модальное окно с заданным идентификатором
  
  if (action === "open") {
    modal.classList.add("open");
  } 
  else if (action === "close") {
    modal.classList.remove("open");
  }
  // Обработчик события для клика внутри модального окна
  document.querySelector(`#${modalId} .modal__box`).addEventListener('click', event => {
    event._isClickWithInModal = true;
  });

  // Обработчик события для клика вне модального окна
  document.getElementById(modalId).addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const themesForm = document.getElementById("ThemesForm");
  const eventsForm = document.getElementById("EventsForm");

  function createPostContainer() {
    const newPostContainer = document.createElement("div");
    newPostContainer.classList.add("postsContainer");
    document.querySelector('.feed').appendChild(newPostContainer);
    return newPostContainer;
  }

  function handleFormSubmission(form, facultyInput, categoryInput, submitButton) {
    const buttons = form.querySelectorAll(".btn_group button");
    let selected = null;

    buttons.forEach(button => {
      button.addEventListener("click", function() {
        buttons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        selected = this.getAttribute("data-faculty") || this.getAttribute("data-category");
        if (facultyInput) {
          facultyInput.value = selected;
        } else {
          categoryInput.value = selected;
        }
      });
    });

    submitButton.addEventListener("click", function(event) {
      const nameInput = form.querySelector('input[type="text"]');
      const dateInput = form.querySelector('input[type="date"]');
      const messageInput = form.querySelector('textarea');

      if (nameInput.value === "") {
        showAlert("Пожалуйста, введите название.");
        event.preventDefault();
      } else if (!selected) {
        showAlert("Пожалуйста, выберите категорию или факультет.");
        event.preventDefault();
      } else if (!dateInput.value) {
        showAlert("Пожалуйста, выберите дату проведения.");
        event.preventDefault();
      } else if (!messageInput.value.trim()) {
        showAlert("Пожалуйста, введите содержание.");
        event.preventDefault();
      } else {
        const postsContainer = createPostContainer(); // Создаем новый контейнер для постов

        // Создаем новый элемент поста
        const newPost = document.createElement("div");
        newPost.classList.add("post");
        newPost.innerHTML = `
          <h2>${nameInput.value}</h2>
          <p>Date: ${dateInput.value}</p>
          <p>${messageInput.value}</p>
          <p>Category: ${selected}</p>
        `;
        postsContainer.prepend(newPost); // Добавляем пост в начало контейнера

        // Очищаем поля формы после успешной отправки
        nameInput.value = "";
        dateInput.value = "";
        messageInput.value = "";
        buttons.forEach(btn => btn.classList.remove('selected'));
        selected = null;
      }
    });

    function showAlert(message) {
      alert(message);
    }
  }

  handleFormSubmission(themesForm, document.getElementById("selectedFaculty"), null, themesForm.querySelector('input[type="submit"]'));
  handleFormSubmission(eventsForm, null, document.getElementById("selectedCategory"), eventsForm.querySelector('input[type="submit"]'));
});

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");
  const inputContainer = document.querySelector(".input-container");

  searchInput.addEventListener("focus", function() {
      searchIcon.classList.add("hidden");
      inputContainer.classList.add("focus");
  });

  searchInput.addEventListener("blur", function() {
      if (searchInput.value === "") {
          searchIcon.classList.remove("hidden");
          inputContainer.classList.remove("focus");
      }
  });
});


var toggleButtons = document.querySelectorAll(".toggleBtn");
var arrows = document.querySelectorAll(".arrow");

toggleButtons.forEach(function(btn, index) {
  btn.addEventListener("click", function() {
    var content = this.nextElementSibling;
    content.classList.toggle("expanded");
    arrows[index].classList.toggle("open");
  });
});
