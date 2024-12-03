(async () => {
    const fs = require('fs/promises')

    const response = await fetch('https://intranet.caib.es/opendatacataleg/api/3/action/datastore_search?resource_id=8f3a104a-5e4f-4437-916b-27260ad0dbc7')
    const data = await response.json()

    const guides = data.result.records

    const newArray = guides.map(element => {
        return {
            iniciDActivitat: element["Inici d'activitat"],
            estat: element.Estat,
            municipi: element.Municipi
        }
    })

    console.log(newArray)
    const json = JSON.stringify(newArray, null, 2)


    await fs.writeFile('guias-turisticos-simplification.json', json, 'utf8')
})();