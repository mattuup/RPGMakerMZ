//=============================================================================
// MAT_artifactItem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 MPやTPのコストを要求するアイテムを作成します。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param inBattleonly
 * @desc アイテムコストの要求を戦闘中のみにする。
 * @type boolean
 * @default true
 * 
 * @param Actorselect
 * @desc メニューのアイテムコマンドにアクターの選択を要求します。
 * inBattleonlyがfalseかつアイテム使用可能な場合はtrue推奨
 * @type boolean
 * @default false
 * 
 * @param includesfix
 * @desc Window_BattleItem.prototype.includesに修正を与えます。
 * @type boolean
 * @default true
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * アイテムのノートタグ
 * <ItMPpay: x>
 * <ItTPpay: x>
 * 
 * xには0を超える数値を入れてください。
 * それぞれ、アイテムの仕様に必要なmpとtpのコストを設定します。
 * 両方のコストを設定した場合もちろん使用に両方のコストを要求しますが
 * 表示するのはmpのコストのみです。
 * 
 * 
 * 利用規約はMITライセンスの通り。
 * （MagicItems.js大幅改修）
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


Game_BattlerBase.prototype.namadefmeetsItemConditions = function(item) {
    return this.meetsUsableItemConditions(item) && $gameParty.hasItem(item);
};

const aliasmeetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    const def = aliasmeetsItemConditions.call(this, item);
    return def && this.canPayitemCost(item);
};

Game_BattlerBase.prototype.itemMpCost = function(item) {
    if(!this.shouldPayitemCost(item)) return 0;
    const namacost = Math.max(Number(item.meta["ItMPpay"] || 0), 0);
    return Math.floor(namacost * this.mcr);
};

Game_BattlerBase.prototype.itemTpCost = function(item) {
    if(!this.shouldPayitemCost(item)) return 0;
    const namacost = Math.max(Number(item.meta["ItTPpay"] || 0), 0);
    return Math.floor(namacost);
};

Game_BattlerBase.prototype.shouldPayitemCost = function(item) {
    return $gameParty.inBattle() || !param.inBattleonly;
};

Game_BattlerBase.prototype.canPayitemCost = function(item) {
    return this._mp >= this.itemMpCost(item) && this._tp >= this.itemTpCost(item);
};

Game_BattlerBase.prototype.payitemCost = function(item) {
    this._mp -= this.itemMpCost(item);
    this._tp -= this.itemTpCost(item);
};

const _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
    _Game_Battler_consumeItem.call(this, item);
    this.payitemCost(item);
};

const _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(rect) {
    _Window_ItemList_initialize.call(this, rect);
    this.setActor($gameParty.menuActor());
};

Window_ItemList.prototype.setActor = function(actor) {
    if(this._actor === actor) return;
    this._actor = actor;
    this.refresh();
};

Window_ItemList.prototype.usecostactor = function() {
    return this._actor;
};

//引数や競合の危険性などを勘案してこれにフック。
const _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    this.drawItemCost(item, x, y, width);
    _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
};

Window_ItemList.prototype.itemnumberWidth = function(item) {
    const maxnum = $gameParty.maxItems(item);
    return this.textWidth(String(maxnum)) + this.textWidth(":");
};

Window_ItemList.prototype.rightcostWidth = function(item, width) {
    return width - this.itemnumberWidth(item);
};

Window_ItemList.prototype.drawItemCost = function(item, x, y, width) {
    const actor = this.usecostactor();
    if(!actor) return;
    const mpcost = actor.itemMpCost(item);
    const tpcost = actor.itemTpCost(item);
    const drawcost = (mpcost || tpcost || 0);
    if(mpcost > 0){
        this.changeTextColor(ColorManager.mpCostColor());
    }else if(tpcost > 0){
        this.changeTextColor(ColorManager.tpCostColor());
    }
    if(drawcost > 0){
        this.drawText(String(drawcost), x, y, this.rightcostWidth(item, width), "right");
    }
    this.resetTextColor();
};

const _Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
    const def = _Window_ItemList_isEnabled.call(this, item);
    const actor = this.usecostactor();
    return def && actor && actor.canUse(item);
};

//オーバーライド
Window_BattleItem.prototype.usecostactor = function() {
    return BattleManager.actor();
};

const _Window_BattleItem_includes = Window_BattleItem.prototype.includes;
Window_BattleItem.prototype.includes = function(item) {
    const def = _Window_BattleItem_includes.call(this, item);
    return def || this.artifactincludes(item);
};

Window_BattleItem.prototype.artifactincludes = function(item) {
    const actor = this.usecostactor();
    return param.includesfix && DataManager.isItem(item) && actor && actor.namadefmeetsItemConditions(item);
};


//Scene_Item前にアクター選択が必要か
if(!param.Actorselect){

    const _Window_ItemList_usecostactor = Window_ItemList.prototype.usecostactor;
    Window_ItemList.prototype.usecostactor = function() {
        const def = _Window_ItemList_usecostactor.call(this);
        let actor;
        if(SceneManager._scene instanceof Scene_Item){
            actor = SceneManager._scene.user();
        }
        return actor || def;
    };

    return;

}


const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("item", this.commandPersonal.bind(this));
    
};

const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    _Scene_Menu_onPersonalOk.call(this);
    if(this._commandWindow.currentSymbol() === "item"){
        this.commandItem();
    }
};

Scene_Item.prototype.user = function() {
    return this._itemWindow.usecostactor();
};


})();
