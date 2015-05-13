/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, FormData: false, History: false */
/*global moment: false, Binder: false, ajax401: false, prefix: false, updateAjaxURL: false*/
/*global selectColumn: false, formLinkColumn: false, titleColumn: false, createdOnColumn: false, updatedOnColumn: false, updatedByColumn: false, sharedWithColumn: false, sharedGroupColumn: false, fnAddFilterFoot: false, sDom: false, sDomNoTools: false, oTableTools: false, fnSelectAll: false, fnDeselect: false, createdByColumn: false, createdOnColumn: false, travelerConfigLinkColumn: false, travelerShareLinkColumn: false, travelerLinkColumn: false, statusColumn: false, deviceColumn: false, fnGetSelected: false, selectEvent: false, filterEvent: false, formShareLinkColumn: false, clonedByColumn: false, deadlineColumn: false, progressColumn: false*/
function travelFromModal() {
  $('#submit').prop('disabled', true);
  $('#return').prop('disabled', true);
  var number = $('#modal .modal-body div').length;
  $('#modal .modal-body div').each(function (index) {
    var that = this;
    var success = false;
    $.ajax({
      url: '/travelers/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        form: this.id
      })
    }).done(function () {
      $(that).prepend('<i class="icon-check"></i>');
      $(that).addClass('text-success');
      success = true;
    }).fail(function (jqXHR, status, error) {
      $(that).prepend('<i class="icon-question"></i>');
      $(that).append(' : ' + jqXHR.responseText);
      $(that).addClass('text-error');
    }).always(function () {
      number = number - 1;
      if (number === 0) {
        $('#return').prop('disabled', false);
      }
    });
  });
}

function archiveFromModal(archive) {
  $('#submit').prop('disabled', true);
  var number = $('#modal .modal-body div').length;
  $('#modal .modal-body div').each(function (index) {
    var that = this;
    var success = false;
    $.ajax({
      url: '/forms/' + that.id + '/archived',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        archived: archive
      })
    }).done(function () {
      $(that).prepend('<i class="icon-check"></i>');
      $(that).addClass('text-success');
      success = true;
    }).fail(function (jqXHR, status, error) {
      $(that).prepend('<i class="icon-question"></i>');
      $(that).append(' : ' + jqXHR.responseText);
      $(that).addClass('text-error');
    }).always(function () {
      number = number - 1;
      if (number === 0 && success) {}
    });
  });
}

