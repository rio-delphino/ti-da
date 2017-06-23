
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

/* 当JSファイル読込からreformatHTML実行完了までの時間を計測 */
console.time("Timer1: Script Read --> Script Done");

// ------------------------------------------------------------------------
// 1: HTMLドキュメントのParseが完了、CSS,画像等のサブリソースの読み込みやParseを開始
// ------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // 実行されてるかの確認
    if (UNDER_DEVELOPMENT == true) {
        alert ("1: document.addEventListener('DOMContentLoaded', function() { 処理 };");
    };
    
    // 元々はここで関数を呼び出していたが却下 → bodyタグ内末尾で呼び出した方が若干速い。
    // reformatHTML();

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
// reformatHTML 関数
// ------------------------------------------------------------------------
// ページのHTML書換え等に関する全てのユーザー定義関数を実行します。
// ※ body タグ内の末尾で呼び出すこと。

function reformatHTML() {
    
    // ナビゲーションに current クラスを付与
    $ret = setCurrentClass ();

    // 読者登録タグを置換
    $ret = reformatSubscribe ( SUBSCRIBE_NEW_TITLE, SUBSCRIBE_NEW_DISCRIPTION, SUBSCRIBE_NEW_UNSUBSCRIBE );

    // 「個別記事の下」 のプラグインの位置を修正
    $ret = movePluginsAfterArticle ();

    // 「ページの上部」 のプラグインの位置を修正
    $ret = movePluginsOnTop ();
    console.log ($ret);
    
    // 日付・時間を再フォーマット
    $ret = reformatDateTime();
    
    // ありがとうボタンを正しい位置へ
    $ret = moveThanksBtn();
    
    // サイドバーを整形
    // ※ いったん不使用に
    // $ret = reformatSidebar (); 

    /* 当JSファイル読込からreformatHTML実行完了までの時間を計測 */
    console.timeEnd("Timer1: Script Read --> Script Done");
    
};
    
// ------------------------------------------------------------------------
// reformatSubscribe 関数
// ------------------------------------------------------------------------
// 読者登録のタグを置換します

function reformatSubscribe ( $newTitle, $newDescription, $newUnsubscribe ) {
    
    var $target;
    
    // 読者登録の div を取得
    $target = $("div.subscription"); // class だけどページに1つしかないハズ
    if ($target == null) {
        return false; // 対象タグが見つからない場合は処理を中止
    };
    
    // 読者登録の書換え処理
    $target.find(".sidetitle").html($newTitle); // タイトルを書換え
    $target.find(".side .sidebody:eq(0)").html($newDescription); // 説明文 を書換え
    $target.find(".side .sidebody:eq(1)").after($newUnsubscribe); // 解除はこちら を新規挿入
    $target.find(".side .sidebody:eq(3)").insertAfter($target.find(".side .sidebody:eq(1)")); // 読者数 を前へ移動
    return true;
};


// ------------------------------------------------------------------------
// movePluginsAfterArticle 関数
// ------------------------------------------------------------------------
// 「各記事の下に表示する」のプラグインを適正な位置へ移動する
// １ページに複数のターゲットがある場合でも、そのすべてを各々の適正位置へ移動可。
// ※ プラグインの設定画面で <div class="movePluginsAfterArticle plugin">(表示内容)</div> の形式で囲んである必要あり。
// ※ movePluinAfterArticle は複数のプラグインに指定可能。
function movePluginsAfterArticle () {

    var $target;
    var $dest;

    // 移動対象を取得
    $target = $("." + MOVEPLUGINS_BEFOREAD_CLASS);
    if ($target == null) {
        return false; // 見つからなかった場合
    };

    $target.each(function() { // 見つかったターゲットの個数分のループ＝表示中の全記事分のループ
        // 移動先を取得
        $dest = $(this).closest("." + MOVEPLUGINS_MORE_CLASS).find(MOVEPLUGINS_DEST_FIND);
        if ($dest == null) {
            return false; // 見つからなかった場合は終了
        };

        // 開発用
        // $msg =
        //     "移動対象のクラス名は " + $target.attr("class") + "\n" +
        //     "移動先のタグは " + $dest.attr("tagName") + "\n移動先のクラス名は " + $dest.attr("class") + "\n移動先のIDは " + $dest.attr("id");
        // alert ($msg);

        // ターゲットを移動先へ移動
        $(this).insertBefore($dest);
    });
};


var MOVEPLUGINS_ONTOP_CLASS = "movePluginsOnTop";
var MOVEPLUGINS_CONTENTSMAIN_CLASS = "contentsMain"

// ------------------------------------------------------------------------
// movePluginsOnTop 関数
// ------------------------------------------------------------------------
// 「記事一覧の上部に表示する」のプラグインを適正な位置へ移動する
// ※ プラグインの設定画面で <div class="movePluginsOnTop plugin">(表示内容)</div> の形式で囲んである必要あり。

