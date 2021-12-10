//=============================================================================
// MAT_AnTaresRemastere.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.01 能力値振りプラグイン
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @orderAfter ChangeWindowTouchPolicy
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param ActorAnTarescondition
 * @desc アクター個別設定
 * 設定がないアクターは代わりに先頭のデータを使います。
 * @type struct<ActorAnTaresconditionData>[]
 * @default ["{\"targetId\":\"0\",\"showpicture\":\"Actor1_1\",\"ActorAnTaresParamcondition\":\"[\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\"}","{\"targetId\":\"1\",\"showpicture\":\"Actor1_1\",\"ActorAnTaresParamcondition\":\"[\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"1000\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"50\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"param\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"50\\\\\\\"}\\\"]\"}","{\"targetId\":\"4\",\"showpicture\":\"Actor1_4\",\"ActorAnTaresParamcondition\":\"[\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"150\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"150\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"150\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"150\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"20\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"xparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"9\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"20\\\\\\\"}\\\"]\"}","{\"targetId\":\"6\",\"showpicture\":\"Actor1_6\",\"ActorAnTaresParamcondition\":\"[\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"200\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"200\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-40\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"200\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-20\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-40\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-10\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-100\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"sparam\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"9\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"100\\\\\\\"}\\\"]\"}","{\"targetId\":\"7\",\"showpicture\":\"Actor1_7\",\"ActorAnTaresParamcondition\":\"[\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"elementrate\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-2\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-200\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"debuffrate\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-80\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"staterate\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-50\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"maxtp\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"50\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"gamevar\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"10\\\\\\\"}\\\",\\\"{\\\\\\\"paramcategory\\\\\\\":\\\\\\\"gamevar\\\\\\\",\\\\\\\"paramindex\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"paramup\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"paramupcost\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"parammax\\\\\\\":\\\\\\\"-10\\\\\\\"}\\\"]\"}"]
 * 
 * @param Antaresusepointmax
 * @desc 能力値振りのためにアクターが保持できる
 * ポイントの最大値
 * @type number
 * @min 1
 * @max 99999999
 * @default 999999
 * 
 * @param AnTaresmaxconditionvalue
 * @desc このIDの変数は上昇能力限界値の制御に利用します。
 * 詳しくはプラグインヘルプをご覧ください。
 * @type variable
 * @default 11
 * 
 * @param StaterateforAntarespoint
 * @desc そのアクターのこのIDのステート有効度で
 * ポイント加算率を指定できます。
 * @type state
 * @default 5
 * 
 * @param Psymboltext
 * @desc ポイントのシンボルです。
 * @default P
 * 
 * @param maxtext
 * @desc 加算値が上限以上または下限以下の時の文字列です。
 * @default 限界です
 * 
 * @param resettext
 * @desc ポイントリセット用の文字列です。
 * @default \C[1]ポイントリセット
 * 
 * @param kyokuburiontext
 * @desc 極振り用の文字列です。
 * @default \C[2]極振りON→OFF
 * 
 * @param kyokuburiofftext
 * @desc 極振り用の文字列です。
 * @default \C[2]極振りOFF→ON
 * 
 * @param menucommandtext
 * @desc 表示するメニューコマンド名
 * @default Antares
 * 
 * @param xparamname
 * @desc 表示する追加能力値名（原則変更の必要なし）
 * @type string[]
 * @default ["命中率","回避率","会心率","会心回避率","魔法回避率","魔法反射率","反撃率","HP再生率","MP再生率","TP再生率"]
 * 
 * @param sparamname
 * @desc 表示する特殊能力値名（原則変更の必要なし）
 * @type string[]
 * @default ["狙われ率","防御効果率","回復効果率","薬の知識","MP消費率","TPチャージ率","物理ダメージ率","魔法ダメージ率","床ダメージ率","経験値獲得率"]
 * 
 * @param paramratename
 * @desc 各有効度の呼び名
 * 属性、デバフ、ステートの順
 * @type string[]
 * @default ["有効度","弱体有効度","有効度"]
 * 
 * @param maxtpname
 * @desc 最大ＴＰの文字列
 * @default 最大ＴＰ
 * 
 * @param resetkey
 * @desc ポイントリセットをトリガーするキー
 * @type select
 * @option shift
 * @value shift
 * @option control(ゲームパッド該当なし)
 * @value control
 * @default shift
 * 
 * @param kyokuburikey
 * @desc 極振りON/OFFをトリガーするキー
 * @type select
 * @option shift
 * @value shift
 * @option control(ゲームパッド該当なし)
 * @value control
 * @default control
 * 
 * @param enablereset
 * @desc ポイントリセットの可否判定用スイッチ
 * 指定がない場合は常に可能。
 * @type switch
 * @default 10
 * 
 * @param enabledisplaymenucommand
 * @desc このIDのスイッチがオンの時メニューコマンドにバインドします。指定がない場合は常に表示。
 * @type switch
 * @default 10
 * 
 * @param ALLWinwidthratescreen
 * @desc 全てのウインドウの比率(百分率)
 * 画面サイズによってレイアウト調整に利用してください。
 * @type number
 * @min 20
 * @max 200
 * @default 62
 * 
 * @param WakeInputRows
 * @desc 中央のウインドウの行数
 * @type number
 * @min 1
 * @max 99
 * @default 7
 * 
 * @param ALLwinopacity
 * @desc 該当シーンの全てのウインドウの不透明度
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param WakeInputdrawbackrect
 * @desc 中央のウインドウの項目ごとの矩形背景を描画する。
 * @type boolean
 * @default true
 * 
 * @param uprecover
 * @desc ONの時リセット以外のこのプラグインの能力値振りで、最大TPまたはmhpまたはmmpが元より大きくなった時その差分回復します。
 * @type boolean
 * @default true
 * 
 * @param selectEnable
 * @desc アクターを選択した時能力値振りウインドウの
 * インデックスは有効なものが選択される。
 * @type boolean
 * @default true
 * 
 * @param gaugedrawmax
 * @desc ゲージに描画する文字列を
 * 現在値/最大値の表記にする。
 * @type boolean
 * @default true
 * 
 * @param gamevarreset
 * @desc ポイントリセットの際に
 * 変数が含まれる場合それもリセットする。
 * @type boolean
 * @default true
 * 
 * @param backgroundpicture
 * @desc シーン背景のピクチャ(img/picture)
 * 指定がない場合はデフォルトの処理
 * @type file
 * @dir img/pictures/
 * @default
 * 
 * @param oksename
 * @desc 決定音のファイル名
 * @type file
 * @dir audio/se
 * @default Decision2
 * 
 * @param okseparam
 * @desc 上記seのvolume,picth,pan
 * @default [80, 100, 0]
 * 
 * @param resetsename
 * @desc ポイントリセットと極振り時に再生するSE
 * @type file
 * @dir audio/se
 * @default Decision2
 * 
 * @param resetseparam
 * @desc 上記seのvolume,picth,pan
 * @default [80, 100, 0]
 * 
 * @command ATGrowing
 * @text 能力値振りシーン呼び出し
 * @desc 能力値振りシーン呼び出しを呼び出します（戦闘時は不可）
 * 引数を指定することで特定のパーティメンバーを呼び出せます。
 *
 * @arg memberindex
 * @text indexで指定
 * @desc 任意でパーティメンバーのindexを指定します。
 * 負の数の場合無効、これが有効な場合ID指定は無効。
 * @default -1
 * @type number
 * @min -1
 * @max 999999
 * 
 * @arg actorid
 * @text アクターIDで指定
 * @desc 任意でパーティメンバーのアクターIDを指定します。
 * indexかこの指定が不正な指定の場合元のメニューアクター参照
 * @default -1
 * @type number
 * @min -1
 * @max 999999
 * 
 * @command ATdevide
 * @text 能力値振りポイントの供給
 * @desc 能力値振りポイントを指定の対象に
 * 指定の数値加算します。（パーティメンバーでなくても可能）
 * 
 * @arg addpoint
 * @text 加算する値の初期値
 * @desc 加算する値を指定します。
 * 他の設定によっては実際の値は増減します。
 * @default 0
 * @type number
 * @min 0
 * @max 99999999
 * 
 * @arg targetdecision
 * @text 対象の決定
 * @desc 候補から対象を選べる他、任意での入力で
 * 数値を入れるとそのアクターIDのアクターを指定
 * @type select
 * @option 全てのアクター
 * @value allactors
 * @option パーティメンバー
 * @value allmembers
 * @option バトルメンバー
 * @value battlemembers
 * @option 先頭のパーティメンバー
 * @value leader
 * @default allmembers
 * 
 * @arg separate
 * @text 対象者それぞれに加算値山分け
 * @desc trueの場合、先に設定した加算値を
 * 有効な対象者総数で割った数を加算します。小数点以下切捨て
 * @type boolean
 * @default false
 * 
 * @command ATPointReset
 * @text ポイントリセット
 * @desc ポイントリセット（パーティメンバーでなくても可能）
 * 引数を指定することで特定のアクターを対象にします。
 *
 * @arg memberindex
 * @text indexで指定
 * @desc 任意でパーティメンバーのindexを指定します。
 * 負の数の場合無効、これが有効な場合ID指定は無効。
 * @default -1
 * @type number
 * @min -1
 * @max 999999
 * 
 * @arg actorid
 * @text アクターIDで指定
 * @desc アクターIDを指定します。
 * @default 1
 * @type number
 * @min 1
 * @max 999999
 * 
 * @command ATaddAntaresSavevalues
 * @text 指定の能力値に振る
 * @desc ポイントを消費せずに指定値振ります。
 * 任意のアクターの初期値設定などに活用してください。
 * 
 * @arg memberindex
 * @text indexで指定
 * @desc 任意でパーティメンバーのindexを指定します。
 * 負の数の場合無効、これが有効な場合ID指定は無効。
 * @default -1
 * @type number
 * @min -1
 * @max 999999
 * 
 * @arg actorid
 * @text アクターIDで指定
 * @desc アクターIDを指定します。
 * @default 1
 * @type number
 * @min 1
 * @max 999999
 * 
 * @arg paramcategory
 * @text 能力値の種類
 * @desc 能力値の種類を指定します。
 * @type select
 * @option 通常能力値
 * @value param
 * @option 追加能力値
 * @value xparam
 * @option 特殊能力値
 * @value sparam
 * @option 属性有効度
 * @value elementrate
 * @option 弱体有効度
 * @value debuffrate
 * @option ステート有効度
 * @value staterate
 * @option TP最大値
 * @value maxtp
 * @option 変数
 * @value gamevar
 * @default param
 * 
 * @arg paramindex
 * @text インデックス
 * @desc 能力またはオブジェクトのindex
 * TPの設定の場合、0にしてください。
 * @type number
 * @min 0
 * @max 999999
 * @default 0
 * 
 * @arg addpoint
 * @text 加算する値
 * @desc 加算する値を指定します。
 * @default 0
 * @type number
 * @min -9999999
 * @max 99999999
 * 
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 　利用規約はMITライセンスの通り。
 * 
 * 
 * ---仕様や注意事項等---
 * 
 * ・このプラグインは拙作のRMMV用プラグインAnTares.jsを
 * RMMZ用にリマスターしたものです。
 * 
 * ・極振りでは所持ポイントが尽きたり、設定の上限に達したりするまで
 * 選択した能力値振りを行います。
 * ただし、負荷を懸念し一回の選択につき5,000回選択したのと同じ分までです。
 * （極振り自体は何回でも実行できます。）
 * なお、ツクールMZではデフォルトでは能力値の上限が実質無限のため
 * 能力値が規格外の値になっていても責任は取れませんので
 * ご注意ください。
 * 
 * ・ポイントリセットでは、
 * 実際に使用したポイントと等しい値が返却されるとは限りません。
 * これはポイントリセット時のparamupcost等を参照した評価であるためです。
 * また、プラグインコマンドなどのポイントを消費しない能力値振りの
 * 方法もあるためです。
 * 
 * ・AnTaresmaxconditionvalueで設定した変数の値が
 * 1~99の場合、これを百分率として、
 * 能力値振りの上限または下限を増減することができます。
 * それは80なら本来の80%を超えないまたは下回らない、
 * 加算する値の最大または最低の倍数になります。
 * なお、既に振られているポイントには影響を与えません。
 * 
 * ・プラグインコマンドで「全てのアクター」を指定した場合
 * まだ初期化されていないアクターの初期化を伴うので注意してください。
 * またデータ数がとても多い場合は処理により負担がかかる可能性があります。
 * 
 * ・能力値振りの項目として変数も設定できますが
 * 他の項目と異なり変数の値にアクターの能力として紐付けてはいません。
 * 変数の値が既に振った値として扱われます。
 * その変数は通常通りに操作することができます。
 * ただし、設定の上限が自然数のものに負の数を入れる等のは非推奨です。
 * 
 * ・MAT_HopelessandReward.jsと
 * 一緒に使うと、経験値を変数に入れることができるため
 * これを利用してポイントを溜めることができます。
 * 
 * ・ボタンのUIはimg/pictures/ButtonSet.png
 * のものを利用しています。
 * これはデフォルトの新規プロジェクトに含まれるものなので
 * 入っていない場合は同ディレクトリに同内容のファイルを入れてください。
 * 
 * 
 * ---対象の能力値の設定でのparamindexに入れるべき値---
 * 
 * 同項目のparamcategoryの値によって異なります。
 * 
 * 通常能力値・・・0~7(mhp~luk)
 * 追加能力値・・・0~9(hit~trg)
 * 特殊能力値・・・0~9(tgr~exr)
 * 属性有効度・・・データベース設定のID(1~)
 * 弱体有効度・・・通常能力値のものと同様
 * ステート有効度・・・データベース設定のID(1~)
 * 変数・・・データベース（変数の選択）設定のID(1~)
 * TP最大値・・・0
 * 
 * なお、それぞれの名称はデータベース($dataSystem)設定のものか
 * このプラグインのパラメータのものを参照、表示しています。
 * 
 */

