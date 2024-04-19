<template>
  <div>a</div>
</template>

<script>
import Colors from '@/utils/colorTokens.js';
// Seu CSS

// Regex para encontrar as cores e os nomes das classes
// const pattern = /color:\s*(.*);/;

// Encontrar correspondências usando regex
// let matches;
// const result = [];

//   const match = pattern.exec(Colors);

//   export const DEFAULT_BACKGROUND = match ? match[1] : '#E8F4F4';

//     result.push({ ['background-' + matches[1]]: '#' + matches[3] });
// while ((matches = pattern.exec(Colors)) !== null) {
//   // Transformar correspondências em um objeto
// }

const colorObjects = [];

// const lines = Colors.split('.u.');

// const cssString = ".u.color-brand-sec-dark { color: #262626; }";

// Função para remover o '.u.'
function removeU(str) {
  return str.replace('.u.', '');
}

// Função para adicionar ':' antes de um '{'
// function addColon(str) {
//   return str.replace(' {', ': {');
// }

// Função para remover ';'
function removeSemicolon(str) {
  return str.replace(';', '');
}

function addQuotesToPropertiesAndValues(str) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/{\s(\D+?):/g, '{ "$1":');
}

// Função para adicionar aspas em valores decimais
function addQuotesToHexdecimal(str) {
  return str.replace(/(#\d+)/g, '"$1"');
}

function removeColorObject(str) {
  return str.replace(/ { color/g, '').replace(/"\s\}/g, '"');
}

function wrapInBraces(str) {
  return `{ ${str} }`;
}

// function cssToJson(str) {
//   const processedString = addQuotesToPropertiesAndValues(wrapInBraces(removeColorObject(addQuotesToHexdecimal(removeSemicolon(removeU(str))))))
//   console.log(processedString);
// // return JSON.parse(processedString);
// }
// Aplicando as funções à string CSS
// const processedString = addQuotesToPropertiesAndValues(wrapInBraces(removeColorObject(addQuotesToHexdecimal(removeSemicolon(removeU(cssString))))))
  // .concat(addColon(removeSemicolon(addQuotesToDecimal(cssString))));

// Convertendo a string processada em JSON

// console.log(json);

// for (const line of lines) {
//   console.log('a',line);
//   if (line.includes('color-')) {
//     const match = line.match(/color-\s*(.*) /);
//     if (match) {
//       const colorName = match[1];


//   // eslint-disable-next-line no-useless-escape
//       let regex = new RegExp('color-' + colorName + "\s*{\s*color:\s*\#([0-9a-fA-F]{6});\s*");
//       const match = line.match(regex);
//       console.log('match');
//       const hexValue = match[2];
//       colorObjects.push({ [`color-${colorName}`]: hexValue });
//     }
//   }
// }

const lines = Colors.split('.u')
lines.shift();

// function cssToJSON(cssString) {
//   const className = cssString.match(/^\.(\w+)/); // Extract class name
//   console.log(cssString);
//   console.log(className);
//   const propertyValue = cssString.match(/:(.+);$/); // Extract property value

//   const jsonObject = {};
//   jsonObject[className] = {};
//   jsonObject[className][propertyValue.split(':')[0].trim()] = propertyValue.split(':')[1].trim();

//   return jsonObject;
// }

function cssToJSON(str){
  return str
    .replace(/(\w*:)/g, '$1"')  //create json format
    .replace(/[;]/g, '";')
    .replace(/(\'{2,})/g, '"')
    .replace(/;/g, ',')
    .replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?:/g, '"$2": ')
    .replace(/,\s*\}/,'}')
    .trim();
}


for (const colorString of lines) {
  if (colorString.includes('bg-brand-weni')) {
    const a = colorString
    console.log(cssToJSON(a));
    
  }
  // cssToJson(JSON.stringify(colorString))
}

export default {
  name:'appA'

}
</script>

<style>

</style>