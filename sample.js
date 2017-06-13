// HTMLがロードされたら
document.addEventListener('DOMContentLoaded', function() {
    alert ("A: document.addEventListener('DOMContentLoaded', function() { 処理 };");
});

$(document).ready( function() {
    alert ("B: $(document).ready( function() { 処理 };");
});

window.onload = function() {
    alert ("C1: window.onload = function() { 処理 };");
};

$(window).on("load", function() {
    alert ("C2: $(window).on('load', function() { 処理 };");
});

