const express = require('express');
const app = express();

const bodyParser = require('body-parser'); // парсит (извлекает) тело запроса уточняющая информация типа ?name = name

const fs = require('fs'); // библиотека fileSystem позволяет работать с файловой системой 

app.use(express.static('.')); // команда указівает на файл загрузки сервера , в данном случае поумолчанию берется index.html
app.use(bodyParser.json()); // указываем что работаем с json

app.get('/catalog', (req, res) => { // '/catalog' имя запроса
  fs.readFile('./catalog.json', 'utf8', (err, data) => { // чтение файла catalog.json если ошибок нет данные из файла записываются в переменную data
    res.send(data); // сервер отдает data по запросу от браузера 
  })
})

app.get('/cart', (req, res) => { // '/cart' имя запроса
  fs.readFile('./cart.json', 'utf8', (err, data) => { // чтение файла cart.json если ошибок нет данные из файла записываются в переменную data
    res.send(data); // сервер отдает data по запросу от браузера 
  })
})

app.post('/addToCart', (req, res) => { // имя запроса
  fs.readFile('./cart.json', 'utf8', (err, data) => { // чтение файла 
    if (err) {
      res.send('{"result": 0}') // в случае ошибки 
    } else {
      const cart = JSON.parse(data); // запись содержимого файла в объект
      const item = req.body; // тело запроса
      
      cart.push(item);  // добавление записи в объект

      fs.writeFile('./cart.json', JSON.stringify(cart), (err) => { // запись объекта в файл
        if (err) {
          res.send('{"result": 0}') // в случае ошибки записи
        } else {
          res.send('{"result": 1}') // при удачной записи
        }
      })
      
    }
  })
})

app.post('/delToCart', (req, res) => { // имя запроса
  fs.readFile('./cart.json', 'utf8', (err, data) => { // чтение файла 
    if (err) {
      res.send('{"result": 0}') // в случае ошибки 
    } else {
      const cart = JSON.parse(data); // запись содержимого файла в объект
      const item = req.body; // тело запроса
      
      
      cart.splice(cart.indexOf(item)-1 , 1)

      fs.writeFile('./cart.json', JSON.stringify(cart), (err) => { // запись объекта в файл
        if (err) {
          res.send('{"result": 0}') // в случае ошибки записи
        } else {
          res.send('{"result": 1}') // при удачной записи
        }
      })
    }
  })
})

app.post("/status" , (req , res) => {
  fs.readFile('./status.json', 'utf8', (err, data) => { // чтение файла 
    if (err) {
      res.send('{"result": 0}') // в случае ошибки 
    } else {
      const statusList = JSON.parse(data); // запись содержимого файла в объект
      const status = req.body; // тело запроса
      
      statusList.push(status);

      

      fs.writeFile('./status.json', JSON.stringify(statusList), (err) => { // запись объекта в файл
        if (err) {
          res.send('{"result": 0}') // в случае ошибки записи
        } else {
          res.send('{"result": 1}') // при удачной записи
        }
      })
    }
  })
})

app.listen(3000, () => {
  console.log('server runnig on local:3000');
})
