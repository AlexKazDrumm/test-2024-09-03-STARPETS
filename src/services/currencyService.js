export async function fetchCurrencyRates() {
    const response = await fetch('https://status.neuralgeneration.com/api/currency');
    return await response.json();
}