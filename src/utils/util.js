export function debounce(fn, wait) {    
    var timeout = null;    
    return function(...params) {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(()=>{
            fn.apply(null,params);
        }, wait);    
    }
}