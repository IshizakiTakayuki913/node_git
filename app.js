//モジュールのインポート
const http = require('http');
const express = require('express');
let fs = new require('fs');

//expressオブジェクトの生成
const app = express();

//サーバの設定
const server = http.createServer(app);
//getでリクエスト時に処理するコールバック関数指定
// app.get("/", function(req, res){
//   console.log(`get req [${req.method}]`)
//   return res.send("Hello World");
// });

// POSTリクエスト
app.post('/rotes/', (req, res) => {
  console.log(`POST get req [${req.method}]`)
  let data = ""

  req.on('data', function(chunk) {
    data += chunk
  })
  req.on('end', function() {
    const jsonData = JSON.parse(data)
    console.log(jsonData)
    const retData = {number: jsonData.a, name: jsonData.b,
                    n1: jsonData.b.slice(0,2), n2: jsonData.b.slice(-2)}

    console.log(retData);
    res.json(retData);
    // res.send({
    //   hei: `Hello World`,
    //   msg:'POST request'
    // });
    // console.log(res.writableEnded);
  });
  
});

app.use((req, res, next) => {  // すべてのアクセスに対応するミドルウェア
  console.log('Time: ', Date.now(), 'Host: ', req.hostname,'method: ', req.method, 'url: ', req.url);
  
  let pathname = req.url;

  if (pathname == '/') {
    pathname = '/index.html';
  }

  console.log(`req [${pathname}] file [${__dirname + pathname}]`)

  fs.readFile(__dirname + pathname,
    // 読み込みのためのコールバック関数の指定
    function (err, data) {
      // エラーが発生した場合に対応
      if (err) {
        console.log(`無し`)
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // エラーでなければ、200番を設定して、ファイル転送を指定する
      else{
        console.log(`有り`)
        res.writeHead(200);
        res.end(data);
      }
    }
  );
});

// app.get('/', (req, res) => {
//   console.log(`GET get req [${req.method}]`)
//   if(req.method === 'GET') {

//   }
//   res.send({
//     msg:'GET request'
//   });
// });


const port = process.env.PORT || 8080;
server.listen(port);
console.log(`__dirname [${__dirname}]`)