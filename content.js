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

console.log("ThickGPT is working");

function isLeftMenuClosed() {
  var closeBtn = document.querySelector("#__next > div > div > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.absolute.left-2.top-2.z-10.hidden.md\\:inline-block");
  return closeBtn ? true : false
}

function refreshElements() {
  chrome.storage.local.get(
    { widthValue: 46, includePromptBar: false, alignment: "center" },
    function (result) {
      var width = result.widthValue
      var includePromptBar = result.includePromptBar
      var alignment = result.alignment

      var classNameString;

      if (isLeftMenuClosed()) {
        console.log("üst");
        classNameString = "flex p-4 gap-4 text-base md:gap-6 md:max-w-3xl md:py-6 lg:px-0 m-auto";
      } else {
        console.log("alt");
        classNameString = "flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto";
      }

      var elements = document.getElementsByClassName(classNameString);

      console.log("Düznlenecek elementler:");
      console.log(elements);

      if (elements.length) {
        Array.from(elements).forEach((element) => {
          element.className = "flex gap-4 text-base md:gap-6 md:py-6";
          element.style.paddingRight = "35px";
          element.style.paddingLeft = "10px";
          element.style.width = width + "%";

          element.parentNode.style.display = "flex";
          element.parentNode.style.justifyContent = alignment;
        });
      } else {
        var elements = document.getElementsByClassName(
          "flex gap-4 text-base md:gap-6 md:py-6"
        );
        Array.from(elements).forEach((element) => {
          element.style.width = width + "%";

          element.parentNode.style.display = "flex";
          element.parentNode.style.justifyContent = alignment;
        });
      }

      const promptBar = document.querySelector("main div.absolute form");
      const insidePromptBar = document.querySelector("main div.absolute form > div");

      if (includePromptBar == true) {
        promptBar.className = "stretch flex flex-row gap-3 last:mb-2 md:last:mb-6";
        promptBar.style.width = "100%";
        promptBar.style.justifyContent = alignment;

        insidePromptBar.className = "relative flex h-full items-stretch md:flex-col";
        insidePromptBar.style.width = width + "%";
        insidePromptBar.style.marginRight = "8px";
      } else if (includePromptBar == false) {
        promptBar.style.width = "";
        promptBar.style.justifyContent = "";
        promptBar.className = "stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl";

        insidePromptBar.style.width = ""
        insidePromptBar.style.marginRight = "";
        insidePromptBar.className = "relative flex h-full flex-1 items-stretch md:flex-col";
      }
    }
  )
}

// Slider değeri değiştiğinde mesaj gönder
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeWidth") {
    chrome.storage.local.set({
      widthValue: parseInt(request.widthValue),
    });
  } else if (request.action === "changeAlignment") {
    chrome.storage.local.set({
      alignment: request.alignment,
    });
  } else if (request.action === "includePromptBar") {
    chrome.storage.local.set({
      includePromptBar: request.includePromptBar,
    });
  } else if (request.action === "reset") {
    chrome.storage.local.set({
      widthValue: 46,
      includePromptBar: false,
      alignment: "center",
    });
  }

  refreshElements()
});

const chatObserver = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    for (const node of mutation.addedNodes) {
      if (node.nodeName === "DIV") {
        refreshElements()
      }
    }
    for (const node of mutation.removedNodes) {
      if (node.nodeName === "DIV") {
        refreshElements()
      }
    }
  }
});

chatObserver.observe(document.body, { childList: true, subtree: true });

// İlk çalıştırma
refreshElements()