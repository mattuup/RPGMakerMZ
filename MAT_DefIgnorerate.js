//=============================================================================
// MAT_DefIgnorerate.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 一定確率で防御無視するようになります。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param stateId
 * @desc 確率に使うステートのID
 * @type state
 * @default 10
 * 
 * @param looserate
 * @desc ステート有効度を確率でなく軽減率として使用します。
 * @default false
 * @type boolean
 * 
 * @param ignoreparamId
 * @desc スキル対象の無視される通常能力値のID0~7
 * ただし0と1を含めるのはおすすめできません。
 * @default ["2","3","4","5","6","7"]
 * @type number[]
 * 
 * @param critignore
 * @desc 会心時無条件に加算される確率・軽減率
 * （百分率）
 * @type number
 * @min 0
 * @max 100
 * @default 100
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （DefIgnorerate.js再録）
 * 
 * アイテムまたはスキルの行動主体（使用者）の特定のステート有効度によって確率で
 * 対象者の任意の通常能力値を0にしてダメージ計算等をします。
 * アイテムまたはスキルが対象者に与えられてから効果付加等終わるまで継続します。
 * ステート有効度は
 * プラグインパラメータで指定したIDのステートのものを利用します。
 * (指定IDのステート有効度 - 1)の確率で対象者の能力を最低値にします。
 * なお、通常能力値最低値が0の場合は0除算が起こらないように気を付けてください。
 * 通常能力値最低値の変更には
 * 通常能力値最低値を設定できるプラグインを使ってください。
 * 
 * 特徴で「指定IDのステート有効度 * 200」が一つだけ付加されていれば100%です。
 * ただし、プラグインパラメータによってこの確率を
 * 代わりに能力値を軽減する割合として利用することができます。
 * 
 * 他のプラグインとの組み合わせとしては
 * 習得しているスキル等で任意の「特徴」が付与できるプラグインと相性が良いです。
 * また、このプラグインはGame_Action.prototype.applyと
 * Game_Action.prototype.makeDamageValueを拡張するため
 * 可能な限り下の方で適用するのが好ましいと思います。
 * 
 * 会心時に防御無視をすることができます。
 * これ以外の会心時の仕様変更は他のプラグインでしてください。
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);

const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this.setDefIgnore(target);
    _Game_Action_apply.call(this, target);
    target.initignore();
};

const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    if(critical){
        if(param.looserate){
            target._Defignore += param.critignore;
        }else if(Math.random() < param.critignore){
            target._Defignore = 1;
        }   
    }
    return _Game_Action_makeDamageValue.call(this, target, critical);
};

Game_Action.prototype.setDefIgnore = function(target) {
    if(!target) return;
    const rate = this.subject().DefIgnorestateRate();
    if(param.looserate){
        target._Defignore = rate;
    }else if(Math.random() < rate){
        target._Defignore = 1;
    }
};


const _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    _Game_BattlerBase_initMembers.call(this);
    this.initignore();
};

Game_BattlerBase.prototype.initignore = function() {
    this._Defignore = 0;
};

Game_BattlerBase.prototype.DefIgnorestateRate = function() {
    const id = param.stateId;
    if(id <= 0 || this.stateRate(id) < 1) return 0;
    return this.stateRate(id) - 1;
};

Game_BattlerBase.prototype.DIisparamignore = function(paramId) {
    return this._Defignore > 0 && param.ignoreparamId.includes(paramId);
};

const _Game_BattlerBase_param = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
    const orig = _Game_BattlerBase_param.call(this, paramId);
    if(!this.DIisparamignore(paramId)) return orig;
    const minValue = this.paramMin(paramId);
    const maxValue = this.paramMax(paramId);
    const next = orig * (1 - this._Defignore);
    return Math.round(next.clamp(minValue, maxValue));
};


})();
