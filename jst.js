this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/view-amount-column.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div>\n  <a class="button view-wallet-log" data-user-id="' +
((__t = ( user.id )) == null ? '' : __t) +
'" data-user-name="' +
((__t = ( user.first_name + ' ' + user.last_name )) == null ? '' : __t) +
'"\n    data-user-email="' +
((__t = ( user.email )) == null ? '' : __t) +
'">\n    <span class="row-wallet">\n    ';
 if(amount !== 0) { ;
__p += '\n      <span class="green">&#8369; ' +
((__t = ( formatAmount(amount) )) == null ? '' : __t) +
'</span>\n    ';
 } else { ;
__p += '\n      <span class="red">&#8369; ' +
((__t = ( formatAmount(amount) )) == null ? '' : __t) +
'</span>\n    ';
 } ;
__p += '\n    </span>\n  </a>\n  \n  <div class="modal fade log-modal" id="view-wallet-modal-' +
((__t = ( user.id )) == null ? '' : __t) +
'" tabindex="-1" role="dialog">\n    <div id="view-wallet-modal-jst-' +
((__t = ( user.id )) == null ? '' : __t) +
'"></div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/view-wallet-column.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div>\n  <a class="button view-wallet-log" data-user-id="' +
((__t = ( id )) == null ? '' : __t) +
'" data-user-name="' +
((__t = ( first_name + ' ' + last_name )) == null ? '' : __t) +
'"\n    data-user-email="' +
((__t = ( email )) == null ? '' : __t) +
'">\n    <span class="row-wallet">\n    ';
 if(wallet.amount !== 0) { ;
__p += '\n      <span class="green">&#8369; ' +
((__t = ( formatAmount(wallet.amount) )) == null ? '' : __t) +
'</span>\n    ';
 } else { ;
__p += '\n      <span class="red">&#8369; ' +
((__t = ( formatAmount(wallet.amount) )) == null ? '' : __t) +
'</span>\n    ';
 } ;
