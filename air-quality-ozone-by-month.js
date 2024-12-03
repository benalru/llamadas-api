(async () => {
    const fs = require('fs/promises');
    
    const file = await fs.readFile('air-quality.json');
    const data = JSON.parse(file);

    const fields = data.fields.map(field => field.id);

    const newData = data.records.map(element => {
        const newElement = {};

        for (let i = 0; i < element.length; i++) {
            newElement[fields[i]] = element[i];
        }

        if (newElement.DATA_HI && newElement.O3_HI !== null) {
            return {
                _id: newElement._id,
                DATA_HI: newElement.DATA_HI,
                O3_HI: parseFloat(newElement.O3_HI)
            };
        }
        return null;
    }).filter(item => item !== null);

    const monthlySums = {};

    newData.forEach(record => {
        const date = new Date(record.DATA_HI);
        const year = date.getFullYear();

        if (year === 2018) {
            const yearMonth = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlySums[yearMonth]) {
            monthlySums[yearMonth] = 0;
            }

            monthlySums[yearMonth] += record.O3_HI;
        }
    });

    console.log(monthlySums);

    const json = JSON.stringify(monthlySums, null, 2);
    await fs.writeFile('air-quality-ozone-by-month.json', json, 'utf8');
})();