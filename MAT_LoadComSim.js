//=============================================================================
// MAT_LoadComSim.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 メニューコマンドに「ロード」を追加します。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param loadtext
 * @desc 「ロード」のコマンド名です。
 * @default ロード
 * 
 * @param testenable
 * @desc イベントテスト中でも「ロード」を有効にする。
 * @default false
 * @type boolean
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （LoadComSim.js再録）
 * 
 * セーブデータがないときは「ロード」は選択できません。
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("load", this.commandLoad.bind(this));
};

Scene_Menu.prototype.commandLoad = function() {
    SceneManager.push(Scene_Load);
};

const _Window_MenuCommand_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
Window_MenuCommand.prototype.addSaveCommand = function() {
    _Window_MenuCommand_addSaveCommand.call(this);
    this.addCommand(param.loadtext, "load", this.isLoadEnabled());
};
    
Window_MenuCommand.prototype.isLoadEnabled = function() {
    if(!param.testenable && DataManager.isEventTest()) return false;
    return DataManager.isAnySavefileExists();
};


})();
