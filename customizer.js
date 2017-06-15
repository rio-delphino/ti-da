
// ************************************************************************
//                               グローバル定数
// ************************************************************************
// 全般
var UNDER_DEVELOPMENT = false // true で開発用の alert 等を表示

// overwriteSubscribe 関数用
var SUBSCRIBE_CLASS = "subscription";
var SUBSCRIBE_NEW_TITLE = "BLOG 読者登録";
var SUBSCRIBE_NEW_DISCRIPTION = "新着記事をメールでお知らせします！";
var SUBSCRIBE_NEW_UNSUBSCRIBE = "<div class='sidebody'>解除は<a href='blog_subscription.php' target='_blank'>こちら</a></div>";

// movePlugins 関数用
var MOVEPLUGINS_PLUGIN_CLASS = "plugin";
var MOVEPLUGINS_BEFOREAD_CLASS = "movePluginsBeforeAd";
var MOVEPLUGINS_MORE_CLASS = "entryBodyMore";
var MOVEPLUGINS_DEST_FIND = "center:last";

// ************************************************************************
//                              グローバル変数
// ************************************************************************
var $ret; // 関数の戻り値用
var $msg; // alert などのメッセージ用

// ************************************************************************
//                          タイミング別で関数を実行
// ************************************************************************

// ------------------------------------------------------------------------
// 0: 当 JavaScript ファイル読込と同時に実行
// ------------------------------------------------------------------------
//この時点で既に中身のHTMLはあるが、操作は不可

// 実行されてるかの確認
if (UNDER_DEVELOPMENT == true) {
    alert ("0: 直接記述;");
};

// ------------------------------------------------------------------------
// 1: HTMLドキュメントのParseが完了、CSS,画像等のサブリソースの読み込みやParseを開始
// ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // 実行されてるかの確認
    if (UNDER_DEVELOPMENT == true) {
        alert ("1: document.addEventListener('DOMContentLoaded', function() { 処理 };");
    };
    
    // ナビゲーションに current クラスを付与
    $ret = setCurrentClass ();

    // 読者登録タグを置換
    $ret = overwriteSubscribe ( SUBSCRIBE_NEW_TITLE, SUBSCRIBE_NEW_DISCRIPTION, SUBSCRIBE_NEW_UNSUBSCRIBE );

    // 位置を変える
    $ret = movePlugins ();

});

// ------------------------------------------------------------------------
// 2: documentのDOM要素が完了したタイミング （＝htmlの終了タグが読み込まれた）
// ------------------------------------------------------------------------
// 複数回実行可能
$(document).ready( function() {
    // 実行されてるかの確認
    if (UNDER_DEVELOPMENT == true) {
        alert ("2: $(document).ready( function() { 処理 };");
    };
});

// ------------------------------------------------------------------------
// 3: onload イベント
// ------------------------------------------------------------------------
// 最後の1回だけ実行される
window.onload = function() {
    if (UNDER_DEVELOPMENT == true) {
        alert ("3A: window.onload = function() { 処理 };");
    };
};

$(window).on("load", function() {
    if (UNDER_DEVELOPMENT == true) {
        alert ("3B: $(window).on('load', function() { 処理 };");
    };
});


// ************************************************************************
//                             ユーザー定義関数
// ************************************************************************

// ------------------------------------------------------------------------
// overwriteSubscribe 関数
// ------------------------------------------------------------------------
// 読者登録のタグを置換します

function overwriteSubscribe ( $newTitle, $newDescription, $newUnsubscribe ) {
    
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


// ------------------------------------------------------------------------
// movePlugins 関数
// ------------------------------------------------------------------------
// 「各記事の下に表示する」のプラグインを適正な位置へ移動する
// １ページに複数のターゲットがある場合でも、そのすべてを各々の適正位置へ移動可。
// ※ プラグインの設定画面で <div class="movePluginsBeforeAd plugin">(表示内容)</div> の形式で囲んである必要あり。
// ※ movePluinBeforeAd を指定できるのは1つのプラグインのみ。 複数のプラグイン移動には現状では非対応。
function movePlugins () {

    var $target;
    var $dest;

    // 移動対象を取得
    $target = $("." + MOVEPLUGINS_BEFOREAD_CLASS);
    if ($target == null) {
        // 見つからなかった場合のエラー処理
        alert ("移動対象が見つかりません");
        return false;
    };

    $target.each(function() { // 見つかったターゲットの個数分のループ＝表示中の全記事分のループ
        // 移動先を取得
        $dest = $target.closest("." + MOVEPLUGINS_MORE_CLASS).find(MOVEPLUGINS_DEST_FIND);
        if ($dest == null) {
            // 見つからなかった場合のエラー処理
            alert ("プラグインの移動先が見つかりません");
            return false;
        };

        // 開発用
        // $msg =
        //     "移動対象のクラス名は " + $target.attr("class") + "\n" +
        //     "移動先のタグは " + $dest.attr("tagName") + "\n移動先のクラス名は " + $dest.attr("class") + "\n移動先のIDは " + $dest.attr("id");
        // alert ($msg);

        // ターゲットを移動先へ移動
        $target.insertBefore($dest);
    });
};

// ------------------------------------------------------------------------
// setCurrentClass 関数
// ------------------------------------------------------------------------
// ナビゲーションタグ内に現在のURLと一致するアイテムがあれば current クラスを付与します。
// ナビは nav -> ul -> li -> a の構造を持つこととします。
function setCurrentClass 関数
    var $url
    var $nav
    var $li
    var $a
    $url = location.href; // 現在の URL を取得
    $nav = $("nav"); // 全ての nav タグを取得
    for each ( $nav ) { // 見つかった全ての nav タグに対するループ
        $li = $nav.find("li"); // nav タグ内のすべての li 要素を取得
        for each ( $li ) { // 全ての li 要素に対するループ
            $a = $li.find("a"); // 子要素の a タグを取得
            if ($a !== null) { // a タグが存在する場合
                if ($a.attr("href") == $url) { // href と現在のURLが一致した場合
                    // a タグと li タグに current クラスを付与
                    $a.addClass("current");
                    $a.parent("li").addClass("current");
                };
            };
        };
    };
};



