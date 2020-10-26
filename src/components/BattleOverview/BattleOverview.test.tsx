import React from 'react'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { EnumOpponents, EnumAttackType } from "assets/enums"
import pages from 'assets/pages'
import BattleOverview from './BattleOverview'
import lang from "assets/languages/swedish.json";


describe('Testing the battle overview component', () => {
    const generalTexts = lang.general
    const opponentsTexts: any = lang.opponents
    const player = {
        hp_max: 20,
        hp: 20,
    }
    const currentBattle = {
        id: EnumOpponents.none,
        attackType: EnumAttackType.none,
        blockable: true,        
        opponentlist: [{ 
            name: "",
            hpMax: 0,
            hp: 0
        }]
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


    it("doesn't render at all", () => {
        const page = 1
        const battle = pages[page].battle        

        store = configureStore()({ 
            choice: { value: page },
            player,
            currentBattle
        })

        act(() => {
            render(<Provider store={store}><BattleOverview 
                battle={battle} 
                opponentsTexts={opponentsTexts}
                generalTexts={generalTexts}/>
            </Provider>, container)
        })        
        
        if(container){
            const h2 = container.querySelector('section > h2')
            expect(h2).toBe(null)
        }
    })
    

    it("renders with opponent heading", () => {
        const page = 17
        const opponent = pages[page].battle        

        store = configureStore()({ 
            choice: { value: page },
            player,
            currentBattle
        })

        act(() => {
            render(<Provider store={store}>
                <BattleOverview 
                    battle={opponent} 
                    opponentsTexts={opponentsTexts}
                    generalTexts={generalTexts} />
            </Provider>, container)
        })        
        
        if(container){
            const heading = container.querySelector('h2')
            if(heading) expect(heading.textContent).toBe("gorobei")
        }
    })
})