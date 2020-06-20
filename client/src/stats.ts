interface Rating {
  index: number;
  rating: number;
}

export function calculateRatings(comparisons: Array<Array<number>>) {
  if (!comparisons.length || comparisons.length != comparisons[0].length)
    return [];

  const ratings = [];

  for (let i = 0; i < comparisons.length; ++i)
    ratings.push({ index: i, rating: 0 });

  for (let i = 0; i < comparisons.length; ++i) {
    for (let j = 0; j < comparisons[i].length; ++j) {
      ratings[i].rating += comparisons[i][j];
      ratings[j].rating -= comparisons[i][j];
    }
  }

  return ratings;
}

export function rank(ratings: Array<Rating>, lookup: Array<any>) {
  const sorted = Array.prototype.slice
    .call(ratings)
    .sort((a, b) => b.rating - a.rating);

  const result = sorted.map((val) => lookup[val.index]);
  return result;
}
