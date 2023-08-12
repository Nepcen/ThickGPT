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
/*  popup.js                                                                              */
/*                                                                                        */
/*  By: Nepcen yusufabacik@gmail.com                                                      */
/*  Created: 25/06/2023 16:22:01                                                          */
/*                                                                                        */
/******************************************************************************************/

import { getActiveTabURL, defaultSliderWidthValue } from "./utils.js";

// Slider değeri değiştiğinde background script'e mesaj gönder
document.addEventListener("DOMContentLoaded", function () {
  var widthSlider = document.getElementById("widthSlider");
  var widthSliderValueLabel = document.getElementById("widthSliderValueLabel");
  var alignmentBtns = document.getElementsByClassName("alignment");
  var includePromptBar = document.getElementById("includePromptBar");
  var resetBtn = document.getElementById("resetBtn");

  chrome.storage.local.get(
    { widthValue: defaultSliderWidthValue, includePromptBar: false, alignment: "center" },
    function (result) {
      widthSliderValueLabel.textContent = "%" + result.widthValue;
      widthSlider.value = result.widthValue;
      includePromptBar.checked = result.includePromptBar
      document.querySelector(`.alignment#${result.alignment}`).classList.add("checked");
    }
  );

  widthSlider.addEventListener("input", async function () {
    const activeTab = await getActiveTabURL();
    var widthValue = parseInt(widthSlider.value);
    widthSliderValueLabel.innerHTML = "%" + widthValue;

    if (activeTab.url.includes("chat.openai.com")) {
      chrome.tabs.sendMessage(activeTab.id, {
        action: "changeWidth",
        widthValue: widthValue,
      });
    }
  });

  for (let i = 0; i < alignmentBtns.length; i++) {
    alignmentBtns[i].addEventListener("click", async () => {
      const activeTab = await getActiveTabURL();
      var alignment = alignmentBtns[i].id;

      for (let j = 0; j < alignmentBtns.length; j++) {
        alignmentBtns[j].classList.remove("checked");
      }

      alignmentBtns[i].classList.add("checked");

      if (activeTab.url.includes("chat.openai.com")) {
        chrome.tabs.sendMessage(activeTab.id, {
          action: "changeAlignment",
          alignment: alignment,
        });
      }
    });
  }

  includePromptBar.addEventListener("change", async () => {
    const activeTab = await getActiveTabURL();
    if (activeTab.url.includes("chat.openai.com")) {
      chrome.tabs.sendMessage(activeTab.id, {
        action: "includePromptBar",
        includePromptBar: includePromptBar.checked,
      });
    }
  })

  resetBtn.addEventListener("click", async () => {

    widthSliderValueLabel.textContent = "%" + defaultSliderWidthValue;
    widthSlider.value = defaultSliderWidthValue;
    includePromptBar.checked = false;
    for (let j = 0; j < alignmentBtns.length; j++) {
      alignmentBtns[j].classList.remove("checked");
    }
    document.querySelector(`.alignment#center`).classList.add("checked");

    const activeTab = await getActiveTabURL();
    if (activeTab.url.includes("chat.openai.com")) {
      chrome.tabs.sendMessage(activeTab.id, {
        action: "reset",
      });
    }
  });
});
