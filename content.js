/******************************************************************************************/
/*                                                                                        */
/*  JBB5    7BBJ   JBBBBBBBBB   GBBBBBBBP?        JG###B5!     JBBBBBBBBB   JBB5    7BBJ  */
/*  5@@@B!  J@@5   5@@GJJJJJJ   &@@YYYYP@@B     J&@#5JJG@@G    5@@GJJJJJJ   5@@@B!  J@@5  */
/*  5@@&@@J J@@5   5@@5         &@&     #@@!   ?@@B     5##7   5@@5         5@@&@@J J@@5  */
/*  5@@YJ@@5Y@@5   5@@&####&P   &@@####&@&Y    5@@!            5@@&####&P   5@@YJ@@5Y@@5  */
/*  5@@J 7#@@@@5   5@@J         &@&J????!      7@@B     5@@5   5@@J         5@@J 7#@@@@5  */
/*  5@@Y   G@@@5   5@@B55555P   &@&             ?#@&PY5B@@G    5@@B55555P   5@@Y   G@@@5  */
/*  ?GG7    YPG?   ?GPGGGGGGG   PP5               75GBBGY!     ?GPGGGGGGG   ?GG7    YPG?  */
/*                                                                                        */
/*  content.js                                                                            */
/*                                                                                        */
/*  By: Nepcen yusufabacik@gmail.com                                                      */
/*  Created: 25/06/2023 16:22:07                                                          */
/*                                                                                        */
/******************************************************************************************/

function isLeftMenuClosed() {
  var element = document
    .querySelector(
      "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.dark.flex-shrink-0.overflow-x-hidden.bg-gray-900"
    )
    .getBoundingClientRect();

  if (element.width > 0) return false;
  else return true;
}

function changeElementWidth(width) {
  var classNameString;

  if (isLeftMenuClosed()) {
    classNameString =
      "flex p-4 gap-4 text-base md:gap-6 md:max-w-3xl md:py-6 lg:px-0 m-auto";
  } else {
    classNameString =
      "flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto";
  }
  var elements = document.getElementsByClassName(classNameString);

  if (elements.length) {
    Array.from(elements).forEach((element) => {
      element.className = "flex gap-4 text-base md:gap-6 md:py-6 m-auto";
      element.style.paddingRight = "35px";
      element.style.paddingLeft = "10px";
      element.style.width = width + "%";
    });
  } else {
    var elements = document.getElementsByClassName(
      "flex gap-4 text-base md:gap-6 md:py-6 m-auto"
    );
    Array.from(elements).forEach((element) => {
      element.style.width = width + "%";
    });
  }
}

// Slider değeri değiştiğinde mesaj gönder
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeWidth") {
    changeElementWidth(request.widthValue);
    console.log("content.js: " + request.widthValue);
    chrome.storage.local.set({ widthValue: parseInt(request.widthValue) });
  }
});

const changeElementWidthInterval = setInterval(() => {
  chrome.storage.local.get({ widthValue: 46 }, function (result) {
    changeElementWidth(result.widthValue);
  });
}, 100);

function performCleanup() {
  clearInterval(changeElementWidthInterval);
}

window.addEventListener("beforeunload", performCleanup);
