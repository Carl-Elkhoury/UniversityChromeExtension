let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
changeColor.onclick = function(element) {
    fetch('http://www.localhost:5270/').then((result) => {
    result.text().then((js) => {
        let mainDiv = document.getElementById('mainDiv');
        mainDiv.innerHTML = js;
    })});
};