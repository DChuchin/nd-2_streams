const fs = require('fs');
const crypto = require('crypto');
const input = fs.createReadStream("./data.txt");
const output = fs.createWriteStream("./copy.txt");
const stream = require('stream');
const hash = crypto.createHash('md5');

input.on('error', (err) => {
  if (err) {
    console.log(err);
  };
});

hash.on('readable', ()=>{
  let data = hash.read();
  if (data) {
    console.log(data);
  };
});

input
  .pipe(hash)
  .pipe(output);
input
  .pipe(hash)
  .pipe(process.stdout);


//***********************************
class toHex extends stream.Transform {
  constructor(options) {
    super(options);
  };
  _transform(chunk){
    chunk = chunk.toString('hex');
    this.push(chunk);
  };
};

const transform = new toHex;
transform.on('readable', ()=>{
  let data = transform.read();
  if (data) {
    console.log(data);
  };
});

input
  .pipe(hash)
  .pipe(transform)
  .pipe(output)
input
  .pipe(hash)
  .pipe(transform)
  .pipe(process.stdout)


//***************************************
class MyReadable extends stream.Readable {
  constructor(options) {
    super(options)
  };
  _read() {
    let n = Math.floor(Math.random()*10);
    this.push(n.toString());
  };
};

class MyWrite extends stream.Writable {
  constructor(options){
    super(options);
  };

  _write(chunk, encoding, cb){
    console.log(chunk.toString())

    cb();
  };
};

class MyTransform extends stream.Transform {
  constructor(options) {
    super(options);
  };

  _transform(chunk, encoding, cb) {
    this.push((chunk*2).toString());
    setTimeout(cb, 1000);
  };
};
const myRead = new MyReadable;
const myWrite = new MyWrite;
const myTransform = new MyTransform;
myRead.on('error', (err)=>{
  if (err) {
    console.log(err);
  };
});
myWrite.on('error', (err)=>{
  if (err) {
    console.log(err);
  };
});
myTransform.on('error', (err)=>{
  if (err) {
    console.log(err);
  };
});

myRead
  .pipe(myTransform)
  .pipe(myWrite)
