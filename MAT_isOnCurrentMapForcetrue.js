//=============================================================================
// MAT_isOnCurrentMapForcetrue.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 isOnCurrentMapを常にtrueにします。
 * @author mattuup
 * @target MZ
 * @url https://github.com/mattuup/RPGMakerMZ
 *
 * @help
 * RPGで笑顔を・・・
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 利用規約はMITライセンスの通り。
 * （isOnCurrentMapForcetrue.js再録）
 * イベント実行内容の実行開始時と違うマップにいても
 * 現在いるマップのイベントを参照できるようにします。
 * （ただし、その全ての動作を保証するものではありません。）
 */

(() => {
'use strict';
Game_Interpreter.prototype.isOnCurrentMap = function() {
    return true;
};
})();
