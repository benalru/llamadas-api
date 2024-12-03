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
    
    const json = JSON.stringify(count, null, 2)
    await fs.writeFile('guias-turisticos-count-municipies.json', json, 'utf8')
    
})()