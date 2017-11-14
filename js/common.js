function formatDateTime(date) {
  return moment(date).format("MM/DD/YYYY HH:mm");
}

function addCommas(number) {
  var count = 0;
  var finalNumber = "";
  for(var i = number.length - 1; i >= 0; i--) {
    if(count % 3 == 0 && count != 0) {
      finalNumber = number.charAt(i) + "," + finalNumber;
    } else {
      finalNumber = number.charAt(i) + finalNumber;
    }
    count++;
  }
  return finalNumber;
}

function formatAmount(number) {
  number = JSON.stringify(number);
  number = parseFloat(number).toFixed(2);
  var numArr = number.split(".");
  numArr[0] = addCommas(numArr[0]);
  number = numArr[0] + "." + numArr[1];
  return number;
}

function renderTemplate(path, data) {
  var localizedLink = 'assets/templates/' + path;
  var template = JST[localizedLink](data);
  return template;
}