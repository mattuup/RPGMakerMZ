//=============================================================================
// MAT_NeedAutorunFade.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.04 移動先の自動実行でフェードアウトママ
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param ignoreswitch
 * @desc ｵﾝの間、このﾌﾟﾗｸﾞｲﾝの機能ではﾌｪｰﾄﾞｲﾝしません。ﾌｪｰﾄﾞｱｳﾄ中同マップ中で場所移動だけしたい場合などに使用してください。
 * @type switch
 * @default 0
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
 * イベントコマンド「場所移動」を拡張します。
 * これにより移動した先に発生条件を満たした異なる自動実行イベントがあり
 * その実行内容の先頭に「画面のフェードアウト」があれば
 * イベントコマンド「場所移動」によるフェードインを行いません。
 * 原則フェードアウトは先頭に置いておく必要がありますが
 * 注釈はこれより上に置いてあっても大丈夫です。
 * ※「場所移動」のフェードが「なし」ではないこと。
 * ※フェードインしたいときは通常通りその実行内容で
 * 　イベントコマンド「画面のフェードイン」によってフェードインさせてください。
 * 
 * ver1.03　フェード（色）が反映されるようにしました。
 * 次のフェードインまで継続します。
 * 
 * ver1.04  パラメータ追加
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._NAFtrflag = 0;
};


const _Game_Screen_clearFade = Game_Screen.prototype.clearFade;
Game_Screen.prototype.clearFade = function() {
    _Game_Screen_clearFade.call(this);
    this.NAFclearFade();
};

Game_Screen.prototype.NAFclearFade = function() {
    this._NAFfadecolor = this.NAFsetfadecolor();
};

Game_Screen.prototype.NAFfadecolor = function() {
    const br = this.brightness();
    if(br >= 255 || !this._NAFfadecolor){
        return [0, 0, 0, 0];
    }
    const array = this._NAFfadecolor.clone();
    array[3] = 255 - br;
    return array;
};

Game_Screen.prototype.NAFsetfadecolor = function(color) {
    if(color === true){
        this._NAFfadecolor = [255, 255, 255, 0];
    }else if(color){
        this._NAFfadecolor = color.clone();
    }else{
        this._NAFfadecolor = [0, 0, 0, 0];
    }
};

const _Game_Screen_startFadeOut = Game_Screen.prototype.startFadeOut;
Game_Screen.prototype.startFadeOut = function(duration) {
    _Game_Screen_startFadeOut.call(this, duration);
    this.NAFsetfadecolor($gamePlayer.fadeType() === 1);
};

const _Game_Screen_startFadeIn = Game_Screen.prototype.startFadeIn
Game_Screen.prototype.startFadeIn = function(duration) {
    _Game_Screen_startFadeIn.call(this, duration);
    $gamePlayer._fadeType = 0;
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
    }else{
        $gameTemp._NAFtrflag = 0;
    }
    if(codenum === 108 || codenum === 408){
        return false;
    }
    return true;
};


const _Scene_Map_fadeOutForTransfer = Scene_Map.prototype.fadeOutForTransfer;
Scene_Map.prototype.fadeOutForTransfer = function() {
    _Scene_Map_fadeOutForTransfer.call(this);
    this.NAFfadeOutForTransfer();
};

Scene_Map.prototype.NAFfadeOutForTransfer = function() {
    $gameTemp._NAFtrflag = 0;
    switch ($gamePlayer.fadeType()) {
        case 0:
        case 1:
            $gameTemp._NAFtrflag = 1;
            $gameScreen.startFadeOut(this.fadeSpeed());
            break;
    }
};

const _Scene_Map_fadeInForTransfer = Scene_Map.prototype.fadeInForTransfer;
Scene_Map.prototype.fadeInForTransfer = function() {
    _Scene_Map_fadeInForTransfer.call(this);
    this.NAFfadeInForTransfer();
};

//更新後のロード時、強制でフェードインしないようにする。
//!$gameMap.isAnyEventStarting()は、移動前でなく、本当に現在のマップで実行しているイベントか確認する。
Scene_Map.prototype.NAFfadeInForTransfer = function() {
    if($gamePlayer.fadeType() !== undefined && (!$gameMap.isAnyEventStarting() || $gameTemp._NAFtrflag < 2)){
        if(!(param.ignoreswitch > 0 && $gameSwitches.value(param.ignoreswitch))){
            $gameScreen.startFadeIn(this.fadeSpeed());
        }
    }
    $gameTemp._NAFtrflag = 0;
};


const _Spriteset_Base_createOverallFilters = Spriteset_Base.prototype.createOverallFilters;
Spriteset_Base.prototype.createOverallFilters = function() {
    _Spriteset_Base_createOverallFilters.call(this);
    this._NAFoverallColorFilter = new ColorFilter();
    this.filters.push(this._NAFoverallColorFilter);
};

const _Spriteset_Base_updateOverallFilters = Spriteset_Base.prototype.updateOverallFilters;
Spriteset_Base.prototype.updateOverallFilters = function() {
    _Spriteset_Base_updateOverallFilters.call(this);
    this._NAFoverallColorFilter.setBlendColor($gameScreen.NAFfadecolor());
};


})();
