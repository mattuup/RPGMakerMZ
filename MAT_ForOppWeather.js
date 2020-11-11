//=============================================================================
// MAT_ForOppWeather.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 今日もいい天気。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @orderAfter EventCommandByCode
 * @orderAfter SoR_Outdoor_Weather_MZ
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param dimrate
 * @desc 天候の強さによって変わる画面の暗さの強弱です。
 * このIDの変数の値を参照します。
 * @type variable
 * @default 20
 * 
 * @param fill
 * @desc このIDの変数に"white"などと入れることによって
 * 天候のスプライトの色を変更します。
 * @type variable
 * @default 21
 * 
 * @param oppo
 * @desc このIDの変数が0未満の時天候の動きが反転します。
 * @type variable
 * @default 22
 * 
 * @param dimcolors
 * @desc 天候によって変わる画面の暗さの色です。
 * 変数の値に"[127, 127, 127]"などと入れてください。
 * @type variable
 * @default 23
 * 
 * @param scalerandom
 * @desc 雪系や光系の天候の場合に、
 * それぞれの大きさがランダムになります。
 * @type boolean
 * @default true
 * 
 * @param validmaptag
 * @desc マップのノートタグ指定での天候操作可否(タイプと強さ)
 * 例：<FOWWeather:none,0>、<FOWWeather:light,8>
 * @type boolean
 * @default true
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （ForOppWeather.js再録）
 * 
 * fillに所定の文字列を入れると天候の色を変更することができます。
 * "rgba(0, 0, 0, 0.5)"と入れればやや透明な黒い雨が降ります！
 * "rgba(255, 255, 255, 0)"と入れれば全く透明な白い雨が降ります！
 * 変数が0のときは一括で白"white"です。
 * 
 * EventCommandByCode.jsなどでデフォルト以外のtypeを指定して
 * 天候を操作する場合以下の追加された天候を利用することができます。
 * (スクリプトに関してはGame_Interpreter.prototype.command236参照)
 * blizzard
 * light
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


Weather.prototype.FOWcolor = function() {
    const id = param.fill;
    let value;
    if(id > 0){
        value = $gameVariables.value(id);
    }
    return value || "white";
};

Weather.prototype.FOWisoppo = function() {
    const id = param.oppo;
    return id > 0 && $gameVariables.value(id) < 0;
};

Weather.prototype.FOWdimcolors = function(value) {
    if(value){
        return JSON.parse(value);
    }else{
        return [80, 80, 80];
    }
};

//生成時に必ず一回は色付けすること。
const _Weather_createBitmaps = Weather.prototype._createBitmaps;
Weather.prototype._createBitmaps = function() {
    _Weather_createBitmaps.call(this);
    this._lightBitmap = new Bitmap(20, 20);
    $gameTemp._FOWfillrequest = 1;
};

const _Weather_destroy = Weather.prototype.destroy;
Weather.prototype.destroy = function() {
    _Weather_destroy.call(this);
    this._lightBitmap.destroy();
};

const _Weather_addSprite = Weather.prototype._addSprite;
Weather.prototype._addSprite = function() {
    const type = this.type;
    if(param.scalerandom && 
      (type === "snow" || type === "blizzard" || type === "light")) {
        this._addSpriterandscale();
    }else{
        _Weather_addSprite.call(this);
    }
};

Weather.prototype._addSpriterandscale = function() {
    const sprite = new Sprite(this.viewport);
    const rate = 0.5;
    const scale = Math.random() * rate + rate;
    sprite.scale.x = scale;
    sprite.scale.y = scale;
    sprite.opacity = 0;
    this._sprites.push(sprite);
    this.addChild(sprite);
};

const _Weather_updateDimmer = Weather.prototype._updateDimmer;
Weather.prototype._updateDimmer = function() {
    _Weather_updateDimmer.call(this);
    const power = this.power;
    const id = param.dimrate;
    const id2 = param.dimcolors;
    if(id > 0){
        this._dimmerSprite.opacity = Math.floor(power * $gameVariables.value(id));
    }
    if(id2 > 0 && this.type !== "none" && power){
        const colors = this.FOWdimcolors($gameVariables.value(id2));
        this._dimmerSprite.setColor(colors[0], colors[1], colors[2]);
    }
};

const _Weather_updateSprite = Weather.prototype._updateSprite;
Weather.prototype._updateSprite = function(sprite) {
    switch (this.type) {

        case 'blizzard':
            this._updateBlizzardSprite(sprite);
        break;

        case 'light':
            this._updateLightSprite(sprite);
        break;

    }
    _Weather_updateSprite.call(this, sprite);
};


Weather.prototype._updateRainSprite = function(sprite) {
    sprite.bitmap = this._rainBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.opacity -= 6;
    if($gameTemp._FOWfillrequest === 1){
        this._rainBitmap.clear();
        this._rainBitmap.fillAll(this.FOWcolor());
        $gameTemp._FOWfillrequest = 0;
    }
    if(this.FOWisoppo()){
        sprite.ax += 6 * Math.sin(sprite.rotation);
        sprite.ay -= 6 * Math.cos(sprite.rotation);
    }else{
        sprite.ax -= 6 * Math.sin(sprite.rotation);
        sprite.ay += 6 * Math.cos(sprite.rotation);
    }
};

