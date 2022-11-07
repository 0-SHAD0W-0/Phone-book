window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.input2'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
let massiv=[];
if(massiv.length==0) {
    empty("Контакты отсутсвуют");
}
function del(i) {
    massiv.splice(i, 1);
    document.getElementById(i).remove();
}
function empty(text) {
    document.getElementById('main_info').innerHTML=`<div class='empty'>${text}</div>`;
}

function fav(i) {
    massiv[i][2]=!massiv[i][2];
    generation();
}
function generation(data) {
    document.getElementById('main_info').innerHTML="";
    let copy= [];
    if (!data) {
        copy=massiv;
    }else {
        massiv.map((items, i)=>{
            if(items[0].toLowerCase().search(data.toLowerCase()) != -1) {
                copy.push([items[0], items[1], items[2]]);
                console.log(copy);
            } 
        });
        if (!copy.length) {
            empty("Ненайдено");
        };
    }
    copy.sort(
        function(a, b) {
          if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
          if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
          return 0;
        }
    );


    for (let i = 0; i < copy.length; i++){
        for (let j = 0; j < copy.length-1; j++){
            if (copy[j][2] < copy[j + 1][2]) {
                let temp = copy[j];
                copy[j] = copy[j + 1];
                copy[j + 1] = temp;
            }
        }
    }
    copy.map((items, i)=>{
        document.getElementById('main_info').innerHTML+=`
        <div class="contact" id="${i}">
            <img src="contact.png" alt="">
            <div class="info">
                <h1>${items[0]}</h1>
                <span>${items[1]}</span>
            </div>
            <div class="ikonki">
                <button class="delete button-I"  onclick="del(${i})">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
                <button class="faver button-I" onclick="fav(${i})">
                    <i class="fa ${(items[2]) ? "fa-heart" : "fa-heart-o"}" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        `;  
    });
}

function add() {
    document.getElementById('window').style.display = 'flex';
    document.getElementById('phone_book').style.display = 'none';
}
function create() {
    let prov=0;
    let first = document.getElementById("first").value;
    let second = document.getElementById("second").value;
    let faver = document.getElementById("faver").checked;
    if(first ){
        
        if(/^[A-ZА-ЯЁ]+$/i.test(first)){
            if(first.length>=2) { 
                if(first.length<30) {
                    prov++;
                } else {
                    alert("Имя слишком длинное");
                }
            } else {
                alert("Имя слишком короткое");
            }
        } else {
            alert("Имя введено некорректно"); 
        }
    }else {
        alert("Поле имя незаполнено");
    }
    if(second) {
        if(second.length>=17) {
            prov++;
        } else {
            alert("номер неверен");
        }
    }else {
        alert("Поле пустое");
    }
    if(prov==2){                               
        document.getElementById('first').value = "";
        document.getElementById('second').value = "";
        document.getElementById('faver').checked = false;
        massiv.push([first, second, faver]);
        generation(false);
        document.getElementById('phone_book').style.display = 'flex';
        document.getElementById('window').style.display = 'none';
        console.log(massiv);
    }
}
let searchInput=document.getElementById("search");
searchInput.oninput = function() {
    let searchVal= searchInput.value;
    if(!searchVal) {
        generation(false);
    }else {
        if (searchVal.length >= 30) {
            alert("Поле слишком длинное");
        }else {
            if (!/^[A-ZА-ЯЁ]+$/i.test(searchVal)) {
                alert("Поле введено неверно");
            }else {
                generation(searchVal);
            }
        }
    }
};