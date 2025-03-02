const csv = require('csv-parser');
const fs = require('fs');

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Validate required fields
        if (!data.product_name || !data.category || !data.price || !data.stock) {
          reject(new Error('Invalid CSV format: Missing required fields'));
        }
        results.push({
          product_name: data.product_name,
          category: data.category,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

module.exports = parseCSV;