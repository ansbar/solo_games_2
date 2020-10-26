import React from 'react'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import pages from 'assets/pages'
import Choices from './Choices'
import lang from "assets/languages/swedish.json";


describe('Testing the Choice component', () => {
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
    

    it("renders with a choice list", () => {
        const page = 6
        const abilitiesTexts = lang.abilities
        const choicesTexts = lang[page].choices
        const choices = pages[page].choices

        store = configureStore()({ 
            choice: { value: page },
            player: {}
        })

        act(() => {
            render(<Provider store={store}><Choices abilitiesTexts={abilitiesTexts} choicesTexts={choicesTexts} choices={choices}/></Provider>, container)
        })        
        
        if(container){
            const links = container.querySelectorAll('li > a')
            expect(links.length).toBe(2)
        }
    })


    it("renders with a single choice (dead)", () => {
        const page = 64
        const abilitiesTexts = lang.abilities
        const choicesTexts = undefined
        const choices = pages[page].choices

        store = configureStore()({ 
            choice: { value: page },
            player: {}
        })

        act(() => {
            render(<Provider store={store}><Choices abilitiesTexts={abilitiesTexts} choicesTexts={choicesTexts} choices={choices}/></Provider>, container)
        })        
        
        if(container){
            const lis = container.querySelectorAll('li')
            expect(lis.length).toBe(1)
            expect(container.textContent).toBe("Du är död, börja om?")
        }
    })


    it("renders with an ability locked list", () => {
        const page = 1
        const abilitiesTexts = lang.abilities
        const choicesTexts = lang[page].choices
        const choices = pages[page].choices

        store = configureStore()({ 
            choice: { value: page },
            player: { abilities: {} }
        })

        act(() => {
            render(<Provider store={store}><Choices abilitiesTexts={abilitiesTexts} choicesTexts={choicesTexts} choices={choices}/></Provider>, container)
        })        
        
        if(container){
            const lis = container.querySelectorAll('li')
            const links = container.querySelectorAll('li > a')

            expect(lis.length).toBe(4)
            expect(links.length).toBe(3)
            expect(lis[3].textContent).toBe("Gör en saltomortal till Gorobeis sida innan du anfaller (Akrobatik)")
        }
    })
})