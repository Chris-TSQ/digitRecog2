import M from "./matrixOps";

export default class NeuralNetwork {
  constructor(i, h, o, lr) {
    this.wih = M.randomNormal(0, Math.pow(i, -0.5), h, i);
    this.who = M.randomNormal(0, Math.pow(h, -0.5), o, h);
    this.lr = lr;
    this.sig = (x) => 1 / (1 + Math.exp(-x));
  }

  train(inp, tgt) {
    const hi = M.dot(this.wih, inp);
    const ho = hi.map(this.sig);
    const fi = M.dot(this.who, ho);
    const fo = fi.map(this.sig);
    const oe = tgt.map((t, i) => t - fo[i]);
    const he = M.dot(M.transpose(this.who), oe);

    for (let i = 0; i < this.who.length; i++)
      for (let j = 0; j < this.who[0].length; j++)
        this.who[i][j] += this.lr * oe[i] * fo[i] * (1 - fo[i]) * ho[j];

    for (let i = 0; i < this.wih.length; i++)
      for (let j = 0; j < this.wih[0].length; j++)
        this.wih[i][j] += this.lr * he[i] * ho[i] * (1 - ho[i]) * inp[j];
  }

  query(inp) {
    const hi = M.dot(this.wih, inp);
    const ho = hi.map(this.sig);
    const fi = M.dot(this.who, ho);
    return fi.map(this.sig);
  }
}