__p += '\n    </span>\n  </a>\n  \n  <div class="modal fade log-modal" id="view-wallet-modal-' +
((__t = ( id )) == null ? '' : __t) +
'" tabindex="-1" role="dialog">\n    <div id="view-wallet-modal-jst-' +
((__t = ( id )) == null ? '' : __t) +
'"></div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/view-wallet-modal.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n    <h4 class="modal-title">Wallet Logs for ' +
((__t = ( name )) == null ? '' : __t) +
'</h4>\n    <p class="modal-title">' +
((__t = ( email )) == null ? '' : __t) +
'</p>\n  </div>\n  <div>\n    <div class="row no-m">\n      <div class="topbar">\n        <div class="col-md-6 no-padding-lr">\n          <div class="input-group input-filter">\n            <span class="input-group-addon" id="s">Search </span>\n            <input id="search-' +
((__t = ( id )) == null ? '' : __t) +
'" type="text" class="form-control transactions-filter" placeholder="Type any keyword" aria-describedby="s">\n          </div>\n        </div>\n        <div class="col-md-2">\n          <div class="input-group input-filter">\n            <input id="sort-' +
((__t = ( id )) == null ? '' : __t) +
'" type="text" class="form-control transactions-filter" placeholder="Sort">\n          </div>\n        </div>\n        <div class="col-md-4 text-right" id="updateTable-container">\n          <span class="glyphicon glyphicon-repeat updateTransactionTable" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Update Data"></span> Last updated: <span id="latest-updated-' +
((__t = ( id )) == null ? '' : __t) +
'"></span>\n        </div>\n        <br>\n      </div>\n    </div>\n    <div class="content-frame">\n      <div class="row">\n        <table id="transactions-table-' +
((__t = ( id )) == null ? '' : __t) +
'" class="display" cellspacing="0" width="100%">\n          <thead>\n            <tr>\n              <th>Date Created</th>\n              <th>Amount (PHP)</th>\n              <th>Type</th>\n              <th>Source</th>\n              <th>Details</th>\n            </tr>\n          </thead>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n\n<script>\n$(document).ready(function() {\n  window[\'' +
((__t = ( id )) == null ? '' : __t) +
'-transactions-table\'] = $(\'#transactions-table-' +
((__t = ( id )) == null ? '' : __t) +
'\').DataTable({\n    processing: true,\n    serverSide: true,\n    bFilter: false,\n    orderClasses: false,\n    iDisplayLength: 10,\n    iDisplayStart: 0,\n    ajax: {\n      url: \'/v1/transactions\',\n      error: function(xhr, error, thrown) {\n        handleUnauthorizedError(xhr);\n        errorAlert.showMessage(\'[Error] Failed to get the list.\');\n      },\n      dataFilter: function(data) {\n        $(\'#latest-updated-' +
((__t = ( id )) == null ? '' : __t) +
'\').text(formatDateTime(new Date()));\n        var json = jQuery.parseJSON(data);\n        json.recordsTotal = json.count;\n        json.recordsFiltered = json.count;\n        json.data = json.data;\n        return JSON.stringify(json);\n      }\n    },\n    fnServerParams: function(data) {\n      updateTransactionsFilter(data);\n    },\n    columns: [\n      { data: function(row, type, val, meta) { return formatDateTime(row.createdAt) }, orderable: true },\n      { data: function(row, type, val, meta) { \n        if(row.amount >= 0) {\n          return \'<span class="green">\' + formatAmount(row.amount) + \'</span>\';\n        } else {\n          return \'<span class="red">(\' + formatAmount(row.amount * -1) + \')</span>\';\n        }\n      }, orderable: false },\n      { data: function(row, type, val, meta) { return row.type }, orderable: false },\n      { data: function(row, type, val, meta) { return row.source }, orderable: false },\n      { data: function(row, type, val, meta) { return row.details }, orderable: false },\n    ]\n  });\n\n\t$(document).on(\'click\', \'.updateTransactionTable\', function(e) {\n\t  window[\'' +
((__t = ( id )) == null ? '' : __t) +
'-transactions-table\'].draw();\n\t});\n  \n  $(document).on(\'change\', \'.transactions-filter\', function(e) {\n    window[\'' +
((__t = ( id )) == null ? '' : __t) +
'-transactions-table\'].draw();\n  });\n\t\n});\n\n\nfunction updateTransactionsFilter(data) {\n  data.limit = data.length;\n  data.offset = data.start;\n  if($("#search-' +
((__t = ( id )) == null ? '' : __t) +
'").val().trim() !== \'\') {\n    data.q = $("#search-' +
((__t = ( id )) == null ? '' : __t) +
'").val().trim();\n  }\n  if($("#sort-' +
((__t = ( id )) == null ? '' : __t) +
'").val() !== \'\') {\n    data.sort = $("#sort-' +
((__t = ( id )) == null ? '' : __t) +
'").val();\n  }\n  data.user = \'' +
((__t = ( id )) == null ? '' : __t) +
'\';\n  delete data.draw;\n  delete data.columns;\n  delete data.order;\n  delete data.start;\n  delete data.length;\n  delete data.search;\n  delete data._;\n}\n</script>';

}
return __p
};

this["JST"]["assets/templates/withdraw-request-status-column.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<select class="w-request-status" requestId="' +
((__t = ( id )) == null ? '' : __t) +
'">\n  <option value="0"\n  ';
 if(status === 0) { ;
__p += '\n    selected\n  ';
 } ;
__p += '\n  >Pending</option>\n  <option value="1"\n  ';
 if(status === 1) { ;
__p += '\n    selected\n  ';
 } ;
__p += '\n  >Approved</option>\n  <option value="2"\n  ';
 if(status === 2) { ;
__p += '\n    selected\n  ';
 } ;
__p += '\n  >Processed</option>\n  <option value="-1"\n  ';
 if(status === -1) { ;
__p += '\n    selected\n  ';
 } ;
__p += '\n  >Denied</option>\n  <option value="-2"\n  ';
 if(status === -2) { ;
__p += '\n    selected\n  ';
 } ;
__p += '\n  >Cancelled</option>\n</select>';

}
return __p
};