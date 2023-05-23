const fs = require('node:fs')

const files = fs.readdirSync('.')

files
  .filter((name) => name.endsWith('.svg'))
  .map((name) => name.slice(0, -'.svg'.length))
  .map((file) => {
    const pascalCaseName = file
      .split('-')
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join('')

    const content = fs.readFileSync(file + '.svg', { encoding: 'utf8' })

    fs.writeFileSync(pascalCaseName + '.vue', `<template>${content}</template>`)
  })