/*~struct~ActorAnTaresconditionData:
 * @param targetId
 * @desc このアクターのId
 * (0のアクターはいませんが、先頭データに使えます。)
 * @type actor
 * @default 0
 * 
 * @param showpicture
 * @desc 表示するアクターのピクチャ(img/picture)
 * @type file
 * @dir img/pictures/
 * @default
 * 
 * @param ActorAnTaresParamcondition
 * @desc 対象の能力値の設定
 * @type struct<ActorAnTaresParamconditionData>[]
 * @default []
 * 
 */

/*~struct~ActorAnTaresParamconditionData:
 * @param paramcategory
 * @desc 表示する能力値の種類
 * @type select
 * @option 通常能力値
 * @value param
 * @option 追加能力値
 * @value xparam
 * @option 特殊能力値
 * @value sparam
 * @option 属性有効度
 * @value elementrate
 * @option 弱体有効度
 * @value debuffrate
 * @option ステート有効度
 * @value staterate
 * @option TP最大値
 * @value maxtp
 * @option 変数
 * @value gamevar
 * @default param
 * 
 * @param paramindex
 * @desc 能力またはオブジェクトのindex
 * TPの設定の場合、0にしてください。
 * @type number
 * @min 0
 * @max 999999
 * @default 0
 * 
 * @param paramup
 * @desc １回ごとの能力に加算する値
 * 有効度の場合は百分率を入れてください。
 * @type number
 * @min -9999999
 * @max 99999999
 * @default 0
 * 
 * @param paramupcost
 * @desc １回ごとの上昇にかかるコスト
 * @type number
 * @min 0
 * @max 99999999
 * @default 0
 * 
 * @param parammax
 * @desc 能力値振りによる能力値に反映する値の上限
 * または下限(有効度の場合は百分率)
 * @type number
 * @min -9999999
 * @max 99999999
 * @default 1
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

//新規コンストラクタ等

function Scene_ATGrowing() {
    this.initialize(...arguments);
}

function Sprite_AntaresGauge() {
    this.initialize(...arguments);
}

function Window_AntaresViewAct() {
    this.initialize(...arguments);
}

function Window_AntaresHelp() {
    this.initialize(...arguments);
}

function Window_AntaresWakeInput() {
    this.initialize(...arguments);
}


(() => {

'use strict';

const AAisZeroOrValid = function(value) {
    return !!value || value === 0;
};

const AAisNumber = function(value) {
    return (typeof value === "number") && isFinite(value);
};

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);

//指定のアクターIDをindexとして、別の配列を組みなおす。
const DataActorAnTarescondition = [];
param.ActorAnTarescondition.forEach(function(AAppobj) {
    if(AAppobj && AAppobj.targetId){
        DataActorAnTarescondition[AAppobj.targetId] = AAppobj;
    }
});


//PluginManagerEx


PluginManagerEx.registerCommand(script, "ATGrowing", function(args) {
    if($gameParty.inBattle()) return;
    const targetactor = $gameParty.ATcommandtargetactor(args.memberindex, args.actorid);
    if(targetactor && targetactor.index() >= 0){
        $gameParty.setMenuActor(targetactor);
    }
    SceneManager.push(Scene_ATGrowing);
});

PluginManagerEx.registerCommand(script, "ATdevide", function(args) {
    let targetarray = [];
    let value = Number(args.addpoint || 0);
    const dec = args.targetdecision;
    if(AAisNumber(dec)){
        targetarray = targetarray.concat([$gameActors.actor(dec)]);
    }
    switch(dec){

        case "allactors":
            targetarray = targetarray.concat($dataActors.map((el, index) => $gameActors.actor(index)));
        break;

        case "allmembers":
            targetarray = targetarray.concat($gameParty.allMembers());
        break;

        case "battlemembers":
            targetarray = targetarray.concat($gameParty.battleMembers());
        break;

        case "leader":
            targetarray = targetarray.concat([$gameParty.leader()]);
        break;
        
    }
    targetarray = targetarray.filter(battler => !!battler);
    if(args.separate && targetarray.length > 0){
        value = Math.floor(value / targetarray.length);
    }
    targetarray.forEach(battler => battler.addAnTaresusepoint(value));
});

PluginManagerEx.registerCommand(script, "ATPointReset", function(args) {
    const targetactor = $gameParty.ATcommandtargetactor(args.memberindex, args.actorid);
    if(!targetactor) return;
    targetactor.AntarespointReset();
});

PluginManagerEx.registerCommand(script, "ATaddAntaresSavevalues", function(args) {
    const targetactor = $gameParty.ATcommandtargetactor(args.memberindex, args.actorid);
    if(!targetactor) return;
    targetactor.addAntaresSavevalues(args.paramcategory, args.paramindex, args.addpoint);
});


//DataManager


DataManager.ATisbiglayout = function() {
    return $dataSystem.advanced.screenWidth >= 1024;
};

DataManager.ATgaugewidth = function() {
    if(DataManager.ATisbiglayout()){
        return 196;
    }else{
        return 116;
    }  
};

DataManager.ATisanyequalcategory = function(array, category) {
    return array.some(str => category === str);
};

DataManager.ATretneedper = function(item) {
    const cate = item.paramcategory;
    const array = ['xparam', 'sparam', 'elementrate', 'debuffrate', 'staterate'];
    const isneed = this.ATisanyequalcategory(array, cate);
    if(isneed){
        return "%";
    }else{
        return "";
    }
};

DataManager.ATitemparamname = function(item) {
    let name = "";
    const cate = item.paramcategory;
    const index = item.paramindex;
    const ratename = param.paramratename;
    
    switch(cate){
        
        case "param":
            name = TextManager.param(index);
        break;

        case "xparam":
            name = param.xparamname[index];
        break;

        case "sparam":
            name = param.sparamname[index];
        break;

        case "elementrate":
            name = $dataSystem.elements[index];
            if(name) name = name + ratename[0];
        break;

        case "debuffrate":
            name = TextManager.param(index);
            if(name) name = name + ratename[1];
        break;

        case "staterate":
            name = $dataStates[index] ? $dataStates[index].name : "";
            if(name) name = name + ratename[2];
        break;

        case "maxtp":
            name = param.maxtpname;
        break;

        case "gamevar":
            name = $dataSystem.variables[index];
        break;
        
        default:
            console.log("不正なカテゴリ指定");
        break;

    }

    return String(name || "");
};

DataManager.ATitemparamvalue = function(item, actor, retnumber) {
    let value = 0;
    const cate = item.paramcategory;
    const index = item.paramindex;
    const isper = this.ATretneedper(item);
    
    switch(cate){
        
        case "param":
            value = actor.param(index);
        break;

        case "xparam":
            value = actor.xparam(index);
        break;

        case "sparam":
            value = actor.sparam(index);
        break;

        case "elementrate":
            value = actor.elementRate(index);
        break;

        case "debuffrate":
            value = actor.debuffRate(index);
        break;

        case "staterate":
            value = actor.stateRate(index);
        break;

        case "maxtp":
            value = actor.maxTp();
        break;

        case "gamevar":
            value = $gameVariables.value(index);
        break;
        
        default:
            console.log("不正なカテゴリ指定");
        break;

    }
    
    value = Number(value || 0);
    if(isper){
        value = Math.round(value * 100);
    }
    if(retnumber){
        return value;
    }else{
        return String(value) + isper;
    }
};



//AudioManager


AudioManager.ATplayse = function(name, array) {
    if(!(name && array)) return;
    var se = {};
    se.name = name;
    se.volume = Number(array[0] || 80);
    se.pitch = Number(array[1] || 100);
    se.pan = Number(array[2] || 0);
    this.playSe(se);
};


//TouchInput


TouchInput.isTriggeredresetkey = function() {
    return param.resetkey && Input.isTriggered(param.resetkey);
};

TouchInput.isTriggeredkyokuburikey = function() {
    return param.kyokuburikey && Input.isTriggered(param.kyokuburikey);
};


//Game_Actor


const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    this.clearAntaresSavevalues();
};

//構造体で設定がないものは基本的に先頭のデータを代わりに参考する。
//先頭のデータがない場合はしょうがない。
Game_Actor.prototype.retdefaultAntaresobj = function() {
    return param.ActorAnTarescondition[0] || {};
};

Game_Actor.prototype.retAntaresobj = function() {
    return DataActorAnTarescondition[this.actorId()] || this.retdefaultAntaresobj();
};

Game_Actor.prototype.retAntaresobjparamcondition = function() {
    const personalobj = this.retAntaresobj().ActorAnTaresParamcondition;
    return personalobj || this.retdefaultAntaresobj().ActorAnTaresParamcondition || {};
};

Game_Actor.prototype.retAntareskeyparamobj = function(key, index) {
    const arr = this.retAntaresobjparamcondition();
    return arr.find(obj => obj && obj.paramcategory === key && obj.paramindex === index) || {};
};

Game_Actor.prototype.AnTaresusepointkey = function() {
    return "AnTaresusepoint";
};

Game_Actor.prototype.clearAntaresSavevalues = function(afterreset) {
    this._AntaresSavevalues = {};
    this._AntaresSavevalues[this.AnTaresusepointkey()] = Number(afterreset || 0);
};

Game_Actor.prototype.AntaresSavevalues = function() {
    if(!this._AntaresSavevalues) this.clearAntaresSavevalues();
    return this._AntaresSavevalues;
};

//ポイントリセットや消費はステート有効度は影響しない。
Game_Actor.prototype.addAnTaresusepoint = function(value, issrInvalid) {
    value = Number(value || 0);
    const Aobj = this.AntaresSavevalues();
    const key = this.AnTaresusepointkey();
    if(!issrInvalid){
        value = value * this.stateRate(param.StaterateforAntarespoint);
    }
    Aobj[key] += value;
    Aobj[key] = Math.floor(Aobj[key].clamp(0, param.Antaresusepointmax));
    return Aobj[key];
};

Game_Actor.prototype.loseAnTaresusepoint = function(value) {
    this.addAnTaresusepoint(-value, true);
};

Game_Actor.prototype.refreshforAntares = function() {
    this.refresh();
};

Game_Actor.prototype.addAntaresSavevalues = function(key, index, value) {
    value = Number(value || 0);
    const Aobj = this.AntaresSavevalues();
    if(!Aobj[key]){
        Aobj[key] = [];
    }
    if(key === "gamevar"){
        if(value){
            const prevgamevar = $gameVariables.value(index);
            const currentgamevar = this.retAntaresValidnumbersforminandmax(key, index, (prevgamevar + value))[0];
            $gameVariables.setValue(index, currentgamevar);
            this.refreshforAntares();
        }
        return $gameVariables.value(index);
    }
    const array = Aobj[key];
    if(!array[index]){
        array[index] = 0;
    }
    if(value){
        const prevmaxs = this.ATprevmaxs();
        array[index] += value;
        array[index] = this.retAntaresValidnumbersforminandmax(key, index, array[index])[0];
        this.ATneedrecover(prevmaxs);
        this.refreshforAntares();    
    }
    return array[index];
};

//この中では能力アップの可否判定を行わないので注意。
Game_Actor.prototype.addAntaresSavevalueswithPay = function(item) {
    this.loseAnTaresusepoint(item.paramupcost);
    this.addAntaresSavevalues(item.paramcategory, item.paramindex, item.paramup);
};

//異常な回数で走らないようにする。
Game_Actor.prototype.addAntaresSavevalueskyokuburi = function(item) {
    let i = 0;
    while (this.iscanaddAntares(item) && i < 5000) {
        this.addAntaresSavevalueswithPay(item);
        i++;
    }
};

Game_Actor.prototype.iscanaddAntares = function(paramobj) {
    return this.iscanpayaddAntarescost(paramobj) && this.isaddAntaresnotmax(paramobj);
};

Game_Actor.prototype.iscanpayaddAntarescost = function(paramobj) {
    return paramobj && this.addAnTaresusepoint() >= paramobj.paramupcost;
};

Game_Actor.prototype.isaddAntaresnotmax = function(paramobj) {
    if(!paramobj) return false;
    const key = paramobj.paramcategory;
    const index = paramobj.paramindex;
    const current = this.addAntaresSavevalues(key, index);
    const numarr = this.retAntaresValidnumbersforminandmax(key, index, current, paramobj);
    const minValue = numarr[1];
    const maxValue = numarr[2];
    if(maxValue !== 0){
        return current < maxValue;
    }else{
        return current > minValue;
    }
};

//ポイントは払い戻される
Game_Actor.prototype.AntarespointReset = function() {
    let afterreset = 0;
    let savevalue, compoint;
    this.retAntaresobjparamcondition().forEach(function(paramobj) {
        if(!paramobj) return;
        if(paramobj.paramcategory === "gamevar" && !param.gamevarreset) return;
        savevalue = this.addAntaresSavevalues(paramobj.paramcategory, paramobj.paramindex);
        compoint = (paramobj.paramup !== 0) ? Math.round(savevalue / paramobj.paramup * paramobj.paramupcost) : 0;
        afterreset = this.addAnTaresusepoint(compoint, true);
        if(paramobj.paramcategory === "gamevar" && param.gamevarreset){
            $gameVariables.setValue(paramobj.paramindex, 0);
        }
    }, this);
    this.clearAntaresSavevalues(afterreset);
    this.refreshforAntares();
};

Game_Actor.prototype.ATdisplayplusorminus = function(item) {
    const up = item ? item.paramup : 0;
    if(up >= 0){
        return "+";
    }else{
        return "-";
    }
};

//Windowへの表示用、数字は絶対値。
Game_Actor.prototype.ATdisplayparamup = function(item) {
    let value = 0;
    let per = DataManager.ATretneedper(item);
    if(this.isaddAntaresnotmax(item)){
        value = item.paramup;
    }
    return String(Math.abs(value) + per);
};

Game_Actor.prototype.ATprevmaxs = function() {
    return [this.mhp, this.mmp, this.maxTp()];
};

Game_Actor.prototype.ATneedrecover = function(array) {
    if(!param.uprecover) return;
    const difhp = this.mhp - array[0];
    const difmp = this.mmp - array[1];
    const diftp = this.maxTp() - array[2];
    if(difhp > 0) this.setHp(this.hp + difhp);
    if(difmp > 0) this.setMp(this.mp + difmp);
    if(diftp > 0) this.setTp(this.tp + diftp);
};

Game_Actor.prototype.retAntaresValidnumbersforminandmax = function(key, index, current, argobj) {
    let minValue, maxValue;
    current = Number(current || 0);
    argobj = argobj || this.retAntareskeyparamobj(key, index);
    const parammax = this.ATretrealparammax(argobj.paramup, argobj.parammax);
    if(parammax >= 0){
        minValue = 0;
        maxValue = parammax;
    }else{
        minValue = parammax;
        maxValue = 0;
    }
    return [Math.floor(current.clamp(minValue, maxValue)), minValue, maxValue];
};

Game_Actor.prototype.ATretrealparammax = function(paramup, parammax) {
    parammax = Number(parammax || 0);
    const id = param.AnTaresmaxconditionvalue;
    if(id > 0 && paramup !== 0){
        const isplusparam = (parammax >= 0);
        let rate = $gameVariables.value(id);
        if(rate > 0 && rate < 100){
            rate /= 100;
            const base = Math.abs(parammax * rate);
            const absparup = Math.abs(paramup);
            parammax = Math.floor(base / absparup) * absparup;
            if(!isplusparam){
                parammax = -parammax;
            }
        }
    }
    return parammax;
};

//paramPlusに関しては呼び出し元で下限の設定あり。
const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    const def = _Game_Actor_paramPlus.call(this, paramId);
    return def + this.addAntaresSavevalues("param", paramId);
};

const _Game_Actor_xparam = Game_Actor.prototype.xparam;
Game_Actor.prototype.xparam = function(xparamId) {
    const def = _Game_Actor_xparam.call(this, xparamId);
    return this.calcAntaresSaveRate(def, "xparam", xparamId);
};

const _Game_Actor_sparam = Game_Actor.prototype.sparam;
Game_Actor.prototype.sparam = function(sparamId) {
    const def = _Game_Actor_sparam.call(this, sparamId);
    return this.calcAntaresSaveRate(def, "sparam", sparamId, 0);
};

//能力値の種類によって0未満の値が有効である場合がある。
Game_Actor.prototype.calcAntaresSaveRate = function(def, key, id, limitmin) {
    const value = this.addAntaresSavevalues(key, id);
    const calc = def + value / 100;
    limitmin = AAisNumber(limitmin) ? limitmin : calc;
    return Math.max(calc, limitmin);
};

const _Game_Actor_elementRate = Game_Actor.prototype.elementRate;
Game_Actor.prototype.elementRate = function(elementId) {
    const def = _Game_Actor_elementRate.call(this, elementId);
    return this.calcAntaresSaveRate(def, "elementrate", elementId);
};

const _Game_Actor_debuffRate = Game_Actor.prototype.debuffRate;
Game_Actor.prototype.debuffRate = function(paramId) {
    const def = _Game_Actor_debuffRate.call(this, paramId);
    return this.calcAntaresSaveRate(def, "debuffrate", paramId, 0);
};

const _Game_Actor_stateRate = Game_Actor.prototype.stateRate;
Game_Actor.prototype.stateRate = function(stateId) {
    const def = _Game_Actor_stateRate.call(this, stateId);
    return this.calcAntaresSaveRate(def, "staterate", stateId, 0);
};

const _Game_Actor_maxTp = Game_Actor.prototype.maxTp;
Game_Actor.prototype.maxTp = function() {
    const def = _Game_Actor_maxTp.call(this);
    return def + this.addAntaresSavevalues("maxtp", 0);
};


//Game_Party


//indexが有効であればそちらを優先する。
Game_Party.prototype.ATcommandtargetactor = function(memberindex, actorid) {
    let targetactor;
    const member = this.allMembers();
    if(memberindex >= 0){
        targetactor = member[memberindex];
    }
    if(!targetactor){
        targetactor = $gameActors.actor(actorid);
    }
    return targetactor;
};


//Scene_Menu


const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("Antaresscene", this.commandAntaresscene.bind(this));
};

Scene_Menu.prototype.commandAntaresscene = function() {
    SceneManager.push(Scene_ATGrowing);
};


//新規シーン


Scene_ATGrowing.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ATGrowing.prototype.constructor = Scene_ATGrowing;

Scene_ATGrowing.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._kyokuburimode = false;
};

Scene_ATGrowing.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAntaresViewActWindow();
    this.createAntaresHelpWindow();
    this.createAntaresWakeInputWindow();
    this.AntaresChangeButtonsPlace();
    this.AntaresChangeActor();
};

Scene_ATGrowing.prototype.createBackground = function() {
    if(!param.backgroundpicture){
        Scene_MenuBase.prototype.createBackground.call(this);
        return;
    }
    this._backSprite = new Sprite();
    this._backSprite.bitmap = ImageManager.loadPicture(param.backgroundpicture);
    this.addChild(this._backSprite);
};

Scene_ATGrowing.prototype.AntaresactorpicturestartX = function() {
    return Graphics.width + 4;
};

Scene_ATGrowing.prototype.AntaresactorpictureendX = function() {
    return Graphics.width * param.ALLWinwidthratescreen / 100;
};

Scene_ATGrowing.prototype.Antaresactorpicturefadespeed = function() {
    return 24;
};

Scene_ATGrowing.prototype.AntaresWinleftpad = function() {
    return Graphics.width / 32;
};

Scene_ATGrowing.prototype.AntaresWinwidthspace = function() {
    return this.AntaresactorpictureendX() - this.AntaresWinleftpad();
};

Scene_ATGrowing.prototype.AntaresWinheightpad = function() {
    return 36;
};

Scene_ATGrowing.prototype.createAntaresViewActWindow = function() {
    const ww = this.AntaresWinwidthspace();
    const wh = this.calcWindowHeight(1);
    const wx = this.AntaresWinleftpad();
    const wy = this.AntaresWinheightpad();
    const rect = new Rectangle(wx, wy, ww, wh);
    this._AntaresViewActWindow = new Window_AntaresViewAct(rect);
    this.addWindow(this._AntaresViewActWindow);
};

Scene_ATGrowing.prototype.createAntaresHelpWindow = function() {
    const ww = this.AntaresWinwidthspace();
    const wh = this.calcWindowHeight(2);
    const wx = this.AntaresWinleftpad();
    const wy = Graphics.height - wh - this.AntaresWinheightpad();
    const rect = new Rectangle(wx, wy, ww, wh);
    this._AntaresHelpWindow = new Window_AntaresHelp(rect);
    this.addWindow(this._AntaresHelpWindow);
};

Scene_ATGrowing.prototype.createAntaresWakeInputWindow = function() {
    const viewwin = this._AntaresViewActWindow;
    const ww = this.AntaresWinwidthspace();
    const wh = this.calcWindowHeight(param.WakeInputRows, true);
    const wx = this.AntaresWinleftpad();
    const wy = viewwin.y + viewwin.height + this.AntaresWinheightpad();
    const rect = new Rectangle(wx, wy, ww, wh);
    this._AntaresWakeInputWindow = new Window_AntaresWakeInput(rect);
    this._AntaresWakeInputWindow.setHandler("ok", this.onWakeok.bind(this));
    this._AntaresWakeInputWindow.setHandler("cancel", this.onendAntares.bind(this));
    if(this.needsPageButtons()){
        this._AntaresWakeInputWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._AntaresWakeInputWindow.setHandler("pageup", this.previousActor.bind(this));
    }
    this.addWindow(this._AntaresWakeInputWindow);
};

Scene_ATGrowing.prototype.createButtons = function() {
    Scene_MenuBase.prototype.createButtons.call(this);
    this.createAntaresHelpButtons();
};

Scene_ATGrowing.prototype.createAntaresHelpButtons = function() {
    if(!ConfigManager.touchUI) return;
    this._AntaresresetButton = new Sprite_Button("ok");
    this._AntareskyokuburiButton = new Sprite_Button("ok");
    this.addWindow(this._AntaresresetButton);
    this.addWindow(this._AntareskyokuburiButton);
    this._AntaresresetButton.setClickHandler(this.onpointReset.bind(this));
    this._AntareskyokuburiButton.setClickHandler(this.onkyokuburiModeToggle.bind(this));
};

Scene_ATGrowing.prototype.AntaresChangeButtonsPlace = function() {
    if (!ConfigManager.touchUI) return;
    const cancelbutton = this._cancelButton;
    const pageup = this._pageupButton;
    const pagedown = this._pagedownButton;
    const reset = this._AntaresresetButton;
    const kyoku = this._AntareskyokuburiButton;
    const viewwin = this._AntaresViewActWindow;
    const helpwin = this._AntaresHelpWindow;
    if(cancelbutton){
        cancelbutton.x = helpwin.x + helpwin.width - cancelbutton.width * 1.25;
        cancelbutton.y = helpwin.y + cancelbutton.height / 2;
    }
    if(pageup && pagedown){
        pageup.x = viewwin.x + pageup.width / 2;
        pageup.y = viewwin.y + 4;
        pagedown.x = viewwin.x + viewwin.width - pagedown.width * 1.5;
        pagedown.y = pageup.y;
    }
    if(reset && kyoku){
        reset.scale.x = 0.75;
        reset.scale.y = 0.75;
        kyoku.scale.x = reset.scale.x;
        kyoku.scale.y = reset.scale.y;
        reset.x = helpwin.x + reset.width / 4;
        reset.y = helpwin.y + 8;
        kyoku.x = reset.x;
        kyoku.y = helpwin.y + helpwin.height - kyoku.height;
    }
};

Scene_ATGrowing.prototype.needsPageButtons = function() {
    return $gameParty.size() >= 2;
};

Scene_ATGrowing.prototype.updatePageButtons = function() {
    Scene_MenuBase.prototype.updatePageButtons.call(this);
    this.updateAntaresButtons();
};

Scene_ATGrowing.prototype.updateAntaresButtons = function() {
    if(!this._AntaresresetButton) return;
    if(this._AntaresHelpWindow){
        this._AntaresresetButton.visible = this._AntaresHelpWindow.isAntaresenablereset();
    }else{
        this._AntaresresetButton.visible = false;
    }
};

Scene_ATGrowing.prototype.AntaresChangeActor = function() {
    const actor = this._actor;
    this.Antaresneedinitactorpicture(actor);
    this._AntaresViewActWindow.setActor(actor);
    this._AntaresWakeInputWindow.setActor(actor);
};

Scene_ATGrowing.prototype.onActorChange = function() {
    Scene_MenuBase.prototype.onActorChange.call(this);
    this.AntaresChangeActor();
};

Scene_ATGrowing.prototype.Antaresrefreshrequest = function() {
    this._AntaresViewActWindow.refresh();
    this._AntaresHelpWindow.refresh();
    this._AntaresWakeInputWindow.refresh();
    this._AntaresWakeInputWindow.activate();
};

Scene_ATGrowing.prototype.Antaresneedinitactorpicture = function(actor) {
    const filename = actor ? actor.retAntaresobj().showpicture : null;
    if(!this._actorpictureSprite){
        this._actorpictureSprite = new Sprite();
        this.addChild(this._actorpictureSprite);
    }
    this._actorpictureSprite.bitmap = ImageManager.loadPicture(filename);
    this._actorpictureSprite.x = this.AntaresactorpicturestartX();
    this._actorpictureSprite.y = 100;
    this._actorpictureSprite.opacity = 0;
};

Scene_ATGrowing.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.updateAntaresactorpicture();
};

Scene_ATGrowing.prototype.updateAntaresactorpicture = function() {
    const fadespeed = this.Antaresactorpicturefadespeed();
    this._actorpictureSprite.opacity += (2 + 255 / fadespeed);
    const endx = this.AntaresactorpictureendX();
    const startx = this.AntaresactorpicturestartX();
    const oncemovex = (endx - startx) / fadespeed;
    this._actorpictureSprite.x += oncemovex;
    if(this._actorpictureSprite.x <= endx){
        this._actorpictureSprite.x = endx;
    }
};

Scene_ATGrowing.prototype.item = function() {
    return this._AntaresWakeInputWindow.item();
};

Scene_ATGrowing.prototype.onWakeok = function() {
    const item = this.item();
    if(this._kyokuburimode){
        this._actor.addAntaresSavevalueskyokuburi(item);
    }else{
        this._actor.addAntaresSavevalueswithPay(item);
    }
    this.Antaresrefreshrequest();
};

Scene_ATGrowing.prototype.onendAntares = function() {
    this.popScene();
};

Scene_ATGrowing.prototype.onpointReset = function() {
    if(!this._AntaresHelpWindow.isAntaresenablereset()) return;
    AudioManager.ATplayse(param.resetsename, param.resetseparam);
    this._actor.AntarespointReset();
    this.Antaresrefreshrequest();
};

Scene_ATGrowing.prototype.kyokuburiModeset = function(mode) {
    this._kyokuburimode = !!mode;
    this._AntaresHelpWindow.setKyokuburimode(mode);
};

Scene_ATGrowing.prototype.onkyokuburiModeToggle = function() {
    AudioManager.ATplayse(param.resetsename, param.resetseparam);
    this.kyokuburiModeset(!this._kyokuburimode);
};


//新規sprite


Sprite_AntaresGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_AntaresGauge.prototype.constructor = Sprite_AntaresGauge;

Sprite_AntaresGauge.prototype.initialize = function() {
    Sprite_Gauge.prototype.initialize.call(this);
};

Sprite_AntaresGauge.prototype.initMembers = function() {
    Sprite_Gauge.prototype.initMembers.call(this);
    this.setAntaresmember();
};

Sprite_AntaresGauge.prototype.setAntaresmember = function(c, m, e, p) {
    this._antarescurrent = Number(c || 0);
    this._antaresmax = Number(m || 0);
    this._antaresenable = !!e;
    this._antareper = String(p || "");
};

Sprite_AntaresGauge.prototype.setup = function(battler, statusType) {
    Sprite_Gauge.prototype.setup.call(this, battler, statusType);
    this.updateAntaresgaugeopacity();
};

Sprite_AntaresGauge.prototype.bitmapWidth = function() {
    return DataManager.ATgaugewidth();
};

Sprite_AntaresGauge.prototype.bitmapHeight = function() {
    if(DataManager.ATisbiglayout()){
        return 30;
    }else{
        return 24;
    }
};

Sprite_AntaresGauge.prototype.gaugeHeight = function() {
    return Math.floor(this.bitmapHeight() * 2 / 3);
};

Sprite_AntaresGauge.prototype.gaugeX = function() {
    return 0;
};

Sprite_AntaresGauge.prototype.ATgaugeY = function(basey) {
    basey = Number(basey || 0);
    if(DataManager.ATisbiglayout()){
        return basey;
    }else{
        return basey + 6;
    }
};

Sprite_AntaresGauge.prototype.updateAntaresgaugeopacity = function() {
    this.opacity = this._antaresenable ? 255 : 160;
};

Sprite_AntaresGauge.prototype.currentValue = function() {
    return this._antarescurrent;
};

Sprite_AntaresGauge.prototype.currentMaxValue = function() {
    return this._antaresmax;
};

Sprite_AntaresGauge.prototype.gaugeColor1 = function() {
    return ColorManager.tpGaugeColor1();
};

Sprite_AntaresGauge.prototype.gaugeColor2 = function() {
    return ColorManager.tpGaugeColor2();
};

//現在値と最大値の符号が反対の場合は強制的に０
Sprite_AntaresGauge.prototype.gaugeRate = function() {
    if (this.isValid()) {
        if(this._value * this._maxValue < 0){
            return 0;
        }
        const value = Math.abs(this._value);
        const maxValue = Math.abs(this._maxValue);
        return maxValue > 0 ? value / maxValue : 0;
    } else {
        return 0;
    }
};

Sprite_AntaresGauge.prototype.drawGaugeRect = function(x, y, width, height) {
    y = this.ATgaugeY(y);
    Sprite_Gauge.prototype.drawGaugeRect.call(this, x, y, width, height);
};

Sprite_AntaresGauge.prototype.valueFontSize = function() {
    if(DataManager.ATisbiglayout()){
        return Sprite_Gauge.prototype.valueFontSize.call(this);
    }else{
        return Math.floor($gameSystem.mainFontSize() / 2);
    }
};

Sprite_AntaresGauge.prototype.drawValue = function() {
    if(!param.gaugedrawmax){
        Sprite_Gauge.prototype.drawValue.call(this);
        return;
    }
    const bitmap = this.bitmap;
    const currentValue = this.currentValue() + this._antareper;
    const maxValue = this.currentMaxValue() + this._antareper;
    const x = 4;
    const y = 0;
    const width = this.bitmapWidth() - x * 2;
    const height = this.bitmapHeight();
    const slashwidth = 28;
    const numberwidth = (width - slashwidth) / 2;
    this.setupValueFont();
    bitmap.drawText(currentValue, x, y, numberwidth, height, "right");
    bitmap.drawText("/", x + numberwidth, y, slashwidth, height, "center");
    bitmap.drawText(maxValue, x + width - numberwidth, y, numberwidth, height, "right");
};


//Window_Base


Window_Base.prototype.ATdrawnameareawidth = function() {
    return this.textWidth("あああああ");
};

Window_Base.prototype.ATdrawparamvalueareawidth = function() {
    return this.textWidth("0000");
};

Window_Base.prototype.ATdrawActorName = function(actor, x, y, width) {
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawText(actor.name(), x, y, width);
};

Window_Base.prototype.ATdrawActorPoint = function(actor, x, y, width) {
    const numberwidth = this.textWidth(param.Antaresusepointmax);
    const symbolwidth = this.textWidth(param.Psymboltext) + this.contents.fontSize;
    this.resetTextColor();
    this.drawText(actor.addAnTaresusepoint(), x, y, width, "right");
    this.changeTextColor(ColorManager.tpCostColor());
    const x2 = x + width - numberwidth - symbolwidth;
    this.drawText(param.Psymboltext, x2, y, symbolwidth);
    this.resetTextColor();
};

Window_Base.prototype.ATdrawcurrentparamnameandvalue = function(item, actor, x, y) {
    if(!(item && actor)) return 0;
    const itemname = DataManager.ATitemparamname(item);
    const namewidth = this.ATdrawnameareawidth() + 4;
    const width = namewidth + this.ATdrawparamvalueareawidth();
    const paramvalue = DataManager.ATitemparamvalue(item, actor);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(itemname, x, y, namewidth);
    this.resetTextColor();
    const x2 = x + namewidth;
    this.drawText(paramvalue, x2, y, width - namewidth, "right");
    return width;
};

Window_Base.prototype.ATdrawusepointcostorlimit = function(item, actor, x, y, width) {
    if(actor && actor.isaddAntaresnotmax(item)){
        const cost = item ? item.paramupcost : 0;
        this.ATdrawusepointcost(cost, x, y, width);
    }else{
        this.ATdrawlimitcharacter(x, y, width);
    }
};

Window_Base.prototype.ATdrawusepointcost = function(cost, x, y, width) {
    cost = Number(cost || 0);
    const symbolwidth = this.textWidth(param.Psymboltext) + 4;
    this.changeTextColor(ColorManager.mpCostColor());
    this.drawText(param.Psymboltext, x, y, symbolwidth, "right");
    const x2 = x + symbolwidth;
    this.drawText(cost, x2, y, width - symbolwidth, "right");
    this.resetTextColor();
};

Window_Base.prototype.ATdrawlimitcharacter = function(x, y, width) {
    this.contents.fontSize = Math.floor(this.contents.fontSize * 3 / 4);
    this.changeTextColor(ColorManager.mpCostColor());
    this.drawText(param.maxtext, x, y, width, "right");
    this.resetFontSettings();
};

Window_Base.prototype.isAntaresenablereset = function() {
    const id = param.enablereset;
    return !id || $gameSwitches.value(id);
};

Window_Base.prototype.isAntaresCommandShow = function() {
    const id = param.enabledisplaymenucommand;
    return !id || $gameSwitches.value(id);
};

Window_Base.prototype.isAntaresCommandEnable = function() {
    return $gameParty.exists();
};


//Window_Command


Window_Command.prototype.addAntaresCommand = function() {
    if(!this.isAntaresCommandShow()) return;
    this.addCommand(param.menucommandtext, "Antaresscene", this.isAntaresCommandEnable());
};


//Window_StatusBase


//オーバーライド用
Window_StatusBase.prototype.setAntaresmembertosprite = function(sprite, item) {
};

Window_StatusBase.prototype.placeAntarescurrentGauge = function(drawindex, item, actor, x, y) {
    const type = "Antarescurrent";
    const key = "actor%1-gauge-%2-%3".format(actor.actorId(), type, drawindex);
    const sprite = this.createInnerSprite(key, Sprite_AntaresGauge);
    this.setAntaresmembertosprite(sprite, item);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
};


//Window_MenuCommand


const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    this.addAntaresCommand();
};


//新規ウインドウ


Window_AntaresViewAct.prototype = Object.create(Window_Base.prototype);
Window_AntaresViewAct.prototype.constructor = Window_AntaresViewAct;

Window_AntaresViewAct.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._actor = null;
    this.opacity = param.ALLwinopacity;
};

Window_AntaresViewAct.prototype.setActor = function(actor) {
    if(this._actor !== actor){
        this._actor = actor;
        this.refresh();
    }
};

Window_AntaresViewAct.prototype.refresh = function() {
    this.contents.clear();
    const actor = this._actor;
    if(!actor) return;
    const cw = this.contentsWidth() * 2 / 3;
    const x = (this.contentsWidth() - cw) / 2;
    const y = 0;
    const namewidth = this.ATdrawnameareawidth() + 4;
    this.ATdrawActorName(actor, x, y, namewidth);
    const x2 = x + namewidth;
    this.ATdrawActorPoint(actor, x2, y, cw - namewidth);
};


//キー入力関係は能力値振りウインドウにやらせる。
Window_AntaresHelp.prototype = Object.create(Window_Base.prototype);
Window_AntaresHelp.prototype.constructor = Window_AntaresHelp;

Window_AntaresHelp.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._kyokuburimode = false;
    this.opacity = param.ALLwinopacity;
    this.refresh();
};

Window_AntaresHelp.prototype.setKyokuburimode = function(mode) {
    if(this._kyokuburimode !== mode){
        this._kyokuburimode = mode;
        this.refresh();
    }
};

Window_AntaresHelp.prototype.refresh = function() {
    this.contents.clear();
    let text;
    const rect = this.baseTextRect();
    const buttonspace = 90;
    const x = rect.x + buttonspace;
    const y = rect.y;
    const width = rect.width - buttonspace * 2;
    const lineHeight = this.lineHeight();
    text = param.resettext;
    this.changePaintOpacity(this.isAntaresenablereset());
    this.drawTextEx(text, x, y, width);
    this.changePaintOpacity(true);
    if(this._kyokuburimode){
        text = param.kyokuburiontext;
    }else{
        text = param.kyokuburiofftext;
    }
    this.drawTextEx(text, x, y + lineHeight, width);
};


Window_AntaresWakeInput.prototype = Object.create(Window_StatusBase.prototype);
Window_AntaresWakeInput.prototype.constructor = Window_AntaresWakeInput;

Window_AntaresWakeInput.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
    this._data = [];
    this.opacity = param.ALLwinopacity;
};

Window_AntaresWakeInput.prototype.setActor = function(actor) {
    if(this._actor !== actor){
        this._actor = actor;
        this.activate();
        this.refresh();
        this.needvalidselect();
    }
};

//this.scrollTo(0, 0);よりもsmoothを優先。
Window_AntaresWakeInput.prototype.needvalidselect = function() {
    if(!param.selectEnable){
        this.smoothSelect(0);
        return;
    }
    const index = this._data.findIndex(obj => this.isEnabled(obj));
    this.smoothSelect(Math.max(0, index));
};

Window_AntaresWakeInput.prototype.drawItemBackground = function(index) {
    if(!param.WakeInputdrawbackrect) return;
    Window_StatusBase.prototype.drawItemBackground.call(this, index);
};

Window_AntaresWakeInput.prototype.playOkSound = function() {
    AudioManager.ATplayse(param.oksename, param.okseparam);
};

//他プラグインでWindow_StatusBase外のタッチに意味を持たせている場合を考慮
Window_AntaresWakeInput.prototype.processTouch = function() {
    if(!this.isTouchedInsideFrame()) return;
    Window_StatusBase.prototype.processTouch.call(this);
};

Window_AntaresWakeInput.prototype.processHandling = function() {
    const def = Window_StatusBase.prototype.processHandling.call(this);
    if(!this.isOpenAndActive()) return def;
    const scene = SceneManager._scene;
    if(TouchInput.isTriggeredresetkey()) {
        return scene.onpointReset();
    }
    if(TouchInput.isTriggeredkyokuburikey()) {
        return scene.onkyokuburiModeToggle();
    }
    return def;
};

Window_AntaresWakeInput.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_AntaresWakeInput.prototype.item = function(index) {
    if(!AAisZeroOrValid(index)){
        index = this.index();
    }
    if(index < 0) return null;
    return this._data[index];
};

Window_AntaresWakeInput.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

Window_AntaresWakeInput.prototype.isEnabled = function(item) {
    return this._actor && this._actor.iscanaddAntares(item);
};

Window_AntaresWakeInput.prototype.makeItemList = function() {
    this._data = this._actor ? this._actor.retAntaresobjparamcondition() : [];
};

Window_AntaresWakeInput.prototype.refresh = function() {
    this.makeItemList();
    Window_StatusBase.prototype.refresh.call(this);
};

Window_AntaresWakeInput.prototype.drawItem = function(index) {
    const item = this.item(index);
    const actor = this._actor;
    if(!(item && actor)) return;
    const rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemAntaresparam(index, item, actor, rect);
    this.changePaintOpacity(true);
};

Window_AntaresWakeInput.prototype.drawItemAntaresparam = function(index, item, actor, rect) {
    let calcx = rect.x;
    let nextwidth = 0;
    const y = rect.y;
    const rightline = rect.width + rect.x;
    const curfsize = this.contents.fontSize;
    const plmi = actor.ATdisplayplusorminus(item);
    const paramup = actor.ATdisplayparamup(item);
    const upwidth = DataManager.ATisbiglayout() ? this.textWidth("000") : this.textWidth("00");
    const costwidth = this.ATdrawparamvalueareawidth();
    const firstwidth = this.ATdrawcurrentparamnameandvalue(item, actor, calcx, y);
    calcx += firstwidth;
    nextwidth = 4 + curfsize;
    this.drawText(plmi, calcx, y, nextwidth, "right");
    calcx += nextwidth;
    nextwidth = 4 + upwidth;
    this.drawText(paramup, calcx, y, nextwidth, "right");
    calcx += nextwidth;
    nextwidth = 4 + costwidth;
    this.ATdrawusepointcostorlimit(item, actor, calcx, y, nextwidth);
    calcx = rightline - DataManager.ATgaugewidth();
    this.placeAntarescurrentGauge(index, item, actor, calcx, y);
};

Window_AntaresWakeInput.prototype.setAntaresmembertosprite = function(sprite, item) {
    const actor = this._actor;
    if(!(item && actor)) return;
    const c = actor.addAntaresSavevalues(item.paramcategory, item.paramindex);
    const m = actor.ATretrealparammax(item.paramup, item.parammax);
    const e = this.isEnabled(item);
    const p = DataManager.ATretneedper(item);
    sprite.setAntaresmember(c, m, e, p);
};


})();
