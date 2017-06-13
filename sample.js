// jsファイル読込と同時に実行
alert ("0: 直接記述;");
var $test = $("div:first-child");
if (!$test) {
    alert("null です");
} else {
    alert("div:first-child 見つかりました");
};

// DOMがロードされたら
document.addEventListener('DOMContentLoaded', function() {
    alert ("A: document.addEventListener('DOMContentLoaded', function() { 処理 };");
});

// 読込完了したら
$(document).ready( function() {
    alert ("B: $(document).ready( function() { 処理 };");
});

// もっと後。
window.onload = function() {
    alert ("C1: window.onload = function() { 処理 };");
};

// もっと後。
$(window).on("load", function() {
    alert ("C2: $(window).on('load', function() { 処理 };");
});

 
