import _ from "lodash";

export class Individual {
  constructor(spawnNumber, numberOfGenes, parentSpawnNumbers) {
    this.spawnNumber = spawnNumber;
    this.parentSpawnNumbers = parentSpawnNumbers;
    this.genes = _.range(numberOfGenes).map(() => _.random(0, 1));
    this.fitness = 0;
    this.calcFitness();
  }

  calcFitness() {
    this.fitness = 0;
    this.genes.forEach((gene) => (gene == 1 ? this.fitness++ : null));
  }



  printState() {}
}
