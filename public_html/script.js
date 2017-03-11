/**
 * Created by pawan on 29/1/17.
 */

$(function () {

    var todoList = $('#list');
    var addBtn = $('#addBtn');

    function refreshList(data) {
        console.log(data);
        var listData = "";
        data.forEach(function (val, index) {
            console.log(val);
            listData += "<li class= " + (JSON.parse(val.state) ? "done" : "") + ">" +
                "<input type='checkbox' " + (JSON.parse(val.state) ? "checked" : "") +
                " id='" + index + "'>"
                + "<span style='text-decoration: " + (JSON.parse(val.state) ? "line-through" : "") + "'>" +
                val.todo +
                "</span>" +
                "<button type='button' class='xBtn' >X</button>"
                + "</li>";
        })
        todoList.html(listData);
    }

    todoList.on('click', 'li', setDone);
    todoList.on("click", ".xBtn", cross);

    addBtn.click(function () {
        $.get("/addTodo", {
            "todo": $('#newTodo').val(),
            "state": false
        }, refreshList);
        // window.location = "/t1.html"
    })

    $.get('/fetchTodos', refreshList);

    function setDone(ev) {
        if (ev.target.className == 'xBtn') {
            return;
        }

        var li = $(this);
        var checkbox = $(li.children()[0]);

        if (li.hasClass('done')) {
            checkbox.prop('checked', false);
        }
        else {
            checkbox.prop('checked', true);
        }

        $.get("/setDone", {
            "state": checkbox.prop('checked'),
            'id': checkbox.attr("id"),
        }, function () {
        });

        li.toggleClass('done');
        strikeToggle(li.children('span'));
    }

    function strikeToggle(el) {
        if (el.css('textDecoration') == 'line-through') {
            el.css('textDecoration', "");
        }
        else {
            el.css('textDecoration', "line-through");
        }
    }

    function cross() {
        var chkBox = $($(this).parent().children()[0]);

        $.get("/remove", {
            'id': chkBox.attr("id"),
        }, refreshList);
    }
})

