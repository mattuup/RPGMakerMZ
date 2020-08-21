//=============================================================================
// MAT_NeedAutorunFade.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 移動先の自動実行でフェードアウトママ
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （NeedAutorunFade.js再録、記述の大幅見直し）
 * 
 * 
 * イベントコマンド「場所移動」を拡張します。
 * これにより移動した先に発生条件を満たした自動実行イベントがあり
 * その実行内容の先頭にフェードアウトがあれば
 * イベントコマンド「場所移動」によるフェードインを行いません。
 * 原則フェードアウトは先頭に置いておく必要がありますが
 * 注釈はこれより上に置いてあっても大丈夫です。
 * ※「場所移動」のフェードが「なし」ではないこと。
 * ※フェードインしたいときは通常通りその実行内容で
 * 　イベントコマンド「フェードイン」によってフェードインさせてください。
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._NAFtrflag = 0;
};


const _Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
    _Game_Event_start.call(this);
    this.listforcefade();
};

Game_Event.prototype.listforcefade = function() {
    if(!this._starting) return;
    if($gameTemp._NAFtrflag <= 0) return;
    this.list().some(command => this.NAFcodecheck(command.code));
};

Game_Event.prototype.NAFcodecheck = function(codenum) {
    if(codenum === 221){
        $gameTemp._NAFtrflag = 2;
        return true;
    }
    if(codenum === 108 || codenum === 408){
        return false;
    }
    $gameTemp._NAFtrflag = 0;
    return true;
};


//Scene_Map.prototype.fadeOutForTransferではフェードアウトが間に合わない。
const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
Game_Interpreter.prototype.command201 = function(params) {
    const ft = params[5];
    $gameTemp._NAFtrflag = 0;
    if (!$gameParty.inBattle() && !$gameMessage.isBusy() && ft !== 2) {
        $gameScreen.startFadeOut(this.fadeSpeed(), ft === 1);
        $gameTemp._NAFtrflag = 1;
    }
    return _Game_Interpreter_command201.call(this, params);
};


//更新後のロード後の挙動改善を含めている、期待しないフェードインをしないようにする。
const _Scene_Map_fadeInForTransfer = Scene_Map.prototype.fadeInForTransfer;
Scene_Map.prototype.fadeInForTransfer = function() {
    if($gamePlayer.fadeType() !== undefined && $gameTemp._NAFtrflag < 2){
        _Scene_Map_fadeInForTransfer.call(this);
    }
    $gameTemp._NAFtrflag = 0;
};


})();
