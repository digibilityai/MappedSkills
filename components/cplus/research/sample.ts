/* The sample drawn as squares: only when the statistic is a single percentage of a sample that splits into ten equal rows
   and gives a whole number of websites. Otherwise null, and the finding stands as text. */
export function sampleField(statistic: string | undefined, sampleSize: number | undefined) {
  const m = /^(\d+(?:\.\d+)?)%$/.exec(statistic?.trim() ?? '');
  if (!m || !sampleSize || !Number.isInteger(sampleSize) || sampleSize % 10 !== 0 || sampleSize > 200) return null;
  const exact = (Number(m[1]) / 100) * sampleSize;
  const marked = Math.round(exact);
  if (Math.abs(exact - marked) > 1e-9 || marked < 1 || marked >= sampleSize) return null;
  return { total: sampleSize, marked, rest: sampleSize - marked, cols: sampleSize / 10 };
}
