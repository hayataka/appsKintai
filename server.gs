/**
GASでは、決められた関数名でスクリプトを作成すると
何らかのイベント発生時にそのスクリプトを実行させることができる（シンプルトリガー）
時限式はインストーラブルトリガー　https://tonari-it.com/gas-timed-driven-trigger/

GASでWebページを表示する場合、セキュリティ上の理由から、直接ブラウザにHTMLを表示することはせずに、Googleのほうで「サニタイズ」という処理を施してからブラウザに渡す
そのためのルール

修正したあと確認する時、スマホからの場合は「公開」のなかで都度「新しいバージョン」にした方が良い
**/
function doGet() {
 //  return HtmlService.createHtmlOutputFromFile('index');
  var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
  // gasでは、headタグ内のいくつかのタグは無効化されている
  // faviconでは拡張子の指定も必要で、　&.pngで記述
  htmlOutput
    .setTitle("勤怠入力")
    .setFaviconUrl("https://drive.google.com/uc?id=1MsdThxoZQ9UVCQrTRjaQtgxvUQmGJeNZ&.png")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}


function helloServer(val){
  Logger.log("clientからのサーバ呼び出し、引数%s", val)
  var data = {
    id : 10
    ,name :"太郎"
  };

  /**スクリプト作成者本人、スクリプトエディタから実行、Gsuiteユーザが開発したスクリプト、かつ、同ドメインのユーザがスクリプト実行
  webアプリケーションとして実行中に「次のユーザとしてアプリケーションを実行」を「アプリにアクセスしているユーザ」に設定している
  のどれかの条件の時**/  
  var usr = Session.getActiveUser();
  Logger.log("usr:%s", usr);
  var email = usr.getEmail();
  
  var st2 = SpreadsheetApp.openById("171Izfj5TBVs9wxwQfYtOQWK3vpUT_P__jSVCAuwDPXs");
  Logger.log("test2:%s", st2.getName());
  Logger.log("test3:%s", st2);
  
  return data;
}


