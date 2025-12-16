export default class MatrixOps {
  static randomNormal(mean, std, rows, cols) {
    const m = [];
    for (let i = 0; i < rows; i++) {
      const r = [];
      for (let j = 0; j < cols; j++) {
        const u1 = Math.random(),
          u2 = Math.random();
        r.push(
          mean + std * Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
        );
      }
      m.push(r);
    }
    return m;
  }

  static dot(a, b) {
    return a.map((row) => row.reduce((s, v, i) => s + v * b[i], 0));
  }

  static transpose(m) {
    if (typeof m[0] === "number") return m.map((v) => [v]);
    const t = [];
    for (let j = 0; j < m[0].length; j++) {
      const r = [];
      for (let i = 0; i < m.length; i++) r.push(m[i][j]);
      t.push(r);
    }
    return t;
  }
}