function cloneFromModal() {
  $('#submit').prop('disabled', true);
  var number = $('#modal .modal-body div').length;
  $('#modal .modal-body div').each(function (index) {
    var that = this;
    var success = false;
    $.ajax({
      url: '/forms/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        source: this.id
      })
    }).done(function () {
      $(that).prepend('<i class="icon-check"></i>');
      $(that).addClass('text-success');
      success = true;
    }).fail(function (jqXHR, status, error) {
      $(that).prepend('<i class="icon-question"></i>');
      $(that).append(' : ' + jqXHR.responseText);
      $(that).addClass('text-error');
    }).always(function () {
      number = number - 1;
      if (number === 0 && success) {}
    });
  });
}
$(function () {
  ajax401(prefix);
  updateAjaxURL(prefix);
  var formAoColumns = [selectColumn, formLinkColumn, formShareLinkColumn, titleColumn, createdOnColumn, updatedOnColumn, updatedByColumn, sharedWithColumn, sharedGroupColumn];
  var formTable = $('#form-table').dataTable({
    sAjaxSource: '/forms/json',
    sAjaxDataProp: '',
    bAutoWidth: false,
    iDisplayLength: 10,
    aLengthMenu: [
      [10, 50, 100, -1],
      [10, 50, 100, "All"]
    ],
    oLanguage: {
      sLoadingRecords: 'Please wait - loading data from the server ...'
    },
    bDeferRender: true,
    aoColumns: formAoColumns,
    aaSorting: [
      [4, 'desc'],
      [5, 'desc']
    ],
    sDom: sDomNoTools
  });
  fnAddFilterFoot('#form-table', formAoColumns);
  $('#form-select-all').click(function (e) {
    fnSelectAll(formTable, 'row-selected', 'select-row', true);
  });
  $('#form-select-none').click(function (e) {
    fnDeselect(formTable, 'row-selected', 'select-row');
  });
  var sharedFormAoColumns = [formLinkColumn, titleColumn, createdByColumn, createdOnColumn, updatedOnColumn, updatedByColumn, sharedWithColumn, sharedGroupColumn];
  var sharedFormTable = $('#shared-form-table').dataTable({
    sAjaxSource: '/sharedforms/json',
    sAjaxDataProp: '',
    bAutoWidth: false,
    iDisplayLength: 10,
    aLengthMenu: [
      [10, 50, 100, -1],
      [10, 50, 100, "All"]
    ],
    oLanguage: {
      sLoadingRecords: 'Please wait - loading data from the server ...'
    },
    bDeferRender: true,
    aoColumns: sharedFormAoColumns,
    aaSorting: [
      [3, 'desc'],
      [4, 'desc']
    ],
    sDom: sDomNoTools
  });
  fnAddFilterFoot('#shared-form-table', sharedFormAoColumns);
  var groupSharedFormAoColumns = sharedFormAoColumns;
  var groupSharedFormTable = $('#group-shared-form-table').dataTable({
    sAjaxSource: '/groupsharedforms/json',
    sAjaxDataProp: '',
    bAutoWidth: false,
    iDisplayLength: 10,
    aLengthMenu: [
      [10, 50, 100, -1],
      [10, 50, 100, "All"]
    ],
    oLanguage: {
      sLoadingRecords: 'Please wait - loading data from the server ...'
    },
    bDeferRender: true,
    aoColumns: groupSharedFormAoColumns,
    aaSorting: [
      [3, 'desc'],
      [4, 'desc']
    ],
    sDom: sDomNoTools
  });
  fnAddFilterFoot('#group-shared-form-table', groupSharedFormAoColumns);
  var archivedFormAoColumns = [selectColumn, formLinkColumn, formShareLinkColumn, titleColumn, createdOnColumn, updatedOnColumn, updatedByColumn, sharedWithColumn, sharedGroupColumn];
  var archivedFormTable = $('#archived-form-table').dataTable({
    sAjaxSource: '/archivedforms/json',
    sAjaxDataProp: '',
    bAutoWidth: false,
    oLanguage: {
      sLoadingRecords: 'Please wait - loading data from the server ...'
    },
    bDeferRender: true,
    aoColumns: archivedFormAoColumns,
    aaSorting: [
      [4, 'desc'],
      [5, 'desc']
    ],
    sDom: sDomNoTools
  });
  fnAddFilterFoot('#archived-form-table', archivedFormAoColumns);
  // show the tab in hash
  if (History.getHash()) {
    $('.nav-tabs a[href=#' + History.getHash() + ']').tab('show');
  }
  // add state for tab changes
  $('.nav-tabs a').on('click', function (e) {
    History.pushState({
      tab: this.href
    }, 'FRIB traveler :: ' + this.text, this.href);
    // console.log(History.getHash());
  });
  // show the tab when back and forward
  window.onhashchange = function (newURL, oldURL) {
    // console.log(History.getHash());
    if (History.getHash()) {
      $('.nav-tabs a[href=#' + History.getHash() + ']').tab('show');
    }
  };
  $('#form-travel').click(function (e) {
    var selected = fnGetSelected(formTable, 'row-selected');
    if (selected.length === 0) {
      $('#modalLabel').html('Alert');
      $('#modal .modal-body').html('No form has been selected!');
      $('#modal .modal-footer').html('<button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
      $('#modal').modal('show');
    } else {
      $('#modalLabel').html('Create travelers from the following ' + selected.length + ' forms? ');
      $('#modal .modal-body').empty();
      selected.forEach(function (row) {
        var data = formTable.fnGetData(row);
        $('#modal .modal-body').append('<div id="' + data._id + '">' + data.title + '</div>');
      });
      $('#modal .modal-footer').html('<button id="submit" class="btn btn-primary">Confirm</button><button id="return" data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
      $('#modal').modal('show');
      $('#submit').click(function (e) {
        travelFromModal();
      });
    }
  });
  $('#archive').click(function (e) {
    var selected = fnGetSelected(formTable, 'row-selected');
    if (selected.length === 0) {
      $('#modalLabel').html('Alert');
      $('#modal .modal-body').html('No traveler has been selected!');
      $('#modal .modal-footer').html('<button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
      $('#modal').modal('show');
    } else {
      $('#modalLabel').html('Archive the following ' + selected.length + ' travelers? ');
      $('#modal .modal-body').empty();
      selected.forEach(function (row) {
        var data = formTable.fnGetData(row);
        // $('#modal .modal-body').append('<div id="' + data._id + '">' + data.title + ' | ' + formatTravelerStatus(data.status) + '</div>');
      });
      $('#modal .modal-footer').html('<button id="submit" class="btn btn-primary">Confirm</button><button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
      $('#modal').modal('show');
      $('#submit').click(function (e) {
        archiveFromModal(true);
      });
    }
  });
  $('#clone').click(function (e) {
    var selected = fnGetSelected(formTable, 'row-selected');
    if (selected.length === 0) {
      $('#modalLabel').html('Alert');
      $('#modal .modal-body').html('No traveler has been selected!');
      $('#modal .modal-footer').html('<button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
      $('#modal').modal('show');
    } else {
      $('#modalLabel').html('Clone the following ' + selected.length + ' travelers? ');
      $('#modal .modal-body').empty();
      selected.forEach(function (row) {
        var data = formTable.fnGetData(row);
        // $('#modal .modal-body').append('<div id="' + data._id + '">' + data.title + ' | ' + formatTravelerStatus(data.status) + '</div>');
      });
      $('#modal .modal-footer').html('<button id="submit" class="btn btn-primary">Confirm</button><button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
      $('#modal').modal('show');
      $('#submit').click(function (e) {
        cloneFromModal();
      });
    }
  });
  /* $('#dearchive').click(function (e) {
     var selected = fnGetSelected(archivedTravelerTable, 'row-selected');
     if (selected.length === 0) {
       $('#modalLabel').html('Alert');
       $('#modal .modal-body').html('No traveler has been selected!');
       $('#modal .modal-footer').html('<button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
       $('#modal').modal('show');
     } else {
       $('#modalLabel').html('De-archive the following ' + selected.length + ' travelers? ');
       $('#modal .modal-body').empty();
       selected.forEach(function (row) {
         var data = archivedTravelerTable.fnGetData(row);
         $('#modal .modal-body').append('<div id="' + data._id + '">' + data.title + ' | ' + formatTravelerStatus(data.status) + '</div>');
       });
       $('#modal .modal-footer').html('<button id="submit" class="btn btn-primary">Confirm</button><button data-dismiss="modal" aria-hidden="true" class="btn">Return</button>');
       $('#modal').modal('show');
       $('#submit').click(function (e) {
         archiveFromModal(false);
       });
     }
   });*/
  $('#reload').click(function (e) {
    formTable.fnReloadAjax();
    sharedFormTable.fnReloadAjax();
    groupSharedFormTable.fnReloadAjax();
    archivedFormTable.fnReloadAjax();
  });
  // binding events
  selectEvent();
  filterEvent();
});
