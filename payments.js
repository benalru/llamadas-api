(async () => {
    const fs = require('fs/promises')

    const response = await fetch('https://intranet.caib.es/opendatacataleg/datastore/dump/905586d3-42a7-43d6-8abe-33f24cbebda0?format=json')
    const data = await response.json()

    const fields = data.fields.map(field => field.id)

    const dataProcessed = data.records.map(record => {

        const dataElement = {}

        for(let i = 0; i < record.length; i++){
            dataElement[fields[i]] = record[i]
        }

        return dataElement
    })
    

    const json = JSON.stringify(dataProcessed, null, 2)
    await fs.writeFile('payments.json', json, 'utf8')
})();