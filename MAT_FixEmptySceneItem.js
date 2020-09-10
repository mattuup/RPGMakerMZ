//=============================================================================
// MAT_FixEmptySceneItem.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 アイテムシーンのバグ修正
 * @author mattuup
 * @target MZ
 * @url https://github.com/mattuup/RPGMakerMZ
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （FixEmptySceneItem.js再録）
 * 
 * デフォルトのプロジェクトでのScene_Itemにおいて
 * パーティが全員「行動できない」の行動制約のあるステートにかかっている時
 * （特に使用者選択中で、そうでない時からアイテムのステート付加などで
 * 　全員が「行動できない」になった時）
 * 使用アクター選択でエラー落ちする不具合を修正します。
 * 実際には代わりにパーティの先頭メンバーを使用者（行動主体）
 * として扱うようにします。
 * この時、アイテムの使用条件を満たさないためアイテムは使用できません。
 * 使用後の状態を確認するため、
 * アクター選択ウインドウはデフォルト通り閉じないままにしてあります。
 * 
 * なお、バグはエディタ本体ver1.0.0で確認したものです。
 * 将来的に修正される可能性があります。
 * エディタ本体ver1.0.2で修正を確認。
 * これ以降のバージョンであれば原則このプラグインは必要ありません。
 * 
 */

(() => {

'use strict';
//競合等を避けるためGame_Unit.prototype.movableMembersではなく直接処理に紐付ける。
const _Scene_Item_user = Scene_Item.prototype.user;
Scene_Item.prototype.user = function() {
    const actor = _Scene_Item_user.call(this);
    return actor || $gameParty.members()[0];
};
 
})();
