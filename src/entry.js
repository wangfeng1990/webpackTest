import css from './css/index.css';
import less from './less/black.less';
import scss from './sass/white.scss';
{
    let jspangString = 'Hello Webpack'
    document.getElementById('title').innerHTML=jspangString; 
}

function getData(data){
    for(var i = 0 ; i < data.length; i++){
        data[i] = data[i] + 1;
    }
    return data;
}

console.log(getData([1,2,3]))