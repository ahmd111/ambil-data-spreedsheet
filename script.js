function tambahData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var now = new Date();
  
  sheet.appendRow([
    "Nama_" + Math.floor(Math.random() * 100), 
    "Kelas_" + Math.floor(Math.random() * 12 + 1), 
    now.toLocaleString()
  ]);
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1");
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  // ambil semua data
  var data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // jadikan array of object
  var allData = data.map(function(row) {
    var obj = {};
    for (var i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    return obj;
  });

  // ambil row terakhir
  var latest = allData[allData.length - 1];

  return ContentService.createTextOutput(JSON.stringify({
    latest: latest,
    all: allData
  })).setMimeType(ContentService.MimeType.JSON);
}
