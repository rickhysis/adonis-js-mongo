$(document).ready(function () {
  var $table = $("table").find('tbody');
  var $pagination = $("#user-pagination");
  var $modalDelete = $('#modal-delete');
  var $modalEdit = $('#modal-user-edit');
  var $btnDelete = $('#modal-btn-delete');
  var $btnEdit = $('#btn-user-edit');

  $modalEdit.on('shown.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var currentPage = $('.page-item.active').find('a').attr('data-page');

    $btnEdit.click(function (e) {
      e.preventDefault();
      var options = {
        url: "/api/v1/users/" + id,
        method: 'PUT',
        data: $('form').serialize(),
        success: function (result) {
          $table.empty();
          $btnEdit.off("click");
          getUsers(currentPage, 10);
          $modalEdit.modal('toggle');
        },
        error: function (xhr, status, error) {
          console.log(error)
        }
      }
      $.ajax(options);
    })
  })

  $modalDelete.on('shown.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var currentPage = $('.page-item.active').find('a').attr('data-page');
    var pageItem = $('table>tbody>tr').length;
    var page = pageItem % 10 === 1 && currentPage > 1 ? currentPage - 1 : 0;

    $btnDelete.click(function (e) {
      e.preventDefault();
      var options = {
        url: "/api/v1/users/" + id,
        method: 'DELETE',
        success: function (result) {
          $table.empty();
          $btnDelete.off("click");
          getUsers(page, 10);
          $modalDelete.modal('toggle');
        },
        error: function (xhr, status, error) {
          console.log(error)
        }
      }
      $.ajax(options);
    })
  })

  function handleEdit() {
    var $self = $(this);
    var id = $(this).data('id');
    var options = {
      url: "/api/v1/users/" + id,
      method: 'GET',
      success: function (result) {
        $modalEdit.find('input[name="firstname"]').val(result.firstname);
        $modalEdit.find('input[name="lastname"]').val(result.lastname);
        $modalEdit.find('input[name="contact"]').val(result.contact);
        $modalEdit.find('textarea[name="address"]').val(result.address);
        $modalEdit.modal('toggle', $self);
      },
      error: function (xhr, status, error) {
        console.log(error)
      }
    }
    $.ajax(options);
  }

  function handleDelete() {
    $modalDelete.modal('toggle', $(this));
  }

  function renderTable(data) {
    $table
      .append($('<tr>')
        .append($('<td>').text(data.firstname))
        .append($('<td>').text(data.lastname))
        .append($('<td>').text(data.address))
        .append($('<td>').text(data.email))
        .append($('<td>').text(data.contact))
        .append($('<td>').append(
          $('<button>')
          .attr('class', 'btn btn-primary btn-xs btn-edit')
          .attr('data-id', data._id).append(
            $('<span>').attr('class', 'fa fa-pencil')
          ),
        ))
        .append($('<td>').append(
          $('<button>')
          .attr('class', 'btn btn-danger btn-xs btn-delete')
          .attr('data-id', data._id).append(
            $('<span>').attr('class', 'fa fa-trash')
          )
        ))
      )
  }

  function renderPaginationItem(page, text, active = false) {
    $pagination.append(
      $('<li>')
      .attr('class', 'page-item ' + (active ? 'active' : ''))
      .append(
        $('<a>')
        .attr('class', 'page-link')
        .attr('data-page', page)
        .append(text)
      )
    )
  }

  function handlePagination() {
    var selectedPage = $(this).find('a').attr('data-page');
    var currentPage = $(this).closest('ul').find('.active a').attr('data-page');
    var page;

    if (($(this).attr('class')).includes('disabled'))
      return false

    switch (selectedPage) {
      case 'previous':
        page = Number(currentPage) - 1;
        break;

      case 'next':
        page = Number(currentPage) + 1;
        break;

      default:
        page = Number(selectedPage);
        break;
    }

    $table.empty();
    $(this).closest('ul').find('.active').removeClass('active');
    $('a[data-page="' + page + '"]').closest('li').addClass('active');
    getUsers(page, 10);
  }

  function checkPagination(currentPage, totalPage) {
    if (currentPage === 1) {
      $('a[data-page="previous"]').closest('li').addClass('disabled');
    } else {
      $('a[data-page="previous"]').closest('li').removeClass('disabled');
    }

    if (totalPage === currentPage) {
      $('a[data-page="next"]').closest('li').addClass('disabled');
    } else {
      $('a[data-page="next"]').closest('li').removeClass('disabled');
    }
  }

  function renderPagination(totalPage, currentPage) {
    $pagination.empty()

    renderPaginationItem('previous', $('<i>').attr('class', 'fa fa-chevron-left'))

    for (var i = 1; i <= totalPage; i++) {
      renderPaginationItem(i, i, (i === Number(currentPage)))
    }

    renderPaginationItem('next', $('<i>').attr('class', 'fa fa-chevron-right'))

    checkPagination(currentPage, totalPage);
    $(".page-item").unbind("click", handlePagination);
    $(".page-item").bind("click", handlePagination);
  }

  function getUsers(page, limit) {
    var options = {
      url: "/api/v1/users?page=" + page + "&limit=" + limit,
      method: 'GET',
      success: function (result) {
        var data = result.data;
        var total = result.total;
        var totalPage = Number.parseInt(total / limit) + (total % 10 === 0 ? 0 : 1);

        for (var key in data) {
          renderTable(data[key])
        }

        renderPagination(totalPage, page);

        $(".btn-delete").bind("click", handleDelete);
        $(".btn-edit").bind("click", handleEdit);
      },
      error: function (xhr, status, error) {
        console.log(error)
      }
    }
    $.ajax(options);
  }

  getUsers(1, 10);
});
