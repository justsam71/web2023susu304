alert('js подключен');

//закрыть
document.getElementById('close').addEventListener("click",function(){document.getElementById('my').classList.remove("active")})

//открыть
function openWindow()
{
    document.getElementById('my').classList.add("active");
}

function openWindow2(btn_id) // edit
{
    console.log('_______')
    document.getElementById('my').classList.add("active");
    const input1 = document.getElementById('inputId');
    const input2 = document.getElementById('inputName');
    
    input1.value = list[btn_id].id;
    input2.value = list[btn_id].name;
    
    console.log(btn_id);
    console.log('+++++');
}


let list = [];    
let count = 100;// id=i+count для сервера
//async
async function add(){
    let jsonResponse;
    console.log('--add start');
    let valueName = document.getElementById('inputName').value;
    let valueID = document.getElementById('inputId').value;
    if (parseInt(valueID)){
    let tmp = {};
    tmp.id = valueID;
    tmp.name = valueName;
    tmp.check = false;
    list.push(tmp);
        
        
    await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
    body: valueName,
    userId: valueID,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
//  .then((json) => console.log(json));
.then((json) =>{ jsonResponse = JSON.stringify(json) });

    let user = JSON.parse(jsonResponse);
        console.log(user);

    out();
    console.log('add end');}
}
    

function out(){
    console.log('out start');
    document.getElementById('out').innerHTML = '';
    let mylist = '';
    for(let i=0;i<list.length;i++){
        if (list[i].check == false){
            mylist += '<div class="content" id='+i+'><input type="checkbox" id='+i+' class="checkFalse"><span>'+list[i].id+" " + list[i].name+'</span>'+'<button onclick="del(this.id)" class ="dell" id='+i+'>удалить</button>'+'<button onclick="openWindow2(this.id)" class ="edit" id='+i+'>Редактировать</button>'+'<br></div>';
            console.log(list[i]);}
        }

     document.getElementById('out').innerHTML = mylist;
     console.log('out end');
}

async function del(btn_id){
    console.log('del start');
    console.log(btn_id);
    let index = '';
    console.log('удалено');
    console.log(list[btn_id]);
    list.splice(parseInt(btn_id),1);
    out();
    console.log('del end');
    
await  fetch(`https://jsonplaceholder.typicode.com/posts/${100+btn_id}`, {
  method: 'DELETE',});
    
    
    
    
    
    
    
}

async function edit(btn_id){
    
    let tmp2 = {};
    
    console.log('edit start');
    let input1edit = document.getElementById('inputId').value;
    let input2edit = document.getElementById('inputName').value;

    tmp2.id = input1edit;
    tmp2.name = input2edit;
    tmp2.check = false;
    //list[btn_id] = tmp2;
    list.splice(btn_id,1,tmp2);
    console.log(tmp2)
    console.log('edit end');
    out();
    
   await fetch(`https://jsonplaceholder.typicode.com/posts/${100+btn_id}`, {
   method: 'PATCH',
   body: JSON.stringify({
      body: input1edit,
      userId: input2edit,
    }),
    headers: {
   'Content-type': 'application/json; charset=UTF-8',
    },
})

 .then((json) => console.log(json));
    

}
