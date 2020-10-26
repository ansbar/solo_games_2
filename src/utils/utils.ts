// Removes duplicates in array
function uniq(arr: number[]) {
    interface seen {
        [index: number]: any
    }

    let seen: seen = {};
    return arr.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

export default uniq