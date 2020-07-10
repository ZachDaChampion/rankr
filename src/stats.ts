interface Rating {
  index: number;
  rating: number;
}

export function calculateRatings(comparisons: Array<Array<number>>) {
  if (!comparisons.length || comparisons.length != comparisons[0].length)
    return [];

  const ratings = [];

  for (let i = 0; i < comparisons.length; ++i)
    ratings.push({ index: i, rating: 0, rated: false });

  for (let i = 0; i < comparisons.length; ++i) {
    for (let j = 0; j < comparisons[i].length; ++j) {
      if (comparisons[i][j] != null) {
        ratings[i].rating += comparisons[i][j];
        ratings[j].rating -= comparisons[i][j];
        ratings[i].rated = true;
        ratings[j].rated = true;
      }
    }
  }

  return ratings;
}

export function rank(ratings: Array<Rating>, lookup: Array<any>) {
  const sorted = Array.prototype.slice
    .call(ratings)
    .filter(val => val.rated)
    .sort((a, b) => b.rating - a.rating);

  const result: Array<any> = [];
  for (let i = 0; i < sorted.length; ++i) {
    const val = sorted[i];
    result.push({
      season: lookup[val.index].season,
      number: lookup[val.index].number,
      rating: val.rating,
      rank:
        i > 0 && val.rating === sorted[i - 1].rating
          ? result[i - 1].rank
          : i + 1
    });
  }

  return result;
}
