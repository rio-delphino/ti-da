document.addEventListener('DOMContentLoaded', function() {
    alert ("外部ファイル sample.js です。\n DOMContentLoaded イベントが発火しました。");
});

window.onload = function() {
    alert ("外部ファイル sample.js です。\n すべてのページ読込が完了しました。");
};

$(window).on("load", function() {
    alert ("外部ファイル sample.js です。\n すべてのページ読込が完了しました。");
});
