//=============================================================================
// MAT_EnemyPaper.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 能力はそのままに、敵キャラの画像だけ変えます。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * 
 * @command EPbattlername
 * @desc 敵キャラの画像を変更します。
 * 画像は必要な方だけ指定してください。
 *
 * @arg enemyindex
 * @desc その敵キャラのindexを指定します。
 * @default 0
 * @type number
 * @min 0
 * @max 99
 * 
 * @arg battlername
 * @desc その敵キャラの画像を指定します。
 * 空欄の場合は元に戻します。
 * @default 
 * @dir img/enemies/
 * @type file
 * 
 * @arg svbattlername
 * @desc その敵キャラの画像を指定します。
 * こちらはサイドビュー用。空欄の場合は元に戻します。
 * @default 
 * @dir img/sv_enemies/
 * @type file
 * 
 * @command EPbattlerhue
 * @desc 敵キャラの色調を変更します。
 * 
 * @arg enemyindex
 * @desc その敵キャラのindexを指定します。
 * @default 0
 * @type number
 * @min 0
 * @max 99
 * 
 * @arg hue
 * @desc その敵キャラの色調(0~360)を指定します。
 * -1の場合はその敵キャラのデータベースの値と同様です。
 * @default 0
 * @type number
 * @min -1
 * @max 360
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （EnemyPaper.js再録）
 * 
 * 戦闘中、プラグインコマンドで敵キャラの画像のみ変更することができます。
 * 現在は画像と、色調の変更に対応しています。
 * 
 * なお、このプラグイン単体では
 * デプロイメントのオプション「未使用ファイルを除外する」による
 * 除外を回避することができません。
 * そのオプションを使う場合はMaterialBase.jsなどと併用して
 * 除外を回避するようにしてください。
 * 
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
//const param  = PluginManagerEx.createParameter(script);

PluginManagerEx.registerCommand(script, "EPbattlername", function(args) {
    if(!$gameParty.inBattle()) return;
    const enemy = $gameTroop.members()[args.enemyindex];
    if(!enemy) return;
    let name;
    if($gameSystem.isSideView()){
        name = args.svbattlername;
    }else{
        name = args.battlername;
    }
    enemy.EPsetname(name);
});

PluginManagerEx.registerCommand(script, "EPbattlerhue", function(args) {
    if(!$gameParty.inBattle()) return;
    const enemy = $gameTroop.members()[args.enemyindex];
    if(!enemy) return;
    enemy.EPsethue(args.hue);
});


const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function(){
    _Game_Enemy_initMembers.call(this);
    this.EPinitallMembers();
};

Game_Enemy.prototype.EPinitallMembers = function(){
    this._EPbattlername = null;
    this._EPbattlerhue = -1;
    this._EPforce = false;
};

Game_Enemy.prototype.EPsetname = function(name) {
    this._EPbattlername = name;
    this._EPforce = true;
};

Game_Enemy.prototype.EPsethue = function(value) {
    this._EPbattlerhue = value;
    this._EPforce = true;
};

Game_Enemy.prototype.EPischange = function() {
    return this._EPforce;
};


const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() {
    const enemy = this._enemy;
    if (enemy && enemy.EPischange()){
        this.EPupdatepaper();
    }else{
        _Sprite_Enemy_updateBitmap.call(this);
    }
};

Sprite_Enemy.prototype.EPupdatepaper = function() {
    const enemy = this._enemy;
    const name = enemy._EPbattlername || enemy.battlerName();
    let hue = enemy._EPbattlerhue;
    if(hue < 0){
        hue = enemy.battlerHue();
    }
    hue = Math.round(hue.clamp(0, 360));
    this.loadBitmap(name);
    this.setHue(hue);
    enemy._EPforce = false;
};


})();
