//=============================================================================
// MAT_AudioFocusResume.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.02 ウインドウがアクティブでない時BGMとBGSの再生を止めます。
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
 * （オプション名が有効かつオプション画面で変更するまでの値）
 * @type boolean
 * @default true
 * 
 * @param useWebAudioMute
 * @desc WebAudioの一部改変で行う方式に変更します。
 * (ver1.02~,offの場合はver1.01以前の仕様になります。)
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
 * パラメータ「useWebAudioMute」が有効かどうかで
 * 動作が少し異なるので注意してください。
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
const fadetime = 0;


if(param.useWebAudioMute){
    
    //以下ブロック内ほぼ再定義
    WebAudio._onHide = function() {
        if (this._shouldMuteOnHide()) {
            this._fadeOut(fadetime);
        }
    };

    WebAudio._onShow = function() {
        if (this._shouldMuteOnHide()) {
            this._fadeIn(fadetime);
        }
    };

    //この再定義の関係でローカル環境のみ推奨。
    WebAudio._shouldMuteOnHide = function() {
        return ConfigManager.AFRisvalid();
    };

}else{

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
        return ConfigManager.AFRisvalid();
    };

    SceneManager.AFRisAudiostop = function() {
        return this._AFRstop;
    };

    //単にstopall→playbgmだと若干遅延するのでbufferを処理
    SceneManager.AFRstop = function() {
        if(this.AFRisAudiostop() || !this.AFRiscanAudiostopconfig()) return;
        const bgm = AudioManager.saveBgm();
        const bgs = AudioManager.saveBgs();
        this.AFRsetvalue(true, bgm, bgs);
        AudioManager.stopMe();
        AudioManager.stopSe();
        if(AudioManager._bgmBuffer) AudioManager._bgmBuffer.stop();
        if(AudioManager._bgsBuffer) AudioManager._bgsBuffer.stop();
    };

    SceneManager.AFRresume = function() {
        if(!this.AFRisAudiostop()) return;
        const bgm = this._AFRbgm;
        const bgs = this._AFRbgs;
        if(bgm.name){
            if(AudioManager._bgmBuffer && AudioManager.isCurrentBgm(bgm)) {
                AudioManager._bgmBuffer.play(true, bgm.pos);
            }else{
                AudioManager.playBgm(bgm);
            }
        }
        if(bgs.name){
            if(AudioManager._bgsBuffer && AudioManager.isCurrentBgs(bgs)) {
                AudioManager._bgsBuffer.play(true, bgs.pos);   
            }else{
                AudioManager.playBgs(bgs);
            }
        }
        this.AFRinitallmembers();
    };

}


//コンフィグ判定用、設定が存在しない場合は有効と同等。
ConfigManager.AFRisvalid = function() {
    const config = this[AFRkey1];
    return config || config === undefined;
};

//以下オプション設定
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
