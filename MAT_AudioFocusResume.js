//=============================================================================
// MAT_AudioFocusResume.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 ウインドウがアクティブでない時BGMとBGSの再生を止めます。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param optionname
 * @desc オプションに表示する名前です。
 * 空欄の場合これのオプション関連全般を処理しません。
 * @default アクティブ時のみBGM再生
 * 
 * @param initvalue
 * @desc オプションの初期値
 * （オプション画面で変更するまでの値）
 * @type boolean
 * @default true
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * 
 * 現在win環境のみ確認
 * ウインドウのフォーカスがなくなった時、オーディオの再生を全て止め
 * 再びフォーカスされた時、BGMとBGSを再開します。
 * (画面の更新はデフォルトのままです。)
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);
const AFRkey1 = "AFRisstop";


const _SceneManager_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
    _SceneManager_initialize.call(this);
    this.AFRinitallmembers();
};

SceneManager.AFRinitallmembers = function() {
    this.AFRsetvalue(false);
};

SceneManager.AFRsetvalue = function(stop, bgm, bgs) {
    this._AFRstop = stop;
    this._AFRbgm = bgm || {};
    this._AFRbgs = bgs || {};
};

const _SceneManager_isGameActive = SceneManager.isGameActive;
SceneManager.isGameActive = function() {
    const def = _SceneManager_isGameActive.call(this);
    if(def){
        this.AFRresume();
    }else{
        this.AFRstop();
    }
    return def;
};

SceneManager.AFRiscanAudiostopconfig = function() {
    const config = ConfigManager[AFRkey1];
    return config || config === undefined;
};

SceneManager.AFRisAudiostop = function() {
    return this._AFRstop;
};

SceneManager.AFRstop = function() {
    if(this.AFRisAudiostop() || !this.AFRiscanAudiostopconfig()) return;
    const bgm = AudioManager.saveBgm();
    const bgs = AudioManager.saveBgs();
    this.AFRsetvalue(true, bgm, bgs);
    AudioManager.stopAll();
};

SceneManager.AFRresume = function() {
    if(!this.AFRisAudiostop()) return;
    const bgm = this._AFRbgm;
    const bgs = this._AFRbgs;
    if(bgm.name) AudioManager.playBgm(bgm, bgm.pos);
    if(bgs.name) AudioManager.playBgs(bgs, bgs.pos);
    this.AFRinitallmembers();
};

if(param.optionname){

    ConfigManager[AFRkey1] = param.initvalue;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config[AFRkey1] = this[AFRkey1];
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this[AFRkey1] = this.readFlag(config, AFRkey1, param.initvalue);
    };

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand(param.optionname, AFRkey1);
    };

}


})();
