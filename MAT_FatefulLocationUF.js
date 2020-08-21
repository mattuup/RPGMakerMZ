//=============================================================================
// MAT_FatefulLocationUF.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 場所移動時の自動演奏の制御等
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param bgmSwitch
 * @desc オンにしていると場所移動時設定したBGMを自動演奏しません。
 * @type switch
 * @default 10
 * 
 * @param bgsSwitch
 * @desc オンにしていると場所移動時設定したBGSを自動演奏しません。
 * @type switch
 * @default 11
 * 
 * @param ufinitVariable
 * @desc このIDの変数は自動演奏タイミングで0になります。
 * (自動演奏が有効でも無効でも同様です。)
 * @type variable
 * @default 0
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （FatefulLocationUF.js再録）
 * 
 * パラメータ設定のスイッチをオンにしている時は場所移動時に
 * BGMやBGSがマップの自動演奏設定のものにならないため
 * イベントなどに役立ててください。
 * （この場所移動はプロジェクト更新後の既存セーブのロード時も含みます。）
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


Game_Map.prototype.autoplay = function() {
    if ($dataMap.autoplayBgm && (param.bgmSwitch <= 0 || !$gameSwitches.value(param.bgmSwitch))) {
        AudioManager.playBgm($dataMap.bgm);
    }
    if ($dataMap.autoplayBgs && (param.bgsSwitch <= 0 || !$gameSwitches.value(param.bgsSwitch))) {
        AudioManager.playBgs($dataMap.bgs);
    }
    if(param.ufinitVariable > 0){
        $gameVariables.setValue(param.ufinitVariable, 0);
    }
};


})();
