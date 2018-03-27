var greyRead = document.getElementById("read");
var colorPicker = document.getElementById("custom");

var buttonColorful = document.getElementById("colorful");
var buttonSingleColor = document.getElementById("singlecolor");

chrome.storage.sync.get(['color', 'useCustom', 'greyRead'], function(value) {
  greyRead.checked = value.greyRead;

  colorPicker.value = value.color;
  updatePreviewColor(value.color);
  updateReadPreviewColor(value.greyRead);

  if (value.useCustom) {
    buttonSingleColor.classList.add("selected");
  } else {
    buttonColorful.classList.add("selected");
  }
});

buttonColorful.onclick = function(event) {
  buttonSingleColor.classList.remove("selected");
  buttonColorful.classList.add("selected");
  chrome.storage.sync.set({ useCustom: false })
}

buttonSingleColor.onclick = function(event) {
  buttonSingleColor.classList.add("selected");
  buttonColorful.classList.remove("selected");
  chrome.storage.sync.set({ useCustom: true })
}

colorPicker.onchange = function(element) {
  chrome.storage.sync.set({ color: element.target.value });
  updatePreviewColor(element.target.value);
}

greyRead.onchange = function(element) {
  chrome.storage.sync.set({ greyRead: element.target.checked });
  updateReadPreviewColor(element.target.checked);
}

function updateReadPreviewColor(customized) {
  document.querySelectorAll(".placeholder.read").forEach(function(read) {
    if (customized) {
      read.classList.add("customized")
    } else {
      read.classList.remove("customized")
    }
  });
}

function updatePreviewColor(color) {
  buttonSingleColor.querySelectorAll(".placeholder").forEach(function(placeholder) {
    placeholder.style.setProperty('background-color', color);
  });
}
