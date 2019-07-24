var validator;
var mapMarkers = [];

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
    { text: "八德區廣福路42號", value: 1 },
    { text: "八德區大忠街141號", value: 2 },
    { text: "八德區福國北街220號", value: 3 },
    { text: "八德區桃德路100巷與公園路口", value: 4 },
    { text: "八德區桃德路與廣豐二街口", value: 5 }
  ]
  data.forEach(function (column) {
    mapMarkers.push(getMapPin(column.text));
  });
  
  $("#place").kendoComboBox({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: data,
    filter: "contains",
    index: 0
  });

  var map = $("#map");
  map.tinyMap({
    autoLocation: function (loc) {
      map.tinyMap('modify', {
        marker: [{
          addr: [
            loc.coords.latitude,
            loc.coords.longitude
          ],
          text: "<label class='map-message'>你的所在位置</label>"
        }]
      });
      console.log(loc);
    },
    center: mapMarkers[0].addr,
    marker: mapMarkers,
    zoom: 11,

  });

  $("#openButton").kendoButton().click(function () {
    $("#window").data("kendoWindow").center().open();
  });

  $("#searchButton").kendoButton().click(function () {
    if (!validate()) {
      alert("查無此地");
      return;
    }
    var address = getMapPin($("#place").data("kendoComboBox").text());
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

function getMapPin(address) {
  return {
    addr: address,
    text: "<label class='map-message'>" + address + "</label>"
  }
}