(async () => {
    const fs = require('fs/promises')
    const json = await fs.readFile('payments.json', 'utf-8')
    const data = JSON.parse(json)
  
    const dataProcessed = data.reduce((acc, item) => {
      const year = new Date(item['Data']).getFullYear()
      const entity = item['Entitat']
      const pmp = parseInt(item['Periode Mitja de Pagament (PMP)'])
  
      acc[year] = acc[year] ?? {};
      acc[year][entity] = acc[year][entity] ?? [];
      acc[year][entity].push(pmp);
  
      return acc
    }, {})
  
    for (const year in dataProcessed) {
      for (const entity in dataProcessed[year]) {
        const pmps = dataProcessed[year][entity]
        const average = (pmps.reduce((acc, pmp) => acc + parseInt(pmp), 0) / pmps.length).toFixed(2)
        dataProcessed[year][entity] =  parseInt(average)
      }
    }
  
    const dataProcessedSorted = {}
  
    for (const year in dataProcessed) {
      const entities = dataProcessed[year]
      const entitiesSorted = Object.entries(entities).sort((a, b) => a[1] - b[1])
      dataProcessedSorted[year] = Object.fromEntries(entitiesSorted)
    }
  
    await fs.writeFile('payments-per-year.json', JSON.stringify(dataProcessedSorted, null, 2), 'utf-8')
  })()