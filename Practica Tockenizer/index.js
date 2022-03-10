// EJERCICIO 1

// function sumaComputacionalmenteCompleja (a, b, cb) {
//   setTimeout(() => {
//     cb(a + b)
//   }, 1000)
// }

// // this

// // llamadas asincronas
// console.log('1')
// sumaComputacionalmenteCompleja(10, 20, resultado => {
//   console.log('1')
// })
// console.log('2')

// FIN EJERCICIO 1

// EJERCICIO 2

// const fs = require('fs')

// // callback hell
// fs.readFile('./prueba.json', (err, data) => {
//   if (err) throw err
// })

// const resultado = fs.readFileSync('./prueba.json')
// console.log('Sincrono', resultado.toString())

// FIN EJERCICIO 2

// EJERCICIO 3

// const list = [1, 2, 3, 4] // x2
// const list2 = [2, 4, 6, 8]
// for (let i = 0; i < list.length; i++) {
//   list2[i] = list[i] * 2
// }

// i === 4

// console.log('hola')
// const listX2 = list.map((elemento) => elemento * 2)
// console.log('hola')

// FIN EJERCICIO 3

// Diferencia let y var
// var message = 'Hello World'

// function suma () {
//   var message1 = '321'
//   let message2 = '123'
//   const message3 = '567'

//   // Si se declara con var/let se puede mutar su valor

//   message2 = '321'

//   // Si se declara con const, no se puede mutar su valor

//   // message3 = '456' // Esto tira error
// }

// Si se declara con var si tengo acceso desde fuera de esa función a message1
// Aqui fuera de suma, no tengo acceso a message2

// Ejercicio 8, el chungo

// Necesitamos un array de ubicaciones de ficheros en nuestro sistema

const ficheros = ['./textos/hello.txt', './textos/hola.txt']

// Lee estos ficheros con una funcion f6

const fs = require('fs')

function f6Sincrono (llista) {
  const resultados = []
  for (let i = 0; i < llista.length; i++) {
    // i = 0 -> './textos/hello.txt' & i = 1 -> './textos/hola.txt'
    const file = fs.readFileSync(llista[i])
    resultados.push(file.toString())
  }
  return resultados
}

const resultados = f6Sincrono(ficheros) // ['hola', 'hello']
// console.log('Sincrono', resultados)

function f6Asincrono (llista, callback_final) {
  const resultados = []
  llista.forEach(function (element, index) {
    fs.readFile(element, function (err, data) {
      resultados.push(data.toString())
      if (resultados.length === llista.length) {
        // Forma 1
        // if (index === llista.length - 1) { // Forma 1
        callback_final(resultados)
      }
    })
  })
}

function callback_final (resultados) {
  console.log(resultados)
}

// f6Asincrono(ficheros, callback_final)

// .........

// Fin ejercicio 8

// Ejercicio 9

function f7Asincrono (llista, callback) {
  llista.forEach(function (element, index) {
    fs.readFile(element, function (err, data) {
      if (err) {
        throw err
      }
      callback(data)
    })
  })
}

// f7Asincrono(ficheros, function (element) {
//   console.log(element)
// })

// Fin Ejercicio 9

// Ejercicio 11
//function asyncMap(list,f,callback2){...}
// function callback2(err,resultList){...}
// function f(a,callback1){...}
// function callback1(err,result){...}

// function asyncMap (list, f, callback2) {
//   list.forEach(function (element) {
//     //
//     f(element, function (err, data) {
//       callback2(data)
//     })
//   })
// }

// Fin Ejercicio 11

// Ejercicio 12

// const o = {
//   contador: 0,
//   inc: function () {
//     this.contador++
//     this.notify(this.contador)
//   }
// }

// o.notify = function (value) {
//   console.log('Se incrementó el contador. Su valor es', value)
// }

// o.inc()
// o.inc()
// o.inc()
// o.inc()
// o.inc()

// console.log(o.contador)

// Fin Ejercici 12

// Ejercicio 13

// var count = 1

// var testModule = function () {
//   var count = 10
//   return {
//     inc: function () {
//       count++
//     },
//     count: function () {
//       return count
//     }
//   }
// }
// testModule().inc()

// console.log(testModule().count())

// console.log(count)

// Fin Ejercicio 13

// Ejercicio 14

function Counter () {
  this.a = 0
  this.inc = function () {
    this.a++
  }
  this.count = function () {
    return this.a
  }
}

function DecreaseCounter () {
  this.inc = function () {
    this.a--
  }
}

class CounterClass {
  a = 0
  inc () {
    this.a++
  }
  count () {
    return this.a
  }
}

class DecreaseClass extends CounterClass {
  decrease () {
    this.a--
  }
}

class MultiplyClass extends DecreaseClass {
  multiply (n) {
    this.a = this.a * n
  }
}

const counter1 = new Counter()
const counter2 = new Counter()
const counter3 = new Counter()
const counter4 = new CounterClass()
const counterDecrese = new DecreaseClass()
const counterMultiply = new MultiplyClass()

// console.log(counter1.count()) // 0

// counter2.inc()
// console.log(counter2.count()) // 1

// counter3.inc()
// counter3.inc()
// console.log(counter3.count()) // 2

// counter4.inc()
// counter4.inc()
// counter4.inc()
// console.log(counter4.count()) // 3

// counterDecrese.inc()
// counterDecrese.decrease()
// console.log(counterDecrese.count()) // ???

// counterMultiply.inc()
// counterMultiply.inc()
// counterMultiply.multiply(8)
// console.log(counterMultiply.count()) // 16

// Fin ejercicio 14

// Ejercicio 15

// Una función que retorne ese objeto. Esta funcion leerá un fichero que recibe por parámetro y cambia el valor del objeto una vez termina

function readFuture (file, cb) {
  const future = {
    isDone: false,
    result: null
  }
  fs.readFile(file, function (err, result) {
    // ...... Se ejecuta después
    if (err) throw err
    future.isDone = true
    future.result = result.toString()
  })
  return future // ... Se ejecuta primero que el callback de readFile
}

const future = readFuture('./textos/hello.txt')
console.log('PRIMERA LECTURA', future)

setTimeout(function () {
  console.log('SEGUNDA LECTURA', future)
}, 1000)

// Fin Ejercicio 15
