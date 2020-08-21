//=============================================================================
// MAT_StypeAutoopen.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 スキルタイプ追加の仕様変更
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
 * （StypeLicense.js再録）
 * 
 * そのアクターが現在習得しているスキルのスキルタイプのみ、
 * 特徴「スキルタイプ追加」が適用されているのと同じふるまいになります。
 * （デフォルトの特徴「スキルタイプ追加」は使えなくなります。）
 * したがって、そのアクターの関係する特徴に「スキルタイプ追加」が
 * 全くついていなくても、スキルタイプが魔法のスキルを覚えていれば
 * そのスキルタイプが選択可能になり、魔法のスキルを全て忘れた後は
 * そのスキルタイプが選択不可能になります。
 * 
 * また、イベントコマンド「条件分岐」のスクリプトにて
 * 以下の記述を行うことでそのアクターが特定のスキルタイプのスキルを
 * 習得しているか判定することができます。
 * 
 * 引数aにはアクターID、bにはスキルタイプIDを入れてください。
 * $gameActors.actor(a).SAisopentype(b)
 * 
 * 例：ID2のアクターがID1のスキルタイプに属するスキルを習得しているか。
 * $gameActors.actor(2).SAisopentype(1)
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

Game_Actor.prototype.addedSkillTypes = function() {
    return this.SAopentypes();
};

Game_Actor.prototype.SAopentypes = function() {
    return $dataSystem.skillTypes
        .map((st, index) => index)
        .filter(st => st && this.SAisopentype(st));
};

Game_Actor.prototype.SAisopentype = function(stypeId) {
    return this.skills().some(skill => skill && skill.stypeId === stypeId);
};


})();
