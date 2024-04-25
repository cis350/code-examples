/**
 * this HOC creates stateless
 * component
 */

let key = 0;
function CreateComponent ({type, eventHandler, text, eltid}){
    key +=1;
  if(type && type === 'input' && eventHandler){
    
    return (<input type="text" id={eltid} key={key} name={text} onChange={eventHandler} />)
  }
  if(type && type === 'button' && eventHandler){
    return (<button type="button" id={eltid} key={key} onClick={eventHandler}>{text}</button>)
  }

}

export default CreateComponent;