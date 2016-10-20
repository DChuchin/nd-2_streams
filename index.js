const fs = require('fs');
const crypto = require('crypto');
const input = fs.createReadStream("data.txt");
const output = fs.createWriteStream("copy.txt");
const stream = require('stream');

const hash = crypto.createHash('md5');
input
  .pipe(hash)
  .pipe(output)
input
  .pipe(hash)
  .pipe(process.stdout)


class toHex extends stream.Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk){
    chunk = chunk.toString('hex');
    this.push(chunk);
  }
}

const transform = new toHex;

input
  .pipe(hash)
  .pipe(transform)
  .pipe(output)
input
  .pipe(hash)
  .pipe(transform)
  .pipe(process.stdout)
