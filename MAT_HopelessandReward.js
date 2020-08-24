//=============================================================================
// MAT_HopelessandReward.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 mattuup
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc ver1.00 Hopelessと戦闘経験値拡張の詰め合わせ
 * @author mattuup
 * @target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/mattuup/RPGMakerMZ
 * 
 * @param dieTploss
 * @desc そのバトラーの戦闘不能時にTPを全て失います。
 * @default true
 * @type boolean
 * 
 * @param showexp
 * @desc OFFであればバトル終了時の取得経験値を表示しません。
 * このパラメータによって取得経験値が変わることはありません。
 * @default true
 * @type boolean
 * 
 * @param gainraterule
 * @desc gainvalの補助パラメータ
 * @type select
 * @option default
 * @value 0
 * @option gainval+=exp
 * @value 1
 * @option exp50%→gainval(+)
 * @value 2
 * @option exp→gainval(+)
 * @value 3
 * @default 0
 * 
 * @param Benchexprate
 * @desc 控えメンバーの経験値の所得率（百分率）
 * デフォルトのオプションもご確認ください。
 * @type number
 * @min 0
 * @max 100000
 * @default 50
 * 
 * @param gainval
 * @desc この値のIDの変数にバトル終了時に取得経験値を加算します。
 * 他の、パラメータによってもその値は増減します。
 * @default 14
 * @type variable
 * 
 * @param expvar
 * @desc 取得経験値増減率(変数の値は百分率)
 * @type variable
 * @default 15
 * 
 * @param goldvar
 * @desc 取得金増減率(変数の値は百分率)
 * @type variable
 * @default 15
 * 
 * @param dropvar
 * @desc 拾得物入手率(変数の値は百分率)
 * @type variable
 * @default 15
 * 
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * 利用規約はMITライセンスの通り。
 * （HopelessActor.js
 *   HopelessBench.js
 *   RewardRateChange.js
 *   SGExpanB.js
 *   再録）
 * 
 * プラグインパラメータ expvar goldvar dropvar は
 * 戦闘終了時の取得経験値等の取得比率を
 * その設定の変数で増減することができます。
 * ただし、変数の値が0の時は比率を100%として扱います。
 * 実際に比率を0として扱いたいときは変数の値を0未満にしてください。
 * 
 * プラグインパラメータgainrateruleは
 * 取得経験値に大して操作を行います。
 * 0:従来通り、操作しません。
 * 1:取得経験値をそのままにgainval設定の変数へ加算します。
 * 2:取得経験値を半分にしてから1と同じ処理。
 * 3:1の処理をした後取得経験値は0になります。
 * 
 */

var Imported = Imported || {};
Imported[PluginManagerEx.findPluginName(document.currentScript)] = true;

(() => {

'use strict';

const script = document.currentScript;
const param  = PluginManagerEx.createParameter(script);


DataManager.HRrewardvarrate = function(id) {
    if(!id) return 1;
    const rate = $gameVariables.value(id);
    if(rate > 0){
        return rate / 100;
    }else if(rate === 0){
        return 1;
    }else{
        return 0;
    }
};

const _BattleManager_displayExp = BattleManager.displayExp;
BattleManager.displayExp = function() {
    this.HRanothergainExp();
    if(!param.showexp) return;
    _BattleManager_displayExp.call(this);
};

BattleManager.HRanothergainExp = function() {
    const setid = param.gainval;
    const rule = param.gainraterule;
    if(rule === 0 || !setid) return;
    let plus = this._rewards.exp;
    if(rule === 2){
        this._rewards.exp = Math.round(this._rewards.exp / 2);
        plus = Math.round(plus / 2);
    }else if(rule === 3){
        this._rewards.exp = 0;
    }
    const total = $gameVariables.value(setid) + plus;
    $gameVariables.setValue(setid, total);
};

if(param.dieTploss){

    //settpはrefreshを再帰させるため使ってはならない。
    Game_BattlerBase.prototype.HRlosstp = function() {
        if(this.isDead()) this._tp = 0;
    };   

    const _Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function() {
        _Game_Battler_refresh.call(this);
        this.HRlosstp();
    };
    
}

const _Game_Actor_benchMembersExpRate = Game_Actor.prototype.benchMembersExpRate
Game_Actor.prototype.benchMembersExpRate = function() {
    const def = _Game_Actor_benchMembersExpRate.call(this);
    const newrate = param.Benchexprate / 100;
    return def * newrate;
};

const _Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
Game_Enemy.prototype.dropItemRate = function() {
    return _Game_Enemy_dropItemRate.call(this) * DataManager.HRrewardvarrate(param.dropvar);
};

const _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
Game_Troop.prototype.expTotal = function() {
    return Math.round(_Game_Troop_expTotal.call(this) * DataManager.HRrewardvarrate(param.expvar));
};

const _Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
    return Math.round(_Game_Troop_goldTotal.call(this) * DataManager.HRrewardvarrate(param.goldvar));
};

})();
