import './common.css'
import './demo.scss'
console.log('hello world')
const fun = (i) => {
  console.log(i)
}
fun(2)
console.log(new Set([1]))
console.log(['a','b'].includes('a'))
let pro = new Promise((resolve) => {
  setTimeout(() => {
    resolve('ccc')
  },1000)
})
pro.then(res =>{
  console.log(res)
})
