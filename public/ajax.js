$('#new-todo-form').submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post('/todos', formData, function (data) {
        $('#todo-list').append(
            `
            <li class="list-group-item">
						<span class="lead">
							${data.text}
						</span>
						<div class="pull-right">
							<a href="/todos/${data._id}/edit" class="btn btn-sm btn-warning">Edit</a>
							<form style="display: inline" method="POST" action="/todos/${data._id}">
								<button type="submit" class="btn btn-sm btn-danger">Delete</button>
							</form>
						</div>
						<div class="clearfix"></div>
					</li>
            `
        )
    });
    $(this).find('.form-control').val('');
});

$('#todo-list').on('click', '.edit-button', function () {
    $(this).parent().siblings('.edit-item-form').toggle();
});

$("#todo-list").on('submit', '.edit-item-form', function (e) {
    e.preventDefault();
    var todoItem = $(this).serialize();
    var actionUrl = $(this).attr('action');
    $originalItem = $(this).parent('.list-group-item');
    $.ajax({
        url: actionUrl,
        data: todoItem,
        type: 'PUT',
        originalItem: $originalItem,
        success: function (data) {
            this.originalItem.html(
                `
                <form action="/todos/${data._id}" method="POST" class="edit-item-form">
							<div class="form-group">
								<label>Item Text</label>
								<input type="text" value="${data.text}" name="todo[text]" class="form-control">
							</div>
							<button class="btn btn-primary">Update Item</button>
						</form>
						<span class="lead">
							${data.text}
						</span>
						<div class="pull-right">
							<button class="btn btn-sm btn-warning edit-button" >Edit </button> 
							<form style="display: inline" method="POST" action="/todos/${data._id}">
								<button type="submit" class="btn btn-sm btn-danger">Delete</button>
							</form>
						</div>
						<div class="clearfix"></div>
                `
            )
        }
    });
});