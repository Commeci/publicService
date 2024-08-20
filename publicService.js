import { categoryBtns, regionLists } from "./manage.js";
import { env } from "./env.js";

const API_KEY = env.API_KEY;
const $swiperWrapper = document.querySelector(".swiper-wrapper");
const $serviceList = document.getElementById("service-list");
const $logo = document.getElementById("logo");
const $cateMenu = document.getElementById("cate-menu");
const $detailInfo = document.getElementById("detail-info");
const $selectRegion = document.getElementById("select-region");
const $searchInput = document.getElementById("search-input");
const $searchIcon = document.getElementById("search-icon");
const $close = document.getElementById("close");
const $ham = document.getElementById("ham");
const $closeCate = document.getElementById("close-cate");
const $myCate = document.getElementById("my-cate");
const $sec2 = document.querySelector(".sec2");

let subCategory = " "; // 카테고리
let service = " "; // 서비스 (검색)

let startPage = 1;
let endPage = 15;
let pageSize = 15;
let page = 1;
let totalResults = 0;
let groupSize = 3;
let currentPage = 1;

var swiper = new Swiper(".myCate", {
    slidesPerView: "auto",
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

const createOption = (regions) => {
    regions.forEach((region) => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        $selectRegion.appendChild(option);
    });
};

const defaultMap = () => {
    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5665, 126.978), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options);

    var markerPosition = new kakao.maps.LatLng(37.5665, 126.978);
    var marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    marker.setMap(map);
};

const searchMap = (y = 37.5665, x = 126.978) => {
    var container = document.getElementById("map-info"); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(y, x), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options);

    var markerPosition = new kakao.maps.LatLng(y, x);
    var marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    marker.setMap(map);
};

let logoState = false;
const clickLogo = () => {
    console.log("클릭");
    if (!logoState) {
        $logo.style.cssText = `
            transform: rotate(90deg);
        `;
        $cateMenu.classList.add("visible-menu");
        $cateMenu.classList.remove("hidden-menu");
        logoState = true;
    } else {
        $logo.style.cssText = `
        transform: rotate(0deg);
    `;
        $cateMenu.classList.add("hidden-menu");
        $cateMenu.classList.remove("visible-menu");
        logoState = false;
    }
};

const searchData = (event) => {
    if (event.type === "keypress" && event.key !== "Enter") {
        service = $searchInput.value.trim();
        return;
    }

    if (event.type === "keypress") {
        event.preventDefault();
    }
    service = $searchInput.value.trim();
    $searchInput.value = "";
    updatePage();
};

const clickCateBtn = async (category, buttonMap) => {
    document
        .querySelectorAll(".cate")
        .forEach((btn) => btn.classList.remove("active"));

    const buttons = buttonMap.get(category);
    if (buttons) {
        buttons.swiperSlideButton.classList.add("active");
        buttons.cateMenuButton.classList.add("active");
    }
    if (category === "전체") {
        subCategory = " ";
    } else {
        subCategory = category.split("/")[0];
    }
    console.log(subCategory);

    await getDatas();
    updatePage();
};

const createBtn = (categories) => {
    const buttonMap = new Map();

    categories.forEach((item) => {
        const swiperSlide = document.createElement("div");
        swiperSlide.className = "swiper-slide";
        const swiperSlideButton = document.createElement("button");
        swiperSlideButton.classList.add("cate", "font-noto");
        swiperSlideButton.textContent = item;
        swiperSlide.appendChild(swiperSlideButton);
        $swiperWrapper.appendChild(swiperSlide);

        const cateMenuButton = document.createElement("button");
        cateMenuButton.classList.add("cate", "shadow", "font-noto");
        cateMenuButton.textContent = item;
        $cateMenu.appendChild(cateMenuButton);

        if (item === "전체") {
            swiperSlideButton.classList.add("active");
            cateMenuButton.classList.add("active");
        }

        buttonMap.set(item, { swiperSlideButton, cateMenuButton });

        swiperSlideButton.addEventListener("click", () => {
            clickCateBtn(item, buttonMap);
            closeCate();
        });
        cateMenuButton.addEventListener("click", () =>
            clickCateBtn(item, buttonMap)
        );
    });
};

const updateDetailInfo = (item) => {
    const detailText = document.getElementById("detail-text");
    const reserveLink = document.getElementById("reserve-link");
    detailText.innerHTML = item.DTLCONT.replace(/<img[^>]*>/g, "");
    searchMap(item.Y, item.X);
    reserveLink.href = item.SVCURL || "#";
};

