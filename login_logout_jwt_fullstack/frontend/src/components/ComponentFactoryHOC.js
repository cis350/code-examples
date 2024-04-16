/**
 * this HOC creates stateless
 * component
 */

let key = 0;
function CreateComponent ({type, eventHandler, text}){
    key +=1;
  if(type && type === 'input' && eventHandler){
    
    return (<input type="text" key={key} name={text} onChange={eventHandler} />)
  }
  if(type && type === 'button' && eventHandler){
    return (<button type="button" key={key} onClick={eventHandler}>{text}</button>)
  }

}

export default CreateComponent;