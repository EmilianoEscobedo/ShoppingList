// --- Layout  --- //

let splash = document.getElementById('splash');
let popup = document.getElementById('popup');
let list = document.getElementById('list');

// --- Global Functions --- //

function emptyScreen(){
    if (popup.classList.contains('off') && newItem.children.length == 0){
        splash.classList.remove('off');
        list.classList.add('off');
    }
}

let defaultCategory = `<img src="/assets/images/i-cart.png" class="icon" alt=""> Category`
function resetInputs(){
    listFilterBy.innerHTML= defaultCategory ;
    popupCategory.innerHTML = defaultCategory;
    popupItem.value = '';
    popupDescription.value = '';
}

// ul of NewItem
let newItem = document.getElementById('listItem');

// Create IDs dinamically
let acordionCounter=0; 
let buttonCounter=0; 


function captureNewItem(){
    let category = document.getElementById('popupCategory').innerHTML;
    let item = document.getElementById('popupItem').value;
    let description = document.getElementById('popupDescription').value;
    let id = popupCategory.children[0].id;
    let newItemTemplate = `<li id="${buttonCounter+1}" class="my-1 itemli ${id}">
        <div class="d-flex">
        <div class="col-11">
            <button class="list--item w-100" type="button" data-bs-toggle="collapse" data-bs-target="#a${acordionCounter+1}" aria-expanded="true" aria-controls="a${acordionCounter+1}">
                <div class="row w-100 h-100">
                    <div class="col-5 listed d-flex text-start h-100 align-items-center">
                        ${category}
                    </div>
                    <div class="col-7 d-flex h-100 align-items-center">
                        <p class="m-0">${item}</p>
                    </div>
                </div>
            </button>
        </div>
        <div class="col-1">
            <button class="check" id="${buttonCounter+1}">
                <img src="/assets/images/i-checkbox.png" class="icon" alt="">
            </button>
        </div>
    </div>
    <div class="col-11">
        <div id="a${acordionCounter+1}" class="accordion-collapse collapse" data-bs-parent="#listItem">
        <div class="accordion-body list--description"> 
            ${description}
        </div>
    </div>
    </li>`;
    newItem.innerHTML+=newItemTemplate;
    //Array of items to be filtered
    itemListed.push(id);
    // Create IDs dinamically
    acordionCounter++;
    buttonCounter++;
    //Creates listener for removes-btn from new list
    checks= document.getElementsByClassName('check');
    check= Array.from(checks);
    check.forEach(btn => {
        btn.addEventListener('click', () =>{
            document.getElementById(btn.id).remove();
            newArray()
            // localStorage.removeItem()
            Toast.fire({
                icon: 'info',
                title: 'Removed'
              })
            if (newItem.children.length == 0){
                list.classList.add('off');
                splash.classList.remove('off');
            }   
        })
    })
    Toast.fire({
        icon: 'success',
        title: 'Added'
      })
    saveinLocal(newItemTemplate);
}

function addToList(){
    if (popupItem.value=='' || popupCategory.children[0].id==''){
        Swal.fire({
            text: 'Choose Category and Item, description is optional',
            icon: 'error',
            width:200,
            showConfirmButton: false,
            timer: 2000,
          })
    }else{
        splash.classList.add('off')
        popup.classList.add('off');
        list.classList.remove('off');    
        captureNewItem();
        emptyScreen();
        resetInputs()
    }
}

// --- btns functionality --- //

