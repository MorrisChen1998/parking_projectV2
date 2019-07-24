var validator;

$(function () {

  $("#window").kendoWindow({
    width: "480px",
    title: "選擇條件",
    visible: false,
    resizable: false,
    actions: []
  });

  $("#date").kendoDatePicker({
    min: new Date(),
    max: getThreeDayAfter(),
    format: "yyyy-MM-dd",
    value: new Date()
  });

  $("#time").kendoTimePicker({
    interval: 5,
    dateInput: true,
    value: getFewMinutesAfter()
  });
           //attr(typing,picker)
  $("#date").attr("readonly", true);
  $("#time").attr("readonly", true);

  var data = [
    { text: "資料庫", value: "database" },
    { text: "網際網路", value: "internet" },
    { text: "應用系統整合", value: "system" },
    { text: "家庭保健", value: "home" },
    { text: "語言", value: "language" }
  ]
  $("#place").kendoComboBox({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: data,
    filter: "contains",
    index: 0
  });

  var map = $("#map");
  map.tinyMap({
      'zoom'  : 14,
      'autoLocation': function (loc) {
          map.tinyMap('modify', {
              'marker': [{
                  'addr': [
                      loc.coords.latitude,
                      loc.coords.longitude
                  ]
              }]
          });
      }
  });
  
  $("#openButton").kendoButton().click(function () {
    $("#window").data("kendoWindow").center().open();
  });

  $("#searchButton").kendoButton().click(function () {
    if (!validate()) {
      alert("查無此地");
      return;
    }
    $("#window").data("kendoWindow").close();
    
  });

  $("#cancelButton").kendoButton().click(function () {
    $("#window").data("kendoWindow").close();
  });

})

function getThreeDayAfter() {
  var threeDay = new Date();
  threeDay.setDate(threeDay.getDate() + 2);
  return threeDay;
}

function getFewMinutesAfter() {
  var fiveMinute = new Date();
  fiveMinute.setMinutes((parseInt(fiveMinute.getMinutes() / 5)) * 5 + 5);
  return fiveMinute;
}

function validate() {
  var place = $("#place").kendoValidator({
    rules: {
      listCheck: function (input) {
        var list = $("#place").data("kendoComboBox").dataSource.data();
        var check = list.find(function (attr) {
          return attr.text == input.context.value
            || attr.value == input.context.value;
        });
        return !(check === undefined);
      }
    },
    errorTemplate: ""
  }).data("kendoValidator").validate();
  
  return place;
}
