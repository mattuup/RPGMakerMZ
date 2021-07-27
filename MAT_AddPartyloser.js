//=============================================================================
// MAT_AddPartyloser.js
// ----------------------------------------------------------------------------
// Copyright (c) 2021 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.03 戦闘終了時に敵キャラのノートタグ記載のアクターを仲間にします。
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param animation
 * @desc 起き上がった時に
 * その敵の表示と共に表示するアニメーションです。
 * @type animation
 * @default 0
 * 
 * @param text1
 * @desc 起き上がった時のメッセージ１
 * @default が起き上がった。
 * 
 * @param text2
 * @desc 加入が決定した時のメッセージ２
 * @default は仲間になった。
 * 
 * @param textallow
 * @desc 加入を許可する選択
 * @default 仲間にする
 * 
 * @param textforbid
 * @desc 加入を許可しない選択
 * @default 拒否する
 *
 * @param enableonce
 * @desc 1回仲間にしたことがあるアクターは
 * パーティにいなくても起き上がらないようにするか
 * @type boolean
 * @default true
 * 
 * @param iscenterdisplay
 * @desc 起き上がったとき画面中央に表示。
 * @type boolean
 * @default true
 * 
 * @param validBattletest
 * @desc データベースの戦闘テストでも起き上がり有効か。
 * @type boolean
 * @default true
 * 
 * @param defaultallrate
 * @desc ニューゲーム後自動で代入される確率倍率（百分率）。
 * プラグインコマンドで変更できる値と同様。
 * @type number
 * @min 0
 * @max 100000
 * @default 100
 * 
 * @command APsetallrate
 * @text 確率倍率変更
 * @desc ノートタグで設定した確率にかける値を変更します。
 * (その敵キャラのノートタグ設定*この値が最終的な確率。)
 *
 * @arg allrate
 * @text 確率倍率（百分率）
 * @desc 確率倍率（百分率）
 * @type number
 * @min 0
 * @max 100000
 * @default 0
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （AddPartyloser.js再録）
 * 
 * ※このプラグインやプラグインコマンドの一部機能は
 * 既存（導入前）のセーブデータを再開した時に期待する処理がされない場合があります。
 * その場合はニューゲームまたはイベントテスト等から動作を確認してください。
 * なお、プラグインパラメータ「enableonce」がＯＦＦの場合でも
 * 一回仲間にしたアクターの記録自体はします。影響は判定のみです。
 * (Game_Party.prototype.addActor内で処理)
 * 
 * ---敵キャラのノートタグ---
 * 
 * <APaddrand:x>
 * xには確率を百分率で入れてください。
 * <APaddactorId:x>
 * xは判定に成功した場合に仲間にしたいアクターのIDを入れてください。
 * 
 * 例：<APaddrand:50>
 * 戦闘勝利時に50%の確率で仲間になります。
 * 
 * ※仲間になるのは最初に判定に成功した一体のみとなります。
 * (index順に判定。戦闘不能になった順番は関係しません。)
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


PluginManagerEx.registerCommand(script, "APsetallrate", function(args) {
    $gameSystem.APsetallrate(args.allrate);
});


BattleManager.isphaseloser = function() {
    return this._phase === "loser";
};

const _BattleManager_isBattleEnd = BattleManager.isBattleEnd;
BattleManager.isBattleEnd = function() {
    const def = _BattleManager_isBattleEnd.call(this);
    return def || this.isphaseloser();
};

BattleManager.toggleloserphase = function() {
    if(!this.isphaseloser()){
        this._phase = "loser";
    }else{
        this._phase = "battleEnd";
    }
};

const _BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    _BattleManager_endBattle.call(this, result);
    this.APendBattleset(result);
};

BattleManager.APendBattleset = function(result) {
    if(result === 0 && (param.validBattletest || !this.isBattleTest())){
        this.toggleloserphase();
    }
};

const _BattleManager_updatePhase = BattleManager.updatePhase;
BattleManager.updatePhase = function(timeActive) {
    _BattleManager_updatePhase.call(this, timeActive);
    if(this.isphaseloser()) {
        this.APgainloser();
    }
};

BattleManager.APgainloser = function() {
    $gameTroop.APAddnoteActor();
};


const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.APsetallrate(param.defaultallrate);
    this.APclearexcludeloser();
};

Game_System.prototype.APallrate = function() {
    return Number(this._APallrate || 0);
};

Game_System.prototype.APsetallrate = function(value) {
    this._APallrate = Number(value || 0) / 100;
};

Game_System.prototype.APexcludeloser = function() {
    if(!this._APexcludeloser) this.APclearexcludeloser();
    return this._APexcludeloser;
};

Game_System.prototype.APclearexcludeloser = function() {
    this._APexcludeloser = [];
};

