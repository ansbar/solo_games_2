import React from 'react'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import pages from 'assets/pages'
import Matrix from './Matrix'
import lang from "assets/languages/swedish.json";
import { IBattle } from 'assets/interfaces'
import { EnumOpponents, EnumAttackType } from "assets/enums"

describe('Testing the battle overview component', () => {
    const generalTexts = lang.general
    const styles = {}
    const player = {
        hp_max: 20,
        hp: 20,
    }

    let container: Element|null = null
    let store: any

    beforeEach(() => {
        container = document.createElement("div")
        document.body.appendChild(container)        
    });
    
    afterEach(() => {
        if(container){
            unmountComponentAtNode(container)
            container.remove()
            container = null
        }
    });


    it("renders three opponents", () => {
        const page = 237
        const battle = pages[page].battle as IBattle

        store = configureStore()({ 
            choice: { value: page },
            player,
            currentBattle: {
                id: EnumOpponents.soldiers,
                attackType: EnumAttackType.throw,
                blockable: true,        
                opponentlist: [
                    { 
                        name: "Ung kapten",
                        hpMax: 12,
                        hp: 12,
                        player_defense: 8,
                        player_damage: "",
                        opponent_damage: "1T6+1",   
                        opponent_defense: 5           
                    },{ 
                        name: "1:a soldaten",
                        hpMax: 9,
                        hp: 9,
                        player_defense: 8,
                        player_damage: "",
                        opponent_damage: "1T6+1",   
                        opponent_defense: 5           
                    },{ 
                        name: "2:a soldaten",
                        hpMax: 10,
                        hp: 10,
                        player_defense: 8,
                        player_damage: "",
                        opponent_damage: "1T6+1",   
                        opponent_defense: 5           
                    }
                ]
            }
        })

        act(() => {
            render(<Provider store={store}><Matrix
                battle={battle} 
                generalTexts={generalTexts} 
                styles={styles}
            />
            </Provider>, container)
        })        
        
        if(container){
            const tbodys = container.querySelectorAll('tbody')
            expect(tbodys.length).toBe(3)
        }
    })
    

    it("renders with player info", () => {
        const page = 17
        const battle = pages[page].battle as IBattle  

        store = configureStore()({ 
            choice: { value: page },
            player,
            currentBattle: {
                id: EnumOpponents.soldiers,
                attackType: EnumAttackType.throw,
                blockable: true,        
                opponentlist: [
                    { 
                        name: "Ung kapten",
                        hpMax: 12,
                        hp: 12,
                        player_defense: 8,
                        player_damage: "",
                        opponent_damage: "1T6+1",   
                        opponent_defense: 5           
                    }                        
                ]
            }
        })

        act(() => {
            render(<Provider store={store}><Matrix
                battle={battle} 
                generalTexts={generalTexts} 
                styles={styles}
            />
            </Provider>, container)
        })        
        
        if(container){
            const tbodys = container.querySelectorAll('tbody')
            expect(tbodys.length).toBe(1)
        }
    })

})