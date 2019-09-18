// 同一プロジェクト内の別gsファイルに書かれた内容は、単純に関数呼び出しでそのまま呼べる
// 規約を勝手に作成すると、呼び出される側の関数は関数名の頭に何かしらprefixつける

function common_getUserEmail() {
  /**スクリプト作成者本人、スクリプトエディタから実行、Gsuiteユーザが開発したスクリプト、かつ、同ドメインのユーザがスクリプト実行
  webアプリケーションとして実行中に「次のユーザとしてアプリケーションを実行」を「アプリにアクセスしているユーザ」に設定している
  のどれかの条件の時**/  
  var usr = Session.getActiveUser();
  var email = usr.getEmail();
  Logger.log("email:%s", email);

  return email;    
}


function myFunction() {
      Logger.log("呼べたよ");  
}
