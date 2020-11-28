exports.randomTransform = (min, max) => {
  if (min && max) {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber);
  } else {
    return 0;
  }  
}