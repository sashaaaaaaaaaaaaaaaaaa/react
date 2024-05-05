const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
rl.on('close', () => process.exit(0));

async function execute() {

    let products = [];

    fs.readFile ('./products.json', 'utf8', async (err, data) => {
        if (err) {
            console.error("error reading file");
        } else {
            products = JSON.parse(data);
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
                // case 'f':
                //     const findPro = await prompt("Enter a product number to find: ");
                //     let found = false;
                //     for (let i = 0; i < products.length; i++) {
                //         if (products[i].number === findPro) {
                //             console.log("Product was found:", products[i]);
                //             found = true;
                //             break;
                //         }
                //     }
                //     if (!found) {
                //         console.log("Product was not found!");
                //     }
                //     break;

                case 'x':
                    const dataToWrite = JSON.stringify(products, null, 2);
                    fs.writeFile('./products.json', dataToWrite, 'utf8', (err) => {
                        if (err) {
                            console.error('error writing file');
                        } else {
                            console.log('file saved successfully!');
                            rl.close();
                        }
                    });
                    break;
                default:
                    console.log("INVALID INPUT");
                    break;
            }

        } while  (true);
    });
}

execute().catch((err) => { console.error(err); });