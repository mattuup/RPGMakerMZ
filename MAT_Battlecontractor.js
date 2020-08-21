//=============================================================================
// MAT_Battlecontractor.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 戦え……戦え……
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
 * 
 * パーティコマンドの入力を断固拒否して
 * 戦闘を進行します。
 * （したがって戦う、逃げるは選択不可能になります。）
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
    _Scene_Battle_updateCancelButton.call(this);
    if (this._cancelButton && this._cancelButton.visible && this._actorCommandWindow.active) {
        const actor = BattleManager.actor();
        this._cancelButton.visible = actor && actor._actionInputIndex > 0;
    }
};

//戦え……戦え……戦え……戦え……
const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    _Scene_Battle_startPartyCommandSelection.call(this);
    BattleManager.selectNextCommand();
    this._partyCommandWindow.close();
    this._partyCommandWindow.deactivate();
};

})();
