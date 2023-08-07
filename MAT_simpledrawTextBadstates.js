//=============================================================================
// MAT_simpledrawTextBadstates.js
// ----------------------------------------------------------------------------
// Copyright (c) 2023 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 バトル中のステート表示をテキストに変更します。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param normaltext
 * @desc ステートにかかっていない時のテキスト
 * @default 正常
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （TextBadstates.js再録）
 * PluginCommonBase.jsが必要。
 * 
 * バトルステータスウインドウにおいて
 * "アイコンのindexが1以上指定されているステートの内"
 * そのアクターに付加されている"一番優先度の高いステートの名前"を表示します。
 * ただし、戦闘不能は常に優先します。
 * （どちらにしろ該当のウインドウ該当箇所ではアイコンは表示しませんが
 * ステートの名前を表示したくない場合はアイコンのindexを0にしてください。
 * そうでない場合はindexが1以上で、必要があれば透明部分を指定してください。）
 * 
 * また、ステートにかかっているときはフォントカラーを変更して表示します。
 * 
 * 
 * ステートのノートタグ
 * 
 * このプラグインによってステートの名前を表示するときの文字色を選択できます。
 * systemフォルダのWindow.pngの右下のところのindexを指定してください。
 * (0~31の数値)
 * 指定がないときは戦闘不能ではそれ用の色が
 * それ以外にはピンチ時のhpカラーが選ばれます。
 * 
 * <TBstatecolor:x>
 * xはindex
 * 
 * 例：<TBstatecolor:1>
 * ステートの名前の文字色を水色にします。
 * デフォルトから変更がなければ、文字色を普通のものにしたい場合0指定でよいです。
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

function Sprite_MATsimpledrawstatesName() {
    this.initialize(...arguments);
}

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);

const TBisZeroOrValid = function(value) {
    return !!value || value === 0;
};

const TBisNumber = function(value) {
    return (typeof value === "number") && isFinite(value);
};

//メソッド中、隠れている時を想定してisDeadでは判定していない。
Game_BattlerBase.prototype.TBfirststate = function() {
    if(this.isDeathStateAffected()){
        return $dataStates[this.deathStateId()];
    }
    return this.states().filter(el => el.iconIndex > 0)[0];
};

ColorManager.TBneedStateColor = function(state, isdead) {
    if(!!isdead) return ColorManager.deathColor();
    if(!state) return ColorManager.normalColor();
    const md = state.meta["TBstatecolor"];
    const color = Number(md);
    if(!(TBisZeroOrValid(md) && TBisNumber(color))){
        return ColorManager.crisisColor();
    }
    return ColorManager.textColor(color.clamp(0,31));
};

//再定義
/*Window_BattleStatus.prototype.drawActorIcons = function(actor, x, y, width) {
    let state, text;
    if(actor.isDeathStateAffected()){
        state = $dataStates[actor.deathStateId()];
        this.changeTextColor(ColorManager.deathColor());
    }else{
        state = actor.TBfirststate();
        this.changeTextColor(ColorManager.crisisColor());
    }
    if(state){   
        text = state.name;
        this.changeStateColorTB(state);
    }else{
        text = param.normaltext;
        this.changeTextColor(ColorManager.normalColor());
    }
    x -= Window_Base._iconWidth / 4;
    width = Window_Base._iconWidth * 3;
    this.drawText(text, x, y, width, 'left');
};*/

//再定義
Window_StatusBase.prototype.placeStateIcon = function(actor, x, y) {
    const key = "actor%1-stateIcon".format(actor.actorId());
    const sprite = this.createInnerSprite(key, Sprite_MATsimpledrawstatesName);
    sprite.setup(actor);
    sprite.move(x - ImageManager.iconWidth * 2.5, y - ImageManager.iconHeight / 2 + 2);
    sprite.show();
};


Sprite_MATsimpledrawstatesName.prototype = Object.create(Sprite_Name.prototype);
Sprite_MATsimpledrawstatesName.prototype.constructor = Sprite_MATsimpledrawstatesName;

Sprite_MATsimpledrawstatesName.prototype.initialize = function() {
    Sprite_Name.prototype.initialize.call(this);
    this._TBrefcount = 0;
};

Sprite_MATsimpledrawstatesName.prototype.bitmapHeight = function() {
    return 24;
};

Sprite_MATsimpledrawstatesName.prototype.bitmapWidth = function() {
    return this.bitmapHeight() * 4;
};

Sprite_MATsimpledrawstatesName.prototype.updateBitmap = function() {
    if(this._TBrefcount === 0){
        const name = this.name();
        if (name !== this._name) {
            this._name = name;
            this.redraw();
        }
    }
    this._TBrefcount++;
    if(this._TBrefcount >= 5){
        this._TBrefcount = 0;
    }
};

Sprite_MATsimpledrawstatesName.prototype.TBfirststate = function() {
    return this._battler ? this._battler.TBfirststate() : null;
};

Sprite_MATsimpledrawstatesName.prototype.name = function() {
    if(!this._battler) return "";
    const state = this.TBfirststate();
    return state ? state.name : param.normaltext;
};

Sprite_MATsimpledrawstatesName.prototype.textColor = function() {
    return ColorManager.TBneedStateColor(this.TBfirststate(), (this._battler && this._battler.isDeathStateAffected()));
};

//右揃えに再定義
Sprite_MATsimpledrawstatesName.prototype.redraw = function() {
    this.setupFont();
    this.bitmap.clear();
    this.bitmap.drawText(this.name(), 0, 0, this.bitmapWidth(), this.bitmapHeight(), "right");
};


})();
