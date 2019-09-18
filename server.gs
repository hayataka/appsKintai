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

/** emailアドレスをキーとして、作業対象のspreadSheetを決定する
**  emailアドレスはログインしているgoogleアカウント情報から取得する
**
** 引数なし
** @return spreadSheetのキーとなる値　（spreadsheet内に管理している）
** 対象データがない場合はnull
**
**/
function getTargetBook() {
  var email = common_getUserEmail();
  
  // mailToBook スプレッドシートのURL内のキー  
  var id = '1LxsjwkjrtNGVpfnN7wQdzLI2KPup2XtXccI3sssE25I';
  var sheetName = 'address';
  var db = SpreadSheetsSQL.open(id, sheetName);
  // memo: where句に記載する列名は、select句に記載する必要ありだった
  var result = db.select(['email','bookKey']).filter('email = hayakawa@lausol.com').result();
  if (result.length == 0) {
    return null;
  } else {
    var key = result[0].bookKey;
    return key;
  }
}


function getData(inData) {
  var email = common_getUserEmail();
  
}

function helloServer(inData){
  Logger.log("clientからのサーバ呼び出し、引数%s", inData)

  var email = common_getUserEmail();
  inData.user = email; //追加

  // リソース-ライブラリ-MAoZrMsylZMiNUMljU4QtRHEMpGMKinCk  で、
  // https://qiita.com/roana0229/items/fea931fcabc57f193620 をインストールしています
  
  var id = "171Izfj5TBVs9wxwQfYtOQWK3vpUT_P__jSVCAuwDPXs";  
  var name = 'inputSheet';
  var db = SpreadSheetsSQL.open(id, name);
  
  
  db.insertRows([
     inData
    //jsonの配列として複数insertできる excelの１行目列の値をプロパティ名とするobject
  ]);

//  var st2 = SpreadsheetApp.openById(id);
//  Logger.log("test2:%s", st2.getName());
//  Logger.log("test3:%s", st2);


  
  return inData;
}



