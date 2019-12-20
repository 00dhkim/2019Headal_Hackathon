var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var PythonShell = require('python-shell');

var _storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, 'uploaded_file.txt')
  }
})
var upload = multer({ storage: _storage })
var fs = require('fs');
var app = express();
var PyOptions = {
  mode: 'text',
  PythonPath: '',
  PythonOptions: ['-u'],
  scriptPath: ''
  //  args: ['value1', 'value2', 'value3']
};

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    var template = `
    <!DOCTYPE html>
    <html lang="ko" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>HAEDAL hackathon</title>
      </head>
      <body>
        <h1>Team. 카톡모아똑</h1>
        <h2>팀원 소개</h2>
        <ul>
          <li>김도현</li>
          <li>박상현</li>
          <li>민윤홍</li>
        </ul>
        <h2>설명</h2>
          <ol>
            <li>카카오톡 대화 내용을 추출하여 txt 파일로 나타낸다.</li>
            <li>서버에 추출한 파일을 업로드 한다.</li>
            <li>파이썬을 이용하여 대화 내용을 분석한다.</li>
            <li>분석한 내용을 웹을 통해 보여준다.</li>
          </ol>
          <h2>기술적 배경</h2>
          <p>텍스트 추출은 카카오톡 PC버전의 내화내용 내보내기 기능을 이용하였다.</p>
          <p>파일 업로드 및 분석내용을 보여주는 서버 백엔드는 <a href="https://nodejs.org/">node.js</a>를 이용하였다.</p>
          <p>대화 내용 분석은 <a href="https://python.org/">파이썬</a>을 이용하였다.</p>
        <a href=/upload>업로드하기</a>
      </body>
    </html>
    `;
    res.send(template);
});
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  PythonShell.PythonShell.run('py.py', PyOptions, function(err, results) {
    if(err) throw err;
    res.send(`
      <!DOCTYPE html>
      <html lang="ko" dir="ltr">
        <head>
          <meta charset="utf-8">
          <title>HAEDAL hackathon</title>
        </head>
        <body>
        <h1>
         분석 결과
        </h1>
          ${results}
          <a href=/>메인으로</a>
        </body>
      </html>

      `);
  });
});
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});


/*
app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      // id값이 있을 때
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    } else {
      // id 값이 없을 때
      res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for server.'});
    }
  })
});
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
})
*/
