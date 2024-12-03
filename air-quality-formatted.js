 (async () => {
    const fs = require('fs/promises');
    
    const file = await fs.readFile('air-quality.json')
    const data = JSON.parse(file)

    const fields = data.fields.map(field =>  field.id)

    const newData = data.records.map(element => {

        const newElement = {}

        for (let i = 0; i < element.length; i++){
            newElement[fields[i]] = element[i]
        }

        return newElement
    });
    
    const json = JSON.stringify(newData, null, 2)
    await fs.writeFile('air-quality-formatted.json', json, 'utf8')
    
})();