const createListItem = (item) => {
    const listItem = document.createElement("li");
    listItem.className = "shadow";
    listItem.className = "list-item";
    let dateStart = item.SVCOPNBGNDT
        ? new Date(item.SVCOPNBGNDT).toISOString().slice(0, 10)
        : "";
    let dateEnd = item.SVCOPNENDDT
        ? new Date(item.SVCOPNENDDT).toISOString().slice(0, 10)
        : "";
    let state =
        item.SVCSTATNM.length > 4 ? item.SVCSTATNM.slice(-4) : item.SVCSTATNM;
    let stateClass = "";
    if (state === "접수종료" || state === "예약마감") {
        stateClass = "state-black";
    } else if (state === "일시중지") {
        stateClass = "state-red";
    } else if (state === "접수중" || state === "안내중") {
        stateClass = "state-blue";
    }
    listItem.innerHTML = `
            <div class="img-box">
                <img
                    src="${item.IMGURL}"
                    alt="img"
                />
                <label class="state ${stateClass} font-noto">${state}</label>
            </div>
            <div class="list-info">
                <h3 class="font-noto">${item.SVCNM}</h3>
                <p class="font-noto">
                    <i class="icon"
                        ><img src="./img/user.png" alt=""
                    /></i>
                    <span>${item.USETGTINFO}</span>
                </p>
                <p class="font-noto">
                    <i class="icon"
                        ><img src="./img/pin.png" alt=""
                    /></i>
                    <span>${item.PLACENM}</span>
                </p>
                <p class="font-noto">
                    <i class="icon"
                        ><img src="./img/calendar.png" alt=""
                    /></i>
                    <span>${dateStart}~${dateEnd}</span>
                </p>
            </div>
    `;

    console.log("create list item");
    listItem.addEventListener("click", () => {
        $detailInfo.classList.remove("hidden-info");
        $sec2.classList.add("show-sec2");
        updateDetailInfo(item);
    });

    $close.addEventListener("click", (e) => {
        e.stopPropagation();
        $sec2.classList.remove("show-sec2");
    });

    return listItem;
};

const dataFormat = (subCategory, service) => {
    const selectOne = subCategory || " ";
    const selectTwo = service || " ";
    let selectFour = $selectRegion.value.trim();
    selectFour = selectFour === "전체" ? " " : selectFour;
    const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/ListPublicReservationEducation/${startPage}/${endPage}/${selectOne}/${selectTwo}/ /${selectFour}`;
    return url;
};

const getDatas = async () => {
    $serviceList.innerHTML = "<li>로딩 중...</li>";

    const dataUrl = dataFormat(subCategory, service);
    try {
        console.log(dataUrl);

        const res = await fetch(dataUrl);
        const data = await res.json();
        const items = data.ListPublicReservationEducation.row;
        totalResults = data.ListPublicReservationEducation.list_total_count;

        $serviceList.innerHTML = ``;

        pagination();
        items.forEach((item) => {
            const listItem = createListItem(item);
            $serviceList.prepend(listItem);
        });
        service = "";
    } catch (error) {
        console.error("post error", error);
        $serviceList.innerHTML = "<li class='error'>관련 정보가 없습니다</li>";
    }
};

window.movePage = async (pageNum) => {
    console.log("click");
    page = pageNum;
    currentPage = pageNum;
    startPage = (page - 1) * pageSize + 1;
    endPage = startPage + pageSize - 1;
    await getDatas();
};

const updatePage = async () => {
    currentPage = 1;
    startPage = 1;
    endPage = 15;
    await getDatas();
};

const pagination = () => {
    let pageGroup = Math.ceil(page / groupSize);
    let lastPage = Math.min(
        Math.ceil(totalResults / pageSize),
        pageGroup * groupSize
    );
    let firstPage = (pageGroup - 1) * groupSize + 1;
    let totalPage = Math.ceil(totalResults / pageSize);
    let prevGroup = (pageGroup - 2) * groupSize + 1;
    let nextGroup = pageGroup * groupSize + 1;

    let paginationHTML = `<div class="page font-noto">`;

    paginationHTML += `<i class="page-icon fa-solid fa-chevron-left" id="prev" 
    ${
        pageGroup === 1 ? 'style="opacity: 0.5; pointer-events: none;"' : ""
    } onClick = 'movePage(${prevGroup})'></i>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<button class="page-btn ${
            i === currentPage ? "on" : ""
        }" onClick='movePage(${i})'>${i}</button>`;
    }

    paginationHTML += `<i class="page-icon fa-solid fa-chevron-right" id="next"  ${
        pageGroup * groupSize >= totalPage
            ? 'style="opacity: 0.5; pointer-events: none;"'
            : ""
    } onClick='movePage(${nextGroup})'></i>`;

    paginationHTML += `</div>`;

    $serviceList.innerHTML += paginationHTML;
};

const showCate = () => {
    $myCate.style.cssText = `display: block;`;
};

const closeCate = () => {
    if (window.innerWidth <= 768) {
        $myCate.style.cssText = `display: none;`;
    }
};

const checkScreenSize = () => {
    window.innerWidth > 768 ? showCate() : closeCate();
};

$ham.addEventListener("click", showCate);
$closeCate.addEventListener("click", closeCate);
$logo.addEventListener("click", clickLogo);
$selectRegion.addEventListener("change", async () => {
    await getDatas();
    updatePage();
});
$searchIcon.addEventListener("click", searchData);
$searchInput.addEventListener("keypress", searchData);
window.addEventListener("resize", checkScreenSize);
createBtn(categoryBtns);
createOption(regionLists);
await getDatas();
defaultMap();
searchMap();
swiper.update();
