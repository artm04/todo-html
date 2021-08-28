// Code for adding, saving and deleting tasks.


// Список задач
let List = $('#tdlApp ul');
let switch_theme = $('.switch_theme');

// Mask for task names. Based on it, elements tdl_1, tdl_2, etc. will be added.
const Mask = 'tdl_';

function showTasks() {
    let Storage_size = localStorage.length;
    // If there are any tasks in localStorage then
    if (Storage_size > 0) {
        // We go through the repository and add tasks from it to the List variable
        for (let i = 0; i < Storage_size; i++) {
            let key = localStorage.key(i);
            if (key.indexOf(Mask) === 0) {
                $('<li></li>').addClass('tdItem')
                    .attr('data-itemid', key)
                    .text(localStorage.getItem(key))
                    .appendTo(List);
            }
        }
    }
}

showTasks();
// Making list items movable
$("ul").sortable().disableSelection();

// Response to keystrokes
$('#tdlApp input').on('keydown', function (e) {
    // If Enter is not pressed, exit the function, otherwise continue
    if (e.keyCode !== 13) return;

    // Extract text from input
    let str = e.target.value;
    e.target.value = "";

    // If the input is not empty, add text from it to a new element
    if (str.length > 0) {

        let number_Id = 0;
        List.children().each(function (index, el) {
            let element_Id = $(el).attr('data-itemid').slice(4);
            if (element_Id > number_Id)
                number_Id = element_Id;
        })

        number_Id++;
        // Add a task to localStorage named tdl_1, tdl_2, etc.
        localStorage.setItem(Mask + number_Id, str);

        // Add tasks from localStorage to the page
        $('<li></li>').addClass('tdItem')
            .attr('data-itemid', Mask + number_Id)
            .text(str).appendTo(List);
    }
});

// If you click on a task - it is erased
$(document).on('click', '.tdItem', function (e) {

    let jet = $(e.target);
    localStorage.removeItem(jet.attr('data-itemid'));
    jet.hide("slide", {}, 400, function () {
        $(this).remove()
    });
    // jet.remove();
})

// Trigger for the button "Clear tasks", it is clear what it does
$(document).on('click', '.clear_tasks', function (e) {
    // We clear the memory so that when the page is refreshed, the tasks do not return
    localStorage.clear();
    // Hide all tasks, and then delete them from the page
    $('li').hide("blind", {}, 400, function () {
        $(this).remove();
    });


})


// Switch themes
$(document).on('click', '.switch_theme', function (e) {
    if (switch_theme.css('background-color') === 'rgb(255, 165, 0)') {
        $('body').animate({
            'background-color': '#1D1A25'
        }, 350);
        $('input').animate({
            'background-color': '#1D1A25'
        }, 350);
        $('.clear_tasks').animate({
            'background-color': '#38216B',
            'border-color': 'black'
        }, 350);
        switch_theme.css('background-color', 'darkblue');
    } else {
        $('body').animate({
            'background-color': 'white'
        }, 350);
        $('input').animate({
            'background-color': 'white'
        }, 350);
        $('.clear_tasks').animate({
            'background-color': '#79EC55',
            'border': '4px double lightgreen',
            'border-color': 'lightgreen'
        }, 350);
        switch_theme.css('background-color', 'orange');
    }
})