function movePluginsOnTop () {

    var $target;
    var $dest;
    
    // 移動対象を取得
    $target = $("." + MOVEPLUGINS_ONTOP_CLASS);
    if ($target == null) {
        return false; // 見つからなかった場合
    };

    $target.each(function() { // 見つかったターゲットの個数分のループ
        // 移動先を取得
        if ($(this).hasClass("moveAfterNav")) { // グローバルナビの直下へ移動
            $dest = $("#navGlobal");
            if ($dest == null) { return false }; // 見つからなかった場合は終了
            $(this).insertAfter($dest);
            console.log ("movePluginsOnTop 関数が実行されました。 (移動先: moveAfterNav)");
        } else if ($(this).hasClass("moveAfterTopicPath")) { // TopicPath の直下へ移動
            $dest = $("#topicPath");
            if ($dest == null) { return false }; // 見つからなかった場合は終了
            alert ("this = " + $(this).prop("tagName") + ":" + $(this).attr("class"));
            alert ("dest = " + $dest.prop("tagName") + ":" + $dest.attr("class"));
            $(this).insertAfter($dest);
            console.log ("movePluginsOnTop 関数: (移動先: moveAfterTopicPath) new3");
        } else if ($(this).hasClass("moveContentsMainTop")) { // ContentsMainの一番上へ移動
            $dest = $("#contentsMain");
            if ($dest == null) { return false }; // 見つからなかった場合は終了
            $(this).prependTo($dest);
            console.log ("movePluginsOnTop 関数が実行されました。 (移動先: moveContentsMainTop)");
        };
    });
};

// ------------------------------------------------------------------------
// setCurrentClass 関数
// ------------------------------------------------------------------------
// ナビゲーションタグ内に現在のURLと一致するアイテムがあれば current クラスを付与します。
// ナビは nav -> ul -> li -> a の構造を持つこととします。
function setCurrentClass () {
    var $url
    var $a
    $url = location.href; // 現在の URL を取得
    $a = $("nav a"); // nav タグ内のすべての li 内の a 要素を取得 ※ページナビゲーションも含まれます
    $a.each(function() { // 全ての a 要素に対するループ
      if ($(this).attr("href") == $url) { // href と現在のURLが一致した場合
          // a タグと li タグに current クラスを付与
          $(this).addClass("current");
          $(this).parent("li").addClass("current");
      };
    });
};


// ------------------------------------------------------------------------
// reformatSidebar 関数
// ------------------------------------------------------------------------
// サイドバーの整形を行います。これによってクラスやタグが変化しているので要 CSS 編集

function reformatSidebar () {

    var $jpTitle = [
        "読者登録",
        "てぃーだイチオシ",
        "カレンダー",
        "カテゴリー",
        "最新記事",
        "過去記事",
        "最近のコメント",
        "ブログ内検索",
        "お気に入り",
        "QRコード",
        // 10
        "RSSリンク",
        "アクセスカウンタ",
        "プロフィール",
        "最新記事タイトル",
        "オーナーへメール",
        "マイアルバム",
        "新規投稿",
        "タグクラウド",
        "みんなの沖縄旅行",
        "てぃーだからのお知らせ",
        // 20
        "カスタムプラグイン1",
        "カスタムプラグイン2",
        "カスタムプラグイン3",
        "カスタムプラグイン4",
        "カスタムプラグイン5"
    ];
    var $className = [
        "subscription",
        "ichioshi",
        "calender",
        "category",
        "recententry_img",
        "archives",
        "comment",
        "search", // 構造が特殊
        "link",
        "qrcode",
        // 10
        "rss", // 構造が特殊
        "counter", // 構造が特殊
        "profile",
        "recententry",
        "inquiry",
        "album", // 構造が特殊
        "blog_entry", // 構造が特殊
        "tag_cloud",
        "1", // 構造が特殊
        "ad",  // 構造が特殊
        // 20
        "custom1",
        "custom2",
        "custom3",
        "custom4",
        "custom5"
    ];
    var $engTitle = [
        "Subscribe",
        "Recommends",
        "Calender",
        "Category",
        "Recent Entry",
        "Archives",
        "Recent Comments",
        "Blog Search",
        "Favorite Links",
        "QR Code",
        // 10
        "RSS Link",
        "Counter",
        "Profile",
        "Recent Entry",
        "Contact",
        "My Album",
        "Post New Entry",
        "Tag Cloud",
        "Ad",
        "Ti-da Info",
        // 20
        "Custom Plugin 1",
        "Custom Plugin 2",
        "Custom Plugin 3",
        "Custom Plugin 4",
        "Custom Plugin 5"
    ];
    
    var $itemCnt;
    var $i;
    var $root;
    var $target;
    var $html;
    var $ROOT_ID = "contentsSub";
    
    // 3つの配列で数が一致しない場合は終了
    if (($jpTitle.length !== $engTitle.length) || ($jpTitle.length !== $className.length)) {
        return false;
    };
    
    // 配列数分のループ
    $root = $("#" + $ROOT_ID)
    for ($i = 0; $i < $className.length; $i ++) {
        $target = $root.find("." + $className[$i]);
        if ($target !== null) {
            // 対象が見つかった場合
            switch ($className[$i]) {
                case "rss": // rss だけなぜかタイトルが2重になるので回避
                    // html を生成
                    $html = "<div class='sideTitle'><i class='fa fa-circle-o' aria-hidden='true'></i><span class='sideTitleSub'>" + $engTitle[$i] + "</span><span class='sideTitleMain'>" + $jpTitle[$i] + "</span></div>"
                            + "<div class='side'>"; // なぜか div.side が無いので追加
                    // 要素内先頭に挿入
                    $target.prepend($html);
                    // 要素内末尾に挿入 ※ なぜか無かった div.side の〆
                    $html = "</div>";
                    $target.append($html);
                    break;
                /* タイトル部分に関しては他と同じで特別な処理は不要なのでいったんコメントアウト
                case "search":
                    break;
                case "counter":
                    break;
                case "album":
                    break;
                case "blog_entry":
                    break;
                case "1":
                    break;
                case "ad":
                    break;
                */
                default: // 上記以外のクラスの場合、通常の整形処理を行います
// 整形前 <div class="blog_entry"><div class="sidetitle">新規投稿</div>
// 整形後 <div class="blog_entry"><div class="sideTitle"><i class="fa fa-circle-o" aria-hidden="true"></i><span class="sideTitleMain">カテゴリ</span><span class="sideTitleSub">Category</span></div>
                    // div.sidetitle を削除
                    $target.find(".sidetitle").remove();
                    // 替わりとなる html を生成
                    $html = "<div class='sideTitle'><i class='fa fa-circle-o' aria-hidden='true'></i><span class='sideTitleSub'>" + $engTitle[$i] + "</span><span class='sideTitleMain'>" + $jpTitle[$i] + "</span></div>";
                    // 要素内先頭に挿入
                    $target.prepend($html);
                    break;
            };
        };
    };
};