//Where is the target on full-screen
popup.addEventListener('click',()=>{
    list.classList.remove('on');
    popup.classList.add('on');
})
list.addEventListener('click',()=>{
    popup.classList.remove('on');
    list.classList.add('on');
})
//Header - HowTo
let howTo = document.getElementById('howTo').addEventListener('click',()=>{
    Swal.fire({
        title: 'Quick intro',
        icon: 'info',
        html:
        'Hi there! <br><br> To add a new item to your shopping list, click the <i class="fa-solid fa-circle-plus" style= color:#FF4081;></i> button and fill the <strong>mandatories fields: category and item </strong>, then click add, and there u go! you already started your laingard shopping list <i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-cart-shopping"></i><i class="fa-solid fa-cart-shopping"></i>',
        showCloseButton: true,
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    })
})
//Header - About
let about = document.getElementById('about').addEventListener('click', ()=>{
    Swal.fire({
        title: 'Why and who',
        icon: 'info',
        html:
        'This mini app as been developed with the only purpose of improve my skills at HTML, CSS and vanilla JS, feel free of review the code and use as u want. <br><br> <i class="fa-brands fa-github"></i> <a target="a_blank" href="https://github.com/EmilianoEscobedo">Check my GitHub</a><br><br><i class="fa-brands fa-linkedin-in"></i><a target="a_blank"href="https://www.linkedin.com/in/emiliano-escobedo-a6a1b1141/"> Check my LinkedIn</a>',
        showCloseButton: true,
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
    })
});
//Main add btn
let add = document.getElementById('add').addEventListener('click', ()=>{
    if (!splash.classList.contains('off')){
        splash.classList.add('off');
    }
    popup.classList.remove('off');
    if (!list.classList.contains('off')){
        list.classList.add('off');
    }
    emptyScreen()
    resetInputs()
})
// Popup add btn
let popupAdd = document.getElementById('popupAdd').addEventListener('click', ()=>{
    addToList()
    })
//btnClose add (only mobile)
let btnClose= document.getElementById('btnClose').addEventListener('click', ()=>{
    popup.classList.add('off')
    popupCategory.innerHTML = `<img src="/assets/images/i-cart.png" class="icon" alt=""> Category`
    resetInputs()
    if(itemListed!=(itemListed.length==0)){
        list.classList.remove('off')
    }
    emptyScreen()
})

let form = document.getElementById('form').addEventListener('submit',function(event){
    event.preventDefault()
})

// --- PopupCategory & FilterBy Functionality --- //

let popupCategory = document.getElementById('popupCategory');
let listFilterBy = document.getElementById('listFilterBy');
let itemListed = [];
const items = document.getElementsByClassName('dropdown-item');

let item = Array.from(items);
item.forEach(btn => {
    btn.addEventListener('click', ()=>{
        if(popup.classList.contains('on')){
            popupCategory.innerHTML = btn.innerHTML;
        }
        if (list.classList.contains('on')){
            listFilterBy.innerHTML = btn.innerHTML;
            let idfilter = listFilterBy.children[0].id;
            let listItem = document.getElementsByClassName('itemli');
            let itemli = Array.from(listItem);
            itemli.forEach(btn =>{
                btn.classList.add('off')
                if(btn.classList.contains(idfilter)){
                    btn.classList.remove('off')
                }
                if(idfilter === 'all'){
                    btn.classList.remove('off')
                }
            })
        }
    })
})

// --- LocalStorage --- //

function saveinLocal(item){
    //get item from captureNewItem
    let newData = item;
    // if nothing saved, crate empty array
    if (!localStorage.getItem('storageList')){
        localStorage.setItem('storageList','[]');
    }
    //get old items and slap in to the new items
    let oldData = JSON.parse(localStorage.getItem('storageList'));
    oldData.push(newData);
    //save the old + new items
    localStorage.setItem('storageList', JSON.stringify(oldData)); 
}

if (localStorage.getItem('storageList')){
    splash.classList.add('off')
    list.classList.remove('off')
    let stored =JSON.parse(localStorage.getItem('storageList'));
    stored.forEach(item =>{
        listItem.innerHTML+= item;
        })

}

// --- Swal mixins --- //

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1800,
    width: 200,
  })

let pepo
function newArray(){
    // let actual = document.getElementsByClassName('itemli');
    // let newArray = Array.from(actual);
    // newArray.forEach(item =>{
    //     localStorage.setItem('storageList', ("<li>"+item.innerHTML+"</li"a)
    //  })
    // localStorage.setItem('storageList', '[]')
    // localStorage.setItem('storageList', JSON.stringify(newArray));
}
