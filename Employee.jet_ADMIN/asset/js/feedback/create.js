$(document).ready(function () {
    let id = 3;
    let addNewQuestionBtn = document.getElementById('addNewQuestionBtn');
    addNewQuestionBtn.addEventListener('click', function (e) {
        console.log('add new question');
        e.preventDefault();
        let parent = document.getElementsByClassName('questions');
        let elementToAdd = $(`<div class="card mt-4" id="q1">
    <div class="card-header">
        Question ${id}
    </div>
    <div class="card-body">
        <div class="form-floating mb-3">
            <input type="text" class="form-control" name="questions[]" id="q${id}-question" placeholder="-">
            <label for="q${id}-question">Question</label>
        </div>
        <select id="q${id}-type" name=types[] class="form-select" aria-label="Default select example">
            <option selected>Type </option>
            <option value="rating">Rating</option>
            <option value="binary">Binary( Y/N)</option>
        </select>
    </div>
</div>`);
        $('.questions').append(elementToAdd);
        id++;
    })
});