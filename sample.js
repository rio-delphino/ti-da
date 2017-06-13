// ------------------------------------------------------------------------
// グローバル定数
// ------------------------------------------------------------------------
// 読者登録タグの置換
var SUBSCRIBE_NEW_TITLE = "BLOG 読者登録";
var SUBSCRIBE_NEW_DISCRIPTION = "新着記事をメールでお知らせします！";
var SUBSCRIBE_NEW_UNSUBSCRIBE = "<div class='sidebody'>解除は<a href='blog_subscription.php' target='_blank'>こちら</a></div>";

// ------------------------------------------------------------------------
// グローバル変数
// ------------------------------------------------------------------------
var $ret; // 関数の戻り値用

// ------------------------------------------------------------------------
// jsファイル読込と同時に実行
// ------------------------------------------------------------------------
alert ("0: 直接記述;");
var $test = $("div.subscription");
if (!$test) {
    alert("null です");
} else {
    alert("div.subscription が見つかりました"); //この時点で既に中身のHTMLはあるらしいが、操作できず。
};

// ------------------------------------------------------------------------
// DOMがロードされたら
// ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    alert ("A: document.addEventListener('DOMContentLoaded', function() { 処理 };");

    alert ("correctSubscribe を呼び出す手前"); //★★★
    // 読者登録タグを置換
    $ret = correctSubscribe ( SUBSCRIBE_NEW_TITLE, SUBSCRIBE_NEW_DISCRIPTION, SUBSCRIBE_NEW_UNSUBSCRIBE );
});

// ------------------------------------------------------------------------
// 読込完了したら
// ------------------------------------------------------------------------
$(document).ready( function() {
    alert ("B: $(document).ready( function() { 処理 };");
});

// ------------------------------------------------------------------------
// もっと後。
// ------------------------------------------------------------------------
window.onload = function() {
    alert ("C1: window.onload = function() { 処理 };");
};

// もっと後。
$(window).on("load", function() {
    alert ("C2: $(window).on('load', function() { 処理 };");
});
 
// ------------------------------------------------------------------------
// correctSubscribe 関数 : 読者登録のタグを置換します
// ------------------------------------------------------------------------
function correctSubscribe ( $newTitle, $newDescription, $newUnsubscribe ) {
    alert ("correctSubscribe が呼び出されました"); //★★★
    var $target;
    
    // 読者登録の div を取得
    $target = $("div.subscription"); // class だけどページに1つしかないハズ
    if ($target == null) {
        return false; // 対象タグが見つからない場合は処理を中止
        exit;
    };
    
    // 読者登録の書換え処理
    $target.find(".sidetitle").html($newTitle); // タイトルを書換え
    $target.find(".side .sidebody:eq(0)").html($newDescription); // 説明文 を書換え
    $target.find(".side .sidebody:eq(1)").after($newUnsubscribe); // 解除はこちら を新規挿入
    $target.find(".side .sidebody:eq(3)").insertAfter($target.find(".side .sidebody:eq(1)")); // 読者数 を前へ移動
    return true;
};
