//=============================================================================
// MAT_Levelupse.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 レベルアップSE
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param isplaytiming
 * @desc メッセージのタイミングごとでなく
 * レベルが上がったタイミングごとで鳴らします。
 * @type boolean
 * @default false
 * 
 * @param levelupsename
 * @desc 決定se
 * @type file
 * @dir audio/se/
 * @default Up4
 * 
 * @param levelupseparam
 * @desc 上記seのvolume, pitch, pan（位相）
 * @default [80, 100, 0]
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * 
 * パラメータ「isplaytiming」はfalse推奨。
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


AudioManager.Llevelplayse = function() {
    const se = {};
    const name = param.levelupsename
    const array = param.levelupseparam;
    if(!(name && array)) return;
    se.name = name;
    se.volume = Number(array[0] || 80);
    se.pitch = Number(array[1] || 100);
    se.pan = Number(array[2] || 0);
    this.playSe(se);
};

if(param.isplaytiming){
    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);
        AudioManager.Llevelplayse();
    };
    return;
}

const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    $gameMessage._Llevelupse = true;
    _Game_Actor_displayLevelUp.call(this, newSkills);
};

const _Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    _Game_Message_clear.call(this);
    this._Llevelupse = false;
};

//アクターの名前に半角英数字が入ってもいいように
const _Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
    if(this._Llevelupse){
        text = "\\LSE[0]" + text;
    }
    _Game_Message_add.call(this, text);
    this._Llevelupse = false;
};

const _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
        case "LSE":
            this.Llevelplayse(this.obtainEscapeParam(textState));
            break;
        
        default:
            _Window_Message_processEscapeCharacter.call(this, code, textState);
            break;
    }
};

Window_Message.prototype.Llevelplayse = function(value) {
    AudioManager.Llevelplayse();
};


})();
