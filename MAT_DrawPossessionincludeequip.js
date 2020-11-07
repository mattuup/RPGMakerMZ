//=============================================================================
// MAT_DrawPossessionincludeequip.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 ショップシーンでの持っている数に装備分を含む。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 *
 * @help
 * RPGで笑顔を・・・
 * 利用規約はMITライセンスの通り。
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._DPincludeequip = false;
};

const _Game_Party_numItems = Game_Party.prototype.numItems;
Game_Party.prototype.numItems = function(item) {
    const def = _Game_Party_numItems.call(this, item);
    return def + this.DPSomeMemberEquipped(item);
};

Game_Party.prototype.DPSomeMemberEquipped = function(item) {
    if(!(item && $gameTemp._DPincludeequip)) return 0;
    return this.members().reduce(function(r, actor) {
        if(actor.equips().includes(item)){
            return r + 1;
        }else{
            return r;
        }
    }, 0);
};

const _Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
Window_ShopStatus.prototype.drawPossession = function(x, y) {
    $gameTemp._DPincludeequip = true;
    _Window_ShopStatus_drawPossession.call(this, x, y);
    $gameTemp._DPincludeequip = false;
};

})();
