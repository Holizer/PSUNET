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


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");
    const inputContainer = document.querySelector(".input-container");

    searchInput.addEventListener("focus", function () {
        searchIcon.classList.add("hidden");
        inputContainer.classList.add("focus");
    });

    searchInput.addEventListener("blur", function () {
        if (searchInput.value === "") {
            searchIcon.classList.remove("hidden");
            inputContainer.classList.remove("focus");
        }
    });
});

var toggleButtons = document.querySelectorAll(".toggleBtn");
var arrows = document.querySelectorAll(".arrow");

toggleButtons.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
        var content = this.nextElementSibling;
        content.classList.toggle("expanded");
        arrows[index].classList.toggle("open");
    });
});