//=============================================================================
// MAT_EmptyVal.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 ゲーム変数に空の文字列を代入できます。
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
 * （EmptyVal.js再録）
 * 
 * 本来、ゲーム変数に空の文字列を代入しても
 * 参照の時に０を返されるのがデフォルトの動作ですが
 * このプラグインを導入した場合、値が空の文字列ならそのまま返します。
 * 
 */


(() => {

'use strict';

const _Game_Variables_value = Game_Variables.prototype.value;
Game_Variables.prototype.value = function(variableId) {
    const val = this._data[variableId];
    if(val === "") return val;
    return _Game_Variables_value.call(this, variableId);
};
    
    
})();
