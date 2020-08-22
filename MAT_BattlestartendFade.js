//=============================================================================
// MAT_BattlestartendFade.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 戦闘始終のフェードインの制御
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param Notstartfadesw
 * @desc このIDのスイッチがオンの時
 * 戦闘開始時にフェードインしません。
 * @type switch
 * @default 10
 * 
 * @param Notendfadesw
 * @desc このIDのスイッチがオンの時
 * 戦闘終了時にフェードインしません。
 * @type switch
 * @default 10
 * 
 * @param Notstartplaysw
 * @desc このIDのスイッチがオンの時
 * 戦闘開始時に戦闘BGMの演奏を開始しません。
 * @type switch
 * @default 12
 * 
 * @param Notreplaysw
 * @desc このIDのスイッチがオンの時
 * 戦闘終了時に戦闘前のBGM等を再開しません。
 * @type switch
 * @default 12
 * 
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （BattlestartFade.jsとBattleendFade.js再録）
 * 
 * フェードインしたいときは普通に
 * イベントコマンド「画面のフェードイン」を使ってください。
 * 
 * Notstartfadeswが有効な時
 * 戦闘開始時メッセージを自動でとばします。
 * また、同時にフェードアウト中はステータスウインドウを閉じます。
 * 
 * Notstartplayswが有効な時
 * 戦闘開始前、audioを止めません。
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);
const fadetime = 24;


DataManager.isNotstartfadesw = function() {
    return param.Notstartfadesw > 0 && $gameSwitches.value(param.Notstartfadesw);
};

DataManager.isNotstartplaysw = function() {
    return param.Notstartplaysw > 0 && $gameSwitches.value(param.Notstartplaysw);
};


const _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    if(DataManager.isNotstartplaysw()){
        return;
    }
    _BattleManager_playBattleBgm.call(this);
};

const _Scene_Map_stopAudioOnBattleStart = Scene_Map.prototype.stopAudioOnBattleStart;
Scene_Map.prototype.stopAudioOnBattleStart = function() {
    if(DataManager.isNotstartplaysw()){
        return;
    }
    _Scene_Map_stopAudioOnBattleStart.call(this);
};

const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
    if(DataManager.isNotstartfadesw()){
        $gameScreen._brightness = 0;
    }
    _Scene_Battle_createSpriteset.call(this);
};

const _Scene_Battle_shouldOpenStatusWindow = Scene_Battle.prototype.shouldOpenStatusWindow;
Scene_Battle.prototype.shouldOpenStatusWindow = function() {
    const def = _Scene_Battle_shouldOpenStatusWindow.call(this);
    const forcefade = (DataManager.isNotstartfadesw() && $gameScreen.brightness() <= 0);
    if(forcefade){
        this._statusWindow.close();
    }
    return def && !forcefade;
};

const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
    if(DataManager.isNotstartfadesw()){
        return;
    }
    _BattleManager_displayStartMessages.call(this);
};

const _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
BattleManager.replayBgmAndBgs = function() {
    if(param.Notreplaysw > 0 && $gameSwitches.value(param.Notreplaysw)){
        return;
    }
    _BattleManager_replayBgmAndBgs.call(this);
};

const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
    if(param.Notendfadesw > 0 && $gameSwitches.value(param.Notendfadesw)){
        $gameScreen.startFadeOut(fadetime);
    }
    _BattleManager_updateBattleEnd.call(this);
};


})();
