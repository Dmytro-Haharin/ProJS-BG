const exponentiation = (number , degree)=>{
    if( typeof(number) === "string"|| typeof(degree) === "string")
        return NaN

    if(number === null || degree === null)
        return null

    if(number === undefined || degree === undefined)
        return undefined 

    let result = 1;
    for(let i = 0;i < degree;i++){
        result *= number;
    }
    return result;
}
module.exports ={
    exponentiation:exponentiation,
}