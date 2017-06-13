// HTMLがロードされたら
document.addEventListener('DOMContentLoaded', function() {
    alert ("A: document.addEventListener('DOMContentLoaded', function() { 処理 };");
});

window.onload = function() {
    alert ("B: window.onload = function() { 処理 };");
};

$(window).on("load", function() {
    alert ("C: $(window).on('load', function() { 処理 };");
});

$(document).ready( function() {
    alert ("D: $(document).ready( function() { 処理 };");
});
