//=============================================================================
// MAT_IgMakeCursorAlpha.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 makeCursorAlpha再定義
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param MenuCommandOnly
 * @desc Window_MenuCommandだけそうする。
 * @default false
 * @type boolean
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * 
 * ウインドウのコマンドなどのカーソルのアルファ値の更新（点滅）が事実上なくなります。
 * アクティブ、非アクティブのそれぞれの時の差もありません。
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);

if(param.MenuCommandOnly){

    Window_MenuCommand.prototype._makeCursorAlpha = function() {
        return this.contentsOpacity / 255;
    };

}else{

    Window.prototype._makeCursorAlpha = function() {
        return this.contentsOpacity / 255;
    };

}

})();
