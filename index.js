import { Individual } from "./core/individual";
import { Population } from "./core/population";
import _ from "lodash";

const populationSize = 5000;
const numberOfGenesPerIndividual = 50;
const rateOfMutuation = [100, 10];

const population = new Population(
  populationSize,
  numberOfGenesPerIndividual,
  () => _.random(rateOfMutuation[0]) < rateOfMutuation[1]
);
population.logCurrentState(true);
let generation = 0;
console.log(population.individuals.map((i) => [i.genes, i.fitness]));
// while (generation <= 10) {
while (population.fittest.fitness < numberOfGenesPerIndividual) {
  generation++;
  population.setGeneration(generation);
  population.selection();
  population.crossOver();
  population.mutate();
  population.addOffSpringToPopulation();

  population.logCurrentState(true);
  if (population.avgFitness < 1) {
    console.log("Population Filed");
    break;
  }
}

console.log(`total generations : ${generation}`);
population.logCurrentState();
