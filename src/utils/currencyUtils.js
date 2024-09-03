export function validateInput(value) {
    return /^\d*\.?\d*$/.test(value);
}
  
export function calculateAmount(amount, rate) {
    return (amount * rate).toFixed(2);
}
  
export function getRate(rates, from, to) {
    const rateKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
    return rates[rateKey] || 1;
}