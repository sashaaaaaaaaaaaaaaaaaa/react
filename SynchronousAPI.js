const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
rl.on('close', () => process.exit(0));

async function execute() {
    let products = [];

    try {
        const data = fs.readFileSync('./products.json', 'utf8');
        products = JSON.parse(data);
    } catch (err) {
        console.error("Error reading file");
    }


    do {
        const ans = await prompt("(add data (by typing a), find data (by typing f ), or save and exit (by typing x ) : ");

        switch (ans) {
            case 'a':
                const proNum = await prompt("Product number: ");
                const proName = await prompt("product name: ");
                const proPrice = await prompt("Product price: ");
                products.push({ number: proNum, name: proName, price: proPrice });
                console.log('you saved a product');
                break;

            case 'f':
                const findPro = await prompt("Enter a product number to find: ");
                const product = products.find(product => product.number === findPro);
                if (product) {
                    console.log("Product was found:", product);
                } else {
                    console.log("Product was not found!");
                }
                break;

            case 'x':
                try {
                    const dataToWrite = JSON.stringify(products, null, 2);
                    fs.writeFileSync('./products.json', dataToWrite, 'utf8');
                    console.log('File saved successfully!');
                } catch (err) {
                    console.error('Error writing file');
                } finally {
                    rl.close();
                }
                break;

            default:
                console.log("INVALID INPUT");
                break;
        }

    } while (true);
}

execute().catch((err) => { console.error(err); });
