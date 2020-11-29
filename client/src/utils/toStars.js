export default function toStars(value){
    if (value < 0) value = 0;
    if (value > 5) value = 5;
    value = Math.round(value);
    const stars = ["☆☆☆☆☆","★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★" ];
    return stars[value];
}
