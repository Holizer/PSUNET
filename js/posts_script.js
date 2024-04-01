document.addEventListener("DOMContentLoaded", function() {
    const themesForm = document.getElementById("ThemesForm");
    const eventsForm = document.getElementById("EventsForm");

    function handleFormSubmission(form, hiddenInput, submitButton) {
        let buttons = form.querySelectorAll('.btn_group button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
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
    /*
    function createPost() {
        // Создаем новый элемент div для поста
        var postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <div class="post__inf">
            <div class="user__info">
                <img class="user_img" src="img/user_img.png" alt="">
                <div class="user_details">
                    <div class="user_name">Тима Петухов</div>
                    <div class="time_of_creation">недавно</div>
                </div>
            </div>
            <div class="post__content">
                <h2>Прием документов на  военную кафедру 2024!</h2>
                <p>В Полоцком государственном университете имени Евфросинии Полоцкой стартовал прием документов для обучения на военной кафедре. Студенты факультета информационных технологий и юридического факультета уже подали заявления в приемную комиссию и рассказали, почему приняли это решение...</p>
            </div>
            <div class="post__items">
                <div class="likes">
                    <button class="icon">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4344 6.00005H16.5134C16.9343 6.00005 17.338 6.15809 17.6357 6.43939C17.9333 6.72069 18.1006 7.10223 18.1006 7.50005V9.07805C18.1008 9.27407 18.0603 9.46823 17.9815 9.64955L15.5254 15.2858C15.4654 15.4232 15.3637 15.5407 15.233 15.6234C15.1023 15.706 14.9485 15.7501 14.7913 15.7501H1.43513C1.22466 15.7501 1.02281 15.671 0.873978 15.5304C0.725151 15.3897 0.641541 15.199 0.641541 15.0001V7.50005C0.641541 7.30114 0.725151 7.11037 0.873978 6.96972C1.02281 6.82907 1.22466 6.75005 1.43513 6.75005H4.19842C4.32547 6.75008 4.45067 6.72128 4.5635 6.66608C4.67632 6.61087 4.77347 6.53087 4.84678 6.4328L9.17424 0.63755C9.22894 0.564284 9.30962 0.51197 9.40163 0.490093C9.49365 0.468215 9.59091 0.478222 9.67579 0.5183L11.1154 1.19855C11.5205 1.38992 11.8441 1.70654 12.0325 2.09579C12.2209 2.48504 12.2627 2.92349 12.151 3.3383L11.4344 6.00005ZM5.40309 7.94105V14.2501H14.2596L16.5134 9.07805V7.50005H11.4344C11.1927 7.50002 10.9541 7.4478 10.737 7.34739C10.5199 7.24698 10.3299 7.10103 10.1815 6.92066C10.0332 6.7403 9.93036 6.53029 9.88094 6.30667C9.83153 6.08304 9.83682 5.8517 9.89641 5.6303L10.613 2.9693C10.6354 2.8863 10.6271 2.79854 10.5894 2.72062C10.5518 2.64271 10.487 2.57934 10.4059 2.54105L9.88133 2.29355L6.14351 7.29755C5.94511 7.56305 5.69116 7.78055 5.40309 7.94105ZM3.81591 8.25005H2.22872V14.2501H3.81591V8.25005Z" fill="black" />
                        </svg>
                    </button>
                    <span>3</span>
                </div>
                <div class="comments">
                    <button class="icon">
                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.93589 0.25H10.1103C11.794 0.25 13.4089 0.882141 14.5995 2.00736C15.7901 3.13258 16.459 4.6587 16.459 6.25C16.459 7.8413 15.7901 9.36742 14.5995 10.4926C13.4089 11.6179 11.794 12.25 10.1103 12.25V14.875C6.1423 13.375 0.587158 11.125 0.587158 6.25C0.587158 4.6587 1.25604 3.13258 2.44666 2.00736C3.63728 0.882141 5.2521 0.25 6.93589 0.25ZM8.52307 10.75H10.1103C10.7356 10.75 11.3547 10.6336 11.9324 10.4075C12.5101 10.1813 13.035 9.84984 13.4772 9.43198C13.9193 9.01412 14.2701 8.51804 14.5094 7.97208C14.7486 7.42611 14.8718 6.84095 14.8718 6.25C14.8718 5.65905 14.7486 5.07389 14.5094 4.52792C14.2701 3.98196 13.9193 3.48588 13.4772 3.06802C13.035 2.65016 12.5101 2.31869 11.9324 2.09254C11.3547 1.8664 10.7356 1.75 10.1103 1.75H6.93589C5.67305 1.75 4.46193 2.22411 3.56897 3.06802C2.676 3.91193 2.17434 5.05653 2.17434 6.25C2.17434 8.9575 4.12816 10.7245 8.52307 12.61V10.75Z" fill="black" />
                        </svg>
                    </button>
                    <span>3</span>
                </div>
                <div class="favorites">
                    <button class="icon">
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.66395 0.5H12.7742C12.9847 0.5 13.1866 0.579018 13.3354 0.71967C13.4842 0.860322 13.5678 1.05109 13.5678 1.25V15.6073C13.5679 15.6743 13.549 15.7402 13.513 15.7979C13.477 15.8557 13.4253 15.9033 13.3632 15.9358C13.3011 15.9683 13.231 15.9844 13.16 15.9826C13.0891 15.9807 13.02 15.9609 12.9599 15.9252L7.21909 12.5225L1.47825 15.9245C1.41823 15.9601 1.3492 15.9799 1.27835 15.9818C1.20749 15.9837 1.13739 15.9676 1.07534 15.9352C1.01329 15.9029 0.96155 15.8554 0.925502 15.7977C0.889454 15.74 0.870414 15.6742 0.870361 15.6073V1.25C0.870361 1.05109 0.953972 0.860322 1.1028 0.71967C1.25163 0.579018 1.45348 0.5 1.66395 0.5ZM11.9806 2H2.45754V13.574L7.21909 10.7533L11.9806 13.574V2Z" fill="black" />
                        </svg>
                    </button>
                    <span>3</span>
                </div>
            </div>
            <div class="post__category_img">
                <img src="img/PsuLogo.svg" alt="">
            </div>
            <div class="post__category_text">
                ПГУ
            </div>
            </div>
        `;
        // Находим контейнер для постов
        var postsContainer = document.querySelector('.posts-container');
        // Добавляем созданный пост в контейнер для постов
        postsContainer.appendChild(postDiv);
    }
    */
    handleFormSubmission(themesForm, document.getElementById("selectedFaculty"), themesForm.querySelector('input[type="submit"]'));
    handleFormSubmission(eventsForm, document.getElementById("selectedCategory"), eventsForm.querySelector('input[type="submit"]'));
});