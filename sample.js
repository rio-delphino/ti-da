// HTMLがロードされたら
document.addEventListener('DOMContentLoaded', function() {
    alert ("document.addEventListener('DOMContentLoaded', function() { 処理 };");
});

window.onload = function() {
    alert ("window.onload = function() { 処理 };");
};

$(window).on("load", function() {
});

$(document).ready( function() {
    alert ("$(document).ready( function() { 処理 };");
});
