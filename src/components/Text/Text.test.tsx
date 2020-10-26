import React from 'react'
import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"

import Text from './Text'

let container: Element|null = null

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

it("renders with or without a name", () => {
    act(() => {
      render(<Text mainText="hello world"/>, container);
    })
    if(container)
        expect(container.textContent).toBe("hello world")
})

