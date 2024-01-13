export function getPromotion(price, price_promotion) {
    return 100 - Math.floor(price_promotion / price * 100);
}