let data = list.gardens;
let themes = []; //태그
let gardenName = []; //가든 이름
let labelCheck = []; //체크된 라벨

for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].themes.length; j++) {
        if(themes.includes(data[i].themes[j]) == false) {
            themes[themes.length] = data[i].themes[j];
        }
    }
    if(gardenName.includes(data[i].themes) == false) {
        gardenName[gardenName.length] = data[i].name;
    }
}

let tags = document.querySelector("#tags");

let tagForm = document.querySelector("#tag-form");;

for(let i = 0; i < themes.length; i++) {
    tagForm.innerHTML+= ` <div id="clickBox${i+1}" class="clickBox">${themes[i]}</div>`;
}

document.addEventListener("click", e => {
    let active = document.querySelector(".btnActive");
    if(e.target.classList.contains("clickBox")) {
        if(e.target.id != "clickBox0") {
            active.classList.remove("btnActive");
            e.target.classList.add("btnActive");
            let check = e.target.innerText;
            let includeArr = [];
            for(let k = 0; k < data.length; k++) {
                if(data[k].themes.includes(check)) {
                    console.log(data[k].themes, k);
                    includeArr[includeArr.length] = k;
                }
            }
            for(let l = 1; l < 6; l++) {
                let place = document.querySelector(`#item-list > ul:nth-child(${l})`);
                place.innerHTML = "";
            }
            for(let i = 0, cnt = 0; i < includeArr.length; i++) {
                console.log(includeArr[i]);
                if(i%5 == 0) {
                    cnt++
                }
                output(cnt, includeArr[i]);
            }
        }
        else {
            active.classList.remove("btnActive");
            e.target.classList.add("btnActive");
            for(let l = 1; l < 6; l++) {
                let place = document.querySelector(`#item-list > ul:nth-child(${l})`);
                place.innerHTML = "";
            }
            for(i = 0, cnt = 0; i < data.length; i++) {
                if(i%5 == 0) {
                    cnt++
                }
                output(cnt, i);
            }
        }
    }
})

var itemZone = document.querySelector("#item-list");
var itemImg = []; 
var itemTheme = [];
for(let k = 0; k < data.length; k++) {
    itemImg[k] = data[k].image.split("/")[1];
    itemTheme[k] = data[k].themes;
}

for(let k = 0, cnt = 0; k < data.length; k++) {
    if(k%5 == 0) {
        cnt++;
    }
    output(cnt, k);
}

let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", e=> {
    let cho_hangul = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    let search = document.querySelector("#search").value.split("");
    let checkArr = [];
    let subArr = [];
    let subArrNum = [];
    for(let i = 0; i < search.length; i++) {
        if(cho_hangul.includes(search[i])) {
            checkArr[checkArr.length] = true;
        }
        else {
            checkArr[checkArr.length] = false;
        }
    }
    for(let i = 0; i < data.length; i++) {
        if(checkArr[0] == true) {
            let cho_han = convertToChosung(data[i].name);
            let firstStr = cho_han.indexOf(search[0]);
            firstStr = data[i].name.substr(firstStr, checkArr.length);
            if(firstStr.length == search.length) {
                subArr[subArr.length] = firstStr;
                subArrNum[subArrNum.length] = i;
            }
        }
        else if(checkArr[0] == false){
            let firstStr = data[i].name.indexOf(search[0]);
            firstStr = data[i].name.substr(firstStr, checkArr.length);
            if(firstStr.length == search.length) {
                subArr[subArr.length] = firstStr;
                subArrNum[subArrNum.length] = i;
            }
        }
    }
    console.log(subArr);
    console.log(subArrNum);
    console.log(checkArr);
    for(let l = 1; l < 6; l++) {
        let place = document.querySelector(`#item-list > ul:nth-child(${l})`);
        place.innerHTML = "";
    }
    
    for(let i = 0, count = 0; i < subArr.length; i++) {
        let lastCheck = [];
        for(let j = 0; j < checkArr.length; j++) {
            if(checkArr[j] == true) {
                let alph = convertToChosung(subArr[i]);
                lastCheck[j] = alph.split("")[j];
            }
            else {
                lastCheck[j] = subArr[i].split("")[j];
            }
        }
        let alph = ""
        let beta = ""
        for(let k = 0; k < search.length; k++) {
            alph = alph + lastCheck[k];
            beta = beta + search[k];
        }
        if(alph == beta) {
            if(count == 0) {
                count++;
            }
            else if(i%5 == 0) {
                count++
            }
            output(count, subArrNum[i]);
        }
    }
})


function output(cnt, k) {
    console.log(cnt);
    let place = document.querySelector(`#item-list > ul:nth-child(${cnt})`);
    place.innerHTML += `
    <li>
        <div class="imgBox">
            <img src="./IMG/Bgarden/${itemImg[k]}" alt="">
        </div>
        <p>${data[k].name}</p>
        <div>${itemTheme[k]}</div>
    </li>
    `;
}

function convertToChosung(text) {
    const CHO_LIST = [
      "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
      "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
      "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
      "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    ];
    let chosung = "";
  
    for(let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i) - 0xac00;
      if(code > -1 && code < 11172) {
        const cho = Math.floor(code / 28 / 21);
        chosung += CHO_LIST[cho];
      } else {
        chosung += text.charAt(i);
      }
    }
  
    return chosung;
  }