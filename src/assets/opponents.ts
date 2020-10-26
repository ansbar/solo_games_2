import { IOpponents } from './interfaces'

const opponents: IOpponents = {
    gorobei: {
        win: 110,
        loss: 95,
        list: [
            {
                name: "Gorobei",
                hp: 14
            }
        ]
    },
    soldiers: {
        win: 110,
        loss: 95,
        list: [
            {
                name: "Ung kapten",
                hp: 12
            },{
                name: "1:a soldaten",
                hp: 9
            },{
                name: "2:a soldaten",
                hp: 10
            }
        ]   
    },
}

export default opponents