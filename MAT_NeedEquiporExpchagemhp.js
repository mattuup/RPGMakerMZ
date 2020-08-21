//=============================================================================
// MAT_NeedEquiporExpchagemhp.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 装備変更時とレベル変動時のMHP増加の補完
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param equipValid
 * @desc 装備の当該機能を有効にします。
 * @default true
 * @type boolean
 * 
 * @param expValid
 * @desc 経験値の当該機能を有効にします。
 * @default true
 * @type boolean
 * 
 * @param recoverAllValid
 * @desc 経験値の当該機能で増加分回復する時、
 * 代わりに全回復と同様の処理をします。
 * @default true
 * @type boolean
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （NeedEquipchagemhp.jsとNeedexpchangemhp.jsを再録）
 * 
 * 装備の変更によって
 * mhpまたはmmpが増加した場合増加分回復します。
 * 
 * レベル変動時（経験値変動時）に
 * mhpまたはmmpが増加した場合増加分回復します。
 * 
 * 各回復にはアクターのリフレッシュが含まれるため
 * それに伴い、装備の変更や経験値の変更などを行う場合には
 * 無限回帰を引き落とす可能性があります。
 * デフォルトではまず問題ありませんが
 * 他のプラグインと同時に導入する場合はお気を付けください。
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


Game_Actor.prototype.NEEprearray = function() {
    return [this.mhp, this.mmp];
};

Game_Actor.prototype.NEEneedrecover = function(array, recoverAll) {
    const difhp = this.mhp - array[0];
    const difmp = this.mmp - array[1];
    const hpc = (difhp > 0);
    const mpc = (difmp > 0);
    if(recoverAll && (hpc || mpc)){
        this.recoverAll();
        return;
    }
    if(hpc) this.setHp(this.hp + difhp);
    if(mpc) this.setMp(this.mp + difmp);
};

if(param.equipValid){

    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        const array = this.NEEprearray();
        _Game_Actor_changeEquip.call(this, slotId, item);
        this.NEEneedrecover(array, false);
    };

}

if(param.expValid){

    //レベルダウン時にもmhp等は増える可能性があるためlevelup側ではなくこちらで計算する。
    const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        const array = this.NEEprearray();
        _Game_Actor_changeExp.call(this, exp, show);
        this.NEEneedrecover(array, param.recoverAllValid);
    };

}


})();
