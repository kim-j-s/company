/**
 * 
 * @param {*} n count
 * @param {*} block 
 * @returns string html
 * {{#times n}}block{{/ times}}
 */
module.exports = function (n, block) {
    let accum = '';
    for (let i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
}