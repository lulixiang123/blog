function debounce(fn:Function,delay:number){
  let timer:any=null
  return function (...rest:any){
    clearTimeout(timer)
    timer=setTimeout(()=>{
      fn(...rest)
    },delay,rest)
  }
}
export default debounce