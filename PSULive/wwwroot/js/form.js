document.addEventListener("DOMContentLoaded", function() {
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
                this.classList.add('selected');
                let selectedCategory = form === eventsForm ? this.getAttribute('data-category') : this.getAttribute('data-faculty');
                hiddenInput.value = selectedCategory;
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
    handleFormSubmission(eventsForm, document.getElementById("selectedCategory"), eventsForm.querySelector('input[type="submit"]'));
    handleFormSubmission(themesForm, document.getElementById("selectedFaculty"), themesForm.querySelector('input[type="submit"]'));
    
});
    
  