Weather.prototype._updateStormSprite = function(sprite) {
    sprite.bitmap = this._stormBitmap;
    sprite.rotation = Math.PI / 8;
    sprite.opacity -= 8;
    if($gameTemp._FOWfillrequest === 1){
        this._stormBitmap.clear();
        this._stormBitmap.fillAll(this.FOWcolor());
        $gameTemp._FOWfillrequest = 0;
    }
    if(this.FOWisoppo()){
        sprite.ax += 8 * Math.sin(sprite.rotation);
        sprite.ay -= 8 * Math.cos(sprite.rotation);
    }else{
        sprite.ax -= 8 * Math.sin(sprite.rotation);
        sprite.ay += 8 * Math.cos(sprite.rotation);
    }
};

Weather.prototype._updateSnowSprite = function(sprite) {
    sprite.bitmap = this._snowBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.opacity -= 3;
    if($gameTemp._FOWfillrequest === 1){
        const cir = sprite.scale.x * 4;
        this._snowBitmap.clear();
        this._snowBitmap.drawCircle(cir, cir, cir, this.FOWcolor());
        $gameTemp._FOWfillrequest = 0;
    }
    if(this.FOWisoppo()){
        sprite.ax += 3 * Math.sin(sprite.rotation);
        sprite.ay -= 3 * Math.cos(sprite.rotation);
    }else{
        sprite.ax -= 3 * Math.sin(sprite.rotation);
        sprite.ay += 3 * Math.cos(sprite.rotation);
    }  
};

Weather.prototype._updateBlizzardSprite = function(sprite) {
    sprite.bitmap = this._snowBitmap;
    sprite.rotation = Math.PI / 8;
    sprite.opacity -= 4;
    if($gameTemp._FOWfillrequest === 1){
        const cir = sprite.scale.x * 4;
        this._snowBitmap.clear();
        this._snowBitmap.drawCircle(cir, cir, cir, this.FOWcolor());
        $gameTemp._FOWfillrequest = 0;
    }
    if(this.FOWisoppo()){
        sprite.ax += 9 * Math.sin(sprite.rotation);
        sprite.ay -= 4 * Math.cos(sprite.rotation);
    }else{
        sprite.ax -= 9 * Math.sin(sprite.rotation);
        sprite.ay += 4 * Math.cos(sprite.rotation);
    }
};

Weather.prototype._updateLightSprite = function(sprite) {
    sprite.bitmap = this._lightBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.opacity -= 2;
    if($gameTemp._FOWfillrequest === 1){
        const cir = sprite.scale.x * 10;
        this._lightBitmap.clear();
        this._lightBitmap.drawCircle(cir, cir, cir, this.FOWcolor());
        $gameTemp._FOWfillrequest = 0;
    }
    if(this.FOWisoppo()){
        sprite.ay -= 2 * Math.cos(sprite.rotation);
    }else{
        sprite.ay += 2 * Math.cos(sprite.rotation);
    }
};

//下方向からなので下方向を若干厚くする。
const _Weather_rebornSprite = Weather.prototype._rebornSprite;
Weather.prototype._rebornSprite = function(sprite) {
    _Weather_rebornSprite.call(this, sprite);
    if(this.FOWisoppo()){
        sprite.ay = Math.randomInt(Graphics.height + 200) + this.origin.y;
    }
};


const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._FOWfillrequest = 0;
};

const _Game_Variables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
    _Game_Variables_onChange.call(this);
    $gameTemp._FOWfillrequest = 1;
};

const _Game_Screen_changeWeather = Game_Screen.prototype.changeWeather;
Game_Screen.prototype.changeWeather = function(type, power, duration) {
    $gameTemp._FOWfillrequest = 1;
    _Game_Screen_changeWeather.call(this, type, power, duration);
};

//基本的に異なるマップ間の場所移動ごとに行う。
const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.FOWnoteWeather();
};

//テストマップ等では処理しないように。
Game_Map.prototype.FOWnoteWeather = function() {
    if(!(param.validmaptag && this.mapId() > 0)) return;
    const note = $dataMap.note.split(/[\r\n]+/);
    const tag = /(?:FOWWeather:(\S+),(\d+))/i;
    for (let i = 0; i < note.length; i++) {
        if(note[i].match(tag)) {
            $gameScreen.changeWeather(RegExp.$1, Number(RegExp.$2 || 0), 0);
            break;
        }
    }
};

//実際に戦闘中に天候を表現したい場合は別途、WeatherOnBattle.js等が必要。
const _Game_Interpreter_command236 = Game_Interpreter.prototype.command236;
Game_Interpreter.prototype.command236 = function(params) {
    const def = _Game_Interpreter_command236.call(this, params);
    if($gameParty.inBattle()) {
        $gameScreen.changeWeather(params[0], params[1], params[2]);
        if (params[3]) {
            this.wait(params[2]);
        }
        return true;
    }
    return def;
};


})();
