const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const tab = document.querySelectorAll (".button-group button");
const search = document.querySelector(".search");
const crop = document.querySelector("#crop");
const select = document.querySelector("#js-select");
const sortAdvance = document.querySelector(".js-sort-Advance");
let data = [];

// 取得json資料並賦予在data上
function getData() {
    axios.get(url)
        .then((response) => {
            data = response.data;
            filterData = response.data.filter((value) => value.作物名稱);
            renderData(showData);
        });
};

// 組字串、資料初始化
function renderData(showData) {
    let str = "";
    showData.forEach((value) => {
        str += `<tr>
            <td>${value.作物名稱}</td>
            <td>${value.市場名稱}</td>
            <td>${value.上價}</td>
            <td>${value.中價}</td>
            <td>${value.下價}</td>
            <td>${value.平均價}</td>
            <td>${value.交易量}</td>
        </tr>`
    });
    showList.innerHTML = str;
};

// 選取標籤篩選類別
buttonGroup.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
        let type = e.target.dataset.type;
        // 選取按鈕群組，並在點擊時將全部按鈕底色清除 
        // (因74、83行優化改放最上方，目前測試無bug)
        // let tab = document.querySelectorAll (".button-group button");
        tab.forEach((value) => {
            value.classList.remove("active")
        });
        // 點擊按鈕比對種類代碼有無相符
        if (type === "N04") {
            filter(type)
            // 將點擊按鈕上色
            e.target.classList.add("active");
        } else if (type === "N05") {
            filter(type)
            e.target.classList.add("active");
        } else if (type === "N06") {
            filter(type)
            e.target.classList.add("active");
        }
        
    }
});

// 篩選函式
function filter(type) {
    filterData = data.filter ((value) => {
        return value.種類代碼 === type;
    });
    renderData(filterData);
};

// 關鍵字搜尋
search.addEventListener("click", (e) => {
    tab.forEach((value) => {
        value.classList.remove("active")
    });
    if (e.target.nodeName === "BUTTON") {
        keywordFilter();
    };
});

crop.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        tab.forEach((value) => {
            value.classList.remove("active")
        });
        keywordFilter();
    };
});

// 關鍵字搜尋函式
function keywordFilter() {
    // 確認關鍵字搜尋框內有輸入資料
    if (crop.value.trim() == "") {
        alert ("請輸入作物名稱！");
        crop.value = "";
        return
    } else if (crop.value.trim() != "") {

        // 比對輸入關鍵字與資料庫有無相符資料
        filterData = data.filter ((value) => {
            return value.作物名稱.match(crop.value)
        });
        // 若比對結果沒有任何一筆資料相符，則跳出提示
        if (filterData.length == 0) {
            showList.innerHTML = `<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>`;
            return
        };
        crop.value = "";
        renderData(filterData);
    };
};

// 監聽排序選單，並加入切換事件
select.addEventListener ("change", (e) => {
    switch (e.target.value) {
        case "排序篩選":
            showList.innerHTML = `<tr>
            <td colspan="7" class="text-center p-3">請輸入並搜尋想比價的作物名稱^＿^</td>
            </tr>`
            break;
        case "依上價排序":
            selectChange("上價");
            break;
        case "依中價排序":
            selectChange("中價");
            break;
        case "依下價排序":
            selectChange("下價");
            break;
        case "依平均價排序":
            selectChange("平均價");
            break;
        case "依交易量排序":
            selectChange("交易量");
            break;
    };
});

// 利用sort排序價格與數量，再將已排序好的data帶入資料初始化的參數渲染
function selectChange(value) {
    filterData.sort((a, b) => {
        return a[value] - b[value];
    });
    renderData(filterData);
};

sortAdvance.addEventListener("click", (e) => {
    console.log("有點擊到");
});