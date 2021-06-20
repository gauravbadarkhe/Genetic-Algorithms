import _ from "lodash";
import { Individual } from "./individual";

export class Population {
  constructor(initialPopultaion, numberOfGenes,randomGenerator) {
    this.generation = 1;
    this.randomGenerator=randomGenerator;
    this.initialPopultaion = initialPopultaion;
    this.numberOfGenes = numberOfGenes;
    this.individuals = _.range(initialPopultaion).map(
      (i) => new Individual(i, numberOfGenes)
    );
    this.fittest;
    this.secondFittest;
    this.fittestOffSpring;
    this.selection();
  }

  setGeneration(generation) {
    this.generation = generation;
  }

  logCurrentState(basic) {
    console.log(
      `Generation : ${this.generation}, Avg Fitness : ${this.getAvgFitness()}`,
      !basic ? `FG : ${this.fittest.genes.join(", ")}` : "",
      `FF : ${this.fittest.fitness }`
    );
  }

  //   Select The Fittest Parrents
  selection() {
    let maxFitnessIndex = 0;
    let maxFitnessIndex2 = 0;

    this.individuals.forEach((individual, index) => {
      individual.calcFitness();

      if (individual.fitness > this.individuals[maxFitnessIndex].fitness) {
        maxFitnessIndex2 = maxFitnessIndex;
        maxFitnessIndex = index;
      } else if (
        individual.fitness > this.individuals[maxFitnessIndex2].fitness
      ) {
        maxFitnessIndex2 = index;
      }
    });

    this.fittest = this.individuals[maxFitnessIndex];
    this.secondFittest = this.individuals[maxFitnessIndex2];
  }

  //   Reproduc amongst fittest individuals and get the fittest offspring
  crossOver() {
    let crossOverPoint = _.random(this.numberOfGenes);
    // console.log(crossOverPoint);
    // console.log(this.fittest.genes);
    // console.log(this.secondFittest.genes);
    for (let i = 0; i < crossOverPoint; i++) {
      const tempGen = this.fittest.genes[i];
      this.fittest.genes[i] = this.secondFittest.genes[i];
      this.secondFittest.genes[i] = tempGen;
    }
    // console.log(this.fittest.genes);
    // console.log(this.secondFittest.genes);
  }

  mutate() {
    if (this.randomGenerator()) {
      
      let geneToMutate = _.random(this.fittest.genes.length);
      console.log("$1:MUTATED",geneToMutate);
      if ((this.fittest.genes[geneToMutate] == 0))
        this.fittest.genes[geneToMutate] = 1;
      else this.fittest.genes[geneToMutate] = 0;
    }

    if (this.randomGenerator()) {
      
      let geneToMutate = _.random(this.secondFittest.genes.length);
      console.log("$2:MUTATED",geneToMutate);
      if ((this.secondFittest.genes[geneToMutate] == 0))
        this.secondFittest.genes[geneToMutate] = 1;
      else this.secondFittest.genes[geneToMutate] = 0;
    }
  }

  addOffSpringToPopulation() {
    this.fittest.calcFitness();
    this.secondFittest.calcFitness();

    if (this.fittest.fitness > this.secondFittest.fitness)
      this.fittestOffSpring = this.fittest;
    else this.fittestOffSpring = this.secondFittest;

    let weakIndiviualIndex = 0;
    //Get Weakest Individual
    this.individuals.forEach((individual, index) => {
      if (individual.fitness < this.individuals[weakIndiviualIndex].fitness)
        weakIndiviualIndex = index;
    });

    // console.log(weakIndiviualIndex);
    this.individuals[weakIndiviualIndex] = this.fittestOffSpring;
  }

  getAvgFitness() {
    let totalFitness = 0;
    for (let i = 0; i < this.individuals.length; i++) {
      this.individuals[i].calcFitness();
      totalFitness += this.individuals[i].fitness;
    }

    this.avgFitness = parseFloat(
      totalFitness / this.individuals.length
    ).toFixed(2);
    return this.avgFitness;
  }
}
