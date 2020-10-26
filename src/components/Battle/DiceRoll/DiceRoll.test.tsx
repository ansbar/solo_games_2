import DiceRoll from './DiceRoll';
import uniques from '../../../utils/utils';

const testCases = [
    { diceRoll: "1T6", greaterThanOrEqual: 1, lessThanOrEqual: 6 },
    { diceRoll: "3T6", greaterThanOrEqual: 3, lessThanOrEqual: 18 },
    { diceRoll: "2T6+0", greaterThanOrEqual: 2, lessThanOrEqual: 12 },
    { diceRoll: "2T6+1", greaterThanOrEqual: 3, lessThanOrEqual: 13 },    
    { diceRoll: "2T6+10", greaterThanOrEqual: 12, lessThanOrEqual: 22 },
    { diceRoll: "1T4", greaterThanOrEqual: 1, lessThanOrEqual: 4 },
    { diceRoll: "2T4", greaterThanOrEqual: 2, lessThanOrEqual: 8 },
    { diceRoll: "2T4+1", greaterThanOrEqual: 3, lessThanOrEqual: 9 },
    { diceRoll: "2T4+10", greaterThanOrEqual: 12, lessThanOrEqual: 18 },
    { diceRoll: "1T10", greaterThanOrEqual: 1, lessThanOrEqual: 10 },
    { diceRoll: "2T10", greaterThanOrEqual: 2, lessThanOrEqual: 20 },
    { diceRoll: "2T10+1", greaterThanOrEqual: 3, lessThanOrEqual: 21 },
    { diceRoll: "2T10+10", greaterThanOrEqual: 12, lessThanOrEqual: 30 },
]

const iterations = 10 // Above 500 for full check

describe("DiceRoll", () => {    
    testCases.forEach(c => {  
        let diceRolls: number[] = []

        for(let i = 0; i < iterations; i++){
            const roll = DiceRoll(c.diceRoll)            

            it('should return a number betwween ' + c.greaterThanOrEqual + ' and ' + c.lessThanOrEqual, () => {            
                expect(roll).toBeGreaterThanOrEqual(c.greaterThanOrEqual)
                expect(roll).toBeLessThanOrEqual(c.lessThanOrEqual)            
            })

            diceRolls.push(roll)
        }   
        
        /* If enough iterations are done we can test if all values are present.         
         * We save all rolls for a test in an array, then we remove all duplicates. Statistically if enough iterations are done, all possible outcomes should appear in the list.
         * There is a small chance that a test could fail. That chance are higher the fewer iterations we do and the */
        if(iterations > 499){   
            const uniqueList = uniques(diceRolls) // 1T6+1 = [2,3,7,5,4,6] for example
            const totalNumbers = c.lessThanOrEqual - c.greaterThanOrEqual + 1 

            it('should be exactly ' + totalNumbers, () => {            
                expect(uniqueList.length).toBe(totalNumbers)        
            })
        }
    });    
});