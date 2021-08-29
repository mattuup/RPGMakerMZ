//=============================================================================
// MAT_ActorAlwaysgainparams.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 常にそのアクターの通常能力値に加算される固定値を設定します。
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
 * 該当のノートタグ設定のあるアクターはその能力値に設定値を加算します。
 * （あくまで能力値計算上は、そのレベルの能力値に加算）
 * なお、それぞれの能力最低値と最高値を考慮せず、
 * また導入前既存セーブデータで適切に動作しない可能性があるため注意してください。
 * 
 * 
 * ---アクターのノートタグ---
 * 
 * <MATAlwaysX:value>
 * Xには以下の通常能力値を表す文字列を入れてください。
 * ["mhp","mmp","atk","def","mat","mdf","agi","luk"]
 * 
 * valueには該当の能力値に加算する値を入れてください。
 * 
 * 例：<MATAlwaysatk:20>
 * 攻撃力に20加算。
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

//const script = document.currentScript;
//const param  = PluginManagerEx.createParameter(script);

const _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    const def = _Game_Actor_paramBase.call(this, paramId);
    return def + this.MATAAretAlwaysgainparam(paramId);
};

Game_Actor.prototype.MATAAretAlwaysgainparam = function(paramId) {
    const data = this.actor();
    const array = ["mhp","mmp","atk","def","mat","mdf","agi","luk"];
    const text = "MATAlways" + array[paramId];
    if(!data) return 0;
    return Number(data.meta[text] || 0);
};

})();