//重複しないように。
Game_System.prototype.APpushloser = function(id) {
    const array = this.APexcludeloser();
    if(array.includes(id)) return;
    array.push(id);
};


Game_Enemy.prototype.APnoteloser = function(text) {
    return Number(this.enemy().meta[text] || 0);
};

//加入する可能性があるか
Game_Enemy.prototype.isenableAddloser = function() {
    return this.APnoteloser("APaddrand") > 0 && this.APnoteloser("APaddactorId") > 0;
};

//これの加入確率、APallrateは設定時に割っている。
Game_Enemy.prototype.APallowrate = function() {
    return this.APnoteloser("APaddrand") * $gameSystem.APallrate() / 100;
};

Game_Enemy.prototype.isallowrandloser = function() {
    return Math.random() < this.APallowrate();
};

Game_Enemy.prototype.APisgainparty = function() {
    const id = this.APnoteloser("APaddactorId");
    return $gameParty.isNotyetaddloser(id) && this.isallowrandloser();
};

Game_Enemy.prototype.displayanime = function(animeId) {
    const spriteset = BattleManager._spriteset._battleField;
    spriteset._APsprite = new Sprite_Enemy(this);
    spriteset._APsprite.APdisplayposianime(animeId);
    spriteset.addChild(spriteset._APsprite);
};

//選択肢表示と制御の切り替えを行っている。
Game_Enemy.prototype.displaylosermes = function(actor) {
    const actorId = actor.actorId();
    const name = this.originalName();
    const scene = SceneManager._scene;
    const charr = [param.textallow, param.textforbid];

    $gameMessage.newPage();
    $gameMessage.add('\\.' + name + param.text1);

    $gameMessage.setChoices(charr, 0, -1);
    $gameMessage.setChoiceBackground(0);
    $gameMessage.setChoicePositionType(2);
    $gameMessage.setChoiceCallback(function(n) {
        //メッセージ初期化タイミングに注意
        if(n === 0){
            $gameParty.addActor(actorId);
            $gameTroop._APislastmes = name + param.text2;
        }
        BattleManager.toggleloserphase();

    }.bind(scene));
};


//同IDのアクターがパーティに加入しないように。
Game_Party.prototype.isNotyetaddloser = function(id) {
    const actor = $gameActors.actor(id);
    return actor && !this.allMembers().includes(actor) && !(param.enableonce && $gameSystem.APexcludeloser().includes(id));
};

const _Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function() {
    _Game_Party_setupStartingMembers.call(this);
    for (const actorId of $dataSystem.partyMembers) {
        if($gameActors.actor(actorId)) {
            $gameSystem.APpushloser(actorId);
        }
    }
};

const _Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    actorId = Number(actorId || 0);
    $gameSystem.APpushloser(actorId);
    _Game_Party_addActor.call(this, actorId);
};

const _Game_Party_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    actorId = Number(actorId || 0);
    _Game_Party_removeActor.call(this, actorId);
};


const _Game_Troop_clear = Game_Troop.prototype.clear;
Game_Troop.prototype.clear = function() {
    _Game_Troop_clear.call(this);
    this._APisaddany = false;
    this._APislastmes = "";
};

Game_Troop.prototype.APAddnoteActor = function() {
    if(this._APisaddany) return;
    this._APisaddany = true;
    const enemy = this.APfindAddnoteloser();
    const actor = enemy ? $gameActors.actor(enemy.APnoteloser("APaddactorId")) : null;
    if(!actor){
        BattleManager.toggleloserphase();
        return;
    }
    enemy.displayanime();
    enemy.displaylosermes(actor);
};

Game_Troop.prototype.APfindAddnoteloser = function() {
    return this.CanAddloser().find(member => member.APisgainparty());
};

Game_Troop.prototype.CanAddloser = function() {
    return this.deadMembers().filter(member => member.isenableAddloser());
};


//中央に表示するときのアンカーに注意
Sprite_Enemy.prototype.APdisplayposianime = function(animeId) {
    animeId = Number(animeId || param.animation || 0);
    if(param.iscenterdisplay){
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.setHome(Graphics.width / 2, Graphics.height / 2);
    }
    this.startEffect("appear");
    $gameTemp.requestAnimation([this], animeId, false);
};


//アニメーション再生により
const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
    const def = _Spriteset_Battle_makeTargetSprites.call(this, targets);
    if(BattleManager.isphaseloser() && this._battleField._APsprite){
        def.push(this._battleField._APsprite);
    }
    return def;
};


//メッセージ初期化タイミングにより
const _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
    _Window_ChoiceList_callOkHandler.call(this);
    if($gameTroop && $gameTroop._APislastmes){
        $gameMessage.newPage();
        $gameMessage.add($gameTroop._APislastmes);
        $gameTroop._APislastmes = "";
    }
};


})();
