//=============================================================================
// MAT_TrickField.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 行動順の反転
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param trigswitch
 * @desc 戦闘中、このスイッチがオンの間反転します。
 * @type switch
 * @default 10
 * 
 * @param validrand
 * @desc ターン制行動決定時の敏捷性に乱数をかける計算をします。
 * OFFの場合は行いません。(通常時・反転時両方に反映)
 * @default false
 * @type boolean
 * 
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （TrickField.js再録および大幅な格調）
 * 
 * ターン制の場合、スイッチがオンの間に行われる敏捷性計算を変更し
 * 行動中が反転するようになります。
 * （スキルなどでスイッチをオンにした場合次のターンの計算から）
 * 行動の速度補正の反映は通常時と優劣は変わりません。
 * （大きいほど有利です。）
 * 
 * TPBでは、スイッチがオンの間は結果的に遅い方が、
 * 早く、多く行動できるようになります。
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


DataManager.TFisvalid = function() {
    return $gameParty.inBattle() && param.trigswitch > 0 && $gameSwitches.value(param.trigswitch);
};


//都合上再定義、ターン制で用いる。
Game_Action.prototype.speed = function() {
    const subject = this.subject();
    const item = this.item();
    const agi = subject.agi;
    let speed = agi;
    if(DataManager.TFisvalid()){
        speed = Math.max(999999 - agi, 1);
    }
    if(param.validrand) speed += Math.randomInt(Math.floor(5 + agi / 4));
    if(item) speed += item.speed;
    if(this.isAttack()) speed += subject.attackSpeed();
    return speed;
};


const _Game_Battler_tpbSpeed = Game_Battler.prototype.tpbSpeed;
Game_Battler.prototype.tpbSpeed = function() {
    if(DataManager.TFisvalid()){
        return Math.sqrt(Math.max(($gameParty.TFalltpbBaseSpeed() - this.agi), 0)) + 1;
    }else{
        return _Game_Battler_tpbSpeed.call(this);
    }
};


Game_Party.prototype.TFalltpbBaseSpeed = function() {
    const value1 = this.tpbBaseSpeed();
    const value2 = $gameTroop.tpbBaseSpeed();
    return Math.max(value1, value2);
};


})();
