import { EnumAbilities, EnumItems, EnumAttackType, EnumOpponents, EnumBattleStates, EnumAttackResult } from './enums'

export interface IPages {
    [index: number]: IPage
}

export interface IPage {
    "battle"?: IBattle
    "image"?: boolean
    "modifiers"?: {
        "hp"?: number
        "gold"?: number
        "kick"?: number
        "punch"?: number
        "fate"?: number
        "attack"?: number
        "shuriken"?: number
        "innerStrength"?: number
    }
    "items"?: {
        "opalring"?: boolean,
        "healingPotion"?: boolean,
        "glove"?: boolean,
        "magicShuriken"?: boolean
    }
    "choices"?: Array<IChoice>
    "choiceSpec"?: {
        "type": string
        "modifier"?: string,
        "attack"?: string
        "defense"?: number
        "name"?: string
    }    
}

export interface IChoice {
    "goto": number
    "ability"?: EnumAbilities
    "item"?: EnumItems
    "attribute"?: string
    "abilityNegation"?: boolean
    "criteria"?: boolean
}

export interface IBattle {
    id: EnumOpponents,   
    blockable: boolean
    attackType: EnumAttackType 
    attacks : IAttacks[]
}

export interface IAttacks {
    opponent_defense?: number
    opponent_damage?: string
    player_damage?: string,
    player_defense?: number          
}


export interface IOpponents {
    [index: string]: IOpponent
}

export interface IOpponent {
    win: number
    loss: number   
    list: IOpponentList[]
}

export interface IOpponentList {
    name: string
    hp: number 
}

export interface IFopponentAttributes {
    name: Array<string>
    hp: Array<number>
    hp_max: Array<number>
    counter?: number
    counter_goto?: number
    missAbility?: EnumAbilities
}




export interface IFplayer {
    abilities: Array<EnumAbilities> | null
    items: Array<EnumItems> | null
    fate: number
    hp: number
    hp_max: number
    innerStrength: number
    kick: number
    shuriken: number
}

export interface ICurrentBattle {
    id: EnumOpponents
    state: EnumBattleStates
    attackType: EnumAttackType
    blockable: boolean
    battleModifiers: ICurrentBattleModifiers
    currentOpponent: number|null
    opponentlist: ICurrentBattleOpponents[]
}

export interface ICurrentBattleModifiers { 
    innerForce?: boolean
    block?: boolean
}

export interface ICurrentBattleOpponents { 
    name: string
    hpMax: number
    hp: number
    player_defense: number
    player_damage: string
    opponent_damage: string                
    opponent_defense: number
}

export interface IBattleHistoryRecord {
    timeStamp: number
    attacker: string
    defender: string
    attack: number
    defense: number
    result: EnumAttackResult
    damageRoll: string
    damage: number
    hp: string
}