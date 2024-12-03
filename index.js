// (async () => {
//   const fs = require('fs/promises')
//   const json = await fs.readFile('payments.json', 'utf-8')
//   const data = JSON.parse(json)

//   const dataProcessed = data.reduce((acc, item) => {
//     const year = new Date(item['Data']).getFullYear()
//     const entity = item['Entitat']
//     const pmp = parseInt(item['Periode Mitja de Pagament (PMP)'])

//     acc[year] = acc[year] ?? {};
//     acc[year][entity] = acc[year][entity] ?? [];
//     acc[year][entity].push(pmp);

//     return acc
//   }, {})

//   for (const year in dataProcessed) {
//     for (const entity in dataProcessed[year]) {
//       const pmps = dataProcessed[year][entity]
//       const average = (pmps.reduce((acc, pmp) => acc + parseInt(pmp), 0) / pmps.length).toFixed(2)
//       dataProcessed[year][entity] =  parseInt(average)
//     }
//   }

//   const dataProcessedSorted = {}

//   for (const year in dataProcessed) {
//     const entities = dataProcessed[year]
//     const entitiesSorted = Object.entries(entities).sort((a, b) => a[1] - b[1])
//     dataProcessedSorted[year] = Object.fromEntries(entitiesSorted)

//   }
// })()
//   await fs.writeFile('payments-per-year.json', JSON.stringify(dataProcessedSorted, null, 2), 'utf-8')
// })()

(async () => {
  const fs = require('fs/promises');
  
  const response = await fetch('https://intranet.caib.es/opendatacataleg/api/3/action/datastore_search?resource_id=8f3a104a-5e4f-4437-916b-27260ad0dbc7');
  const data = await response.json();
  
  const guides = data.result.records;
  
  const count = guides.reduce((acc, guide) => {
      const municipio = guide.Municipi;
      acc[municipio] = (acc[municipio] || 0) + 1;
      return acc;
  }, {});

    console.log(guides)
  
  // const json = JSON.stringify(count, null, 2)
  // await fs.writeFile('guias-turisticos-count-municipies.json', json, 'utf8')
  
})()