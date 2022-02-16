import * as fs from 'fs';
import SolarIndex from './SolarIndex.js';

fs.statSync('solarIndexFile.json', (err, stats) => {
  if (err) {
    return console.error(err);
  }
  fs.unlink('solarIndexFile.json', (err) => {
    if (err) return console.log(err);
  });
});
//here you can add catalogid that you want
const catalogInput = [];

//here you can add productId that you want
const productInput = [];

const SolarIndexArray = await SolarIndex(catalogInput, productInput);

fs.writeFile('solarIndexFile.json', JSON.stringify(SolarIndexArray), 'utf8', (error) => {
  if (error) throw error;
});
