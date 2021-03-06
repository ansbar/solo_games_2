/* DiceRoll
 * @roll: 2T6 1T4 1T10+10 3T6+4  
 */

function DiceRoll(r: string) {    
    const split_T = r.split('T') // [1, 4+10]
    const split_plus = split_T[1].split('+') // [4, 10]
    const dices = parseInt(split_T[0]) // 1
    const sides = parseInt(split_plus[0]) // 1
    let extra = 0
    let result = 0    
    let rolls = []

    // Iterate all dices and randomize roll
    for(let i = 0; i < dices; i++){
        const roll = Math.floor((Math.random() * sides) + 1);
        result += roll
        rolls.push(roll)
    }    

    // Add extra (+n) if applicable
    if (split_plus[1]) extra = parseInt(split_plus[1])
        result += extra

    console.log("DiceRoll:", r + "=" + result,"(" + rolls + ")")// (" + dices,sides,extra + ")")

    return result
}

export default DiceRoll;
