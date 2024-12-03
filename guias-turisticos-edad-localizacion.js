(async () => {
    const fs = require('fs/promises')

    const response = await fetch('https://intranet.caib.es/opendatacataleg/api/3/action/datastore_search?resource_id=8f3a104a-5e4f-4437-916b-27260ad0dbc7')
    const data = await response.json()

    const guides = data.result.records

    const guidesFromPalma = guides.filter(guide => 
        guide.Municipi === "PALMA" || 
        new Date(guide["Inici d'activitat"]).getFullYear() < 1980
    )

    const json = JSON.stringify(guidesFromPalma, null, 2)

    await fs.writeFile('guias-turisticos-edad-localizacion.json', json, 'utf8')
})();