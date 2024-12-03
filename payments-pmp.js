(async () => {
    const fs = require('fs/promises')
    const json = await fs.readFile('payments.json', 'utf-8')
    const data = JSON.parse(json)
  
    const dataProcessed = data.reduce((acc, item) => {
      const year = new Date(item['Data']).getFullYear()
      const pmp = parseInt(item['Periode Mitja de Pagament (PMP)'])
  
      if (!acc[year] || pmp > acc[year].pmp) {
        acc[year] = {
          entity: item['Entitat'],
          pmp
        }
      }
  
      return acc
  
    }, {})
  
    console.log(dataProcessed)
    // await fs.writeFile('payments-pmp.json', JSON.stringify(dataProcessed, null, 2), 'utf-8')
  })()