// ------------------------------------------------------------------------
// reformatDateTime 関数
// ------------------------------------------------------------------------
// 日付を整形します。 2017年6月22日 10:00 → 2017-06-22 10:00
// 日付は span.entryDate / span.commentDate、時間は span.entryTime / span.commentTime で囲みます。
// さらに time タグを内部に持つ場合は、その datetime 属性に日時を設定します。

function reformatDateTime() {

    // HTML構造依存の特殊な処理なんでグローバル定数にしない
    var ENTRY_DATETIME_CLASS = ".entryDateTime"; // 記事の日時を格納している要素
    var COMMENT_DATETIME_CLASS = ".commentDateTime"; // コメントの日時を格納している要素
    
    var $target;
    var $dt, $tm;
    var $dtm;
    var $hasTime;
    
    // 投稿
    $target = $(ENTRY_DATETIME_CLASS); // 日時を格納している要素を取得
    // 要素分の繰り返し処理
    $target.each( function() {
        // 日付・時間を取得
        $dt = $(this).find(".entryDate").text().toString();
        $tm = $(this).find(".entryTime").text().toString();
        // "年月日" を "-" で置換
        $dt = $dt.replace(/年|月/g, "-");
        $dt = $dt.replace(/日/g, "");
        $(this).find(".entryDate").text($dt);
        
        $hasTime = $(this).find("time");
        if ($hasTime !== null) {
            // time 要素で囲われている場合
            $hasTime.attr("datetime", $dt + " " + $tm + "+09:00"); // datetime 属性を追加
        };
    });
    
    // コメント
    $target = $(COMMENT_DATETIME_CLASS); // 日時を格納している要素を取得
    // 要素分の繰り返し処理
    $target.each( function() {
        $dtm = $(this).html().split(" "); // 日付・時刻を配列に分けて取得
        $dt = $dtm[0]; // 日付を取得
        $tm = $dtm[1]; // 時間を取得
        // "年月日" を "-" で置換
        $dt = $dt.replace(/年|月/g, "-");
        $dt = $dt.replace(/日/g, "");
        $(this).html("<span class='commentDate'>" + $dt + "</span><span class='commentTime'>" + $tm + "</span>"); // 一応 span で囲んどく
    });
};

// ------------------------------------------------------------------------
// moveThanksBtn 関数
// ------------------------------------------------------------------------
// なぜか挿入位置が不正な Thanks ボタンを正しい位置へ移動させます
function moveThanksBtn() {
    var THANKS_BUTTON_ID = "thanks_button_box";
    var SOCIAL_BUTTON_CLASS = "c3_social_buton";
    var $target, $dest;
    $dest = $("." + SOCIAL_BUTTON_CLASS + " ul");
    $target = $("li#" + THANKS_BUTTON_ID);
    if ($dest == null || $target == null) {
        return false; // どちらかが見つからない場合は終了
    };
    $target.appendTo($dest);
};
