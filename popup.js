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

import {
  getActiveTabURL,
  defaultIsActive,
  defaultThicknessValue,
  defaultExtendUserMessageValue,
  defaultAlignmentValue,
  defaultIncludePromptBarValue,
  defaultPromptBarHeightValue
} from "./utils.js"

document.addEventListener("DOMContentLoaded", function () {
  const powerBtns = document.querySelectorAll("#powerBtnWrapper svg")
  const mainBlur = document.getElementById("mainBlur")
  const widthSlider = document.getElementById("widthSlider")
  const widthSliderValueLabel = document.getElementById("widthSliderValueLabel")
  const extendUserMessage = document.getElementById("extendUserMessage")
  const alignmentBtns = document.getElementsByClassName("alignment")
  const includePromptBar = document.getElementById("includePromptBar")
  const promptBarHeight = document.getElementById("promptBarHeight")
  const resetBtn = document.getElementById("resetBtn")

  async function updateSetting(settingKey, value) {
    const activeTab = await getActiveTabURL()
    if (
      activeTab.url.includes("chat.openai.com") ||
      activeTab.url.includes("chatgpt.com")
    ) {
      chrome.tabs.sendMessage(activeTab.id, { [settingKey]: value })
    }
  }

  function initializeUI(result) {
    if(result.isActive == true){
      document.querySelector('svg[data-is-active="true"]').style.display = ""
      document.querySelector('svg[data-is-active="false"]').style.display = "none"
      mainBlur.style.display = "none"
    }else{
      document.querySelector('svg[data-is-active="true"]').style.display = "none"
      document.querySelector('svg[data-is-active="false"]').style.display = ""
      mainBlur.style.display = ""
    }
    widthSliderValueLabel.textContent = "%" + result.width
    widthSlider.value = result.width
    extendUserMessage.checked = result.extendUserMessage
    document
      .querySelector(`.alignment#${result.alignment}`)
      .classList.add("checked")
    includePromptBar.checked = result.includePromptBar
    promptBarHeight.value = result.promptBarHeight
  }

  chrome.storage.local.get(
    {
      isActive : defaultIsActive,
      width: defaultThicknessValue,
      extendUserMessage: defaultExtendUserMessageValue,
      alignment: defaultAlignmentValue,
      includePromptBar: defaultIncludePromptBarValue,
      promptBarHeight: defaultPromptBarHeightValue
    },
    initializeUI
  )

  Array.from(powerBtns).forEach((btn) => {
    btn.addEventListener("click", function () {
      if(btn.getAttribute("data-is-active") == "true"){
        document.querySelector('svg[data-is-active="true"]').style.display = "none"
        document.querySelector('svg[data-is-active="false"]').style.display = ""
        mainBlur.style.display = ""
        updateSetting("isActive", false)
      }else{
        document.querySelector('svg[data-is-active="true"]').style.display = ""
        document.querySelector('svg[data-is-active="false"]').style.display = "none"
        mainBlur.style.display = "none"
        updateSetting("isActive", true)
      }
    })
  })

  widthSlider.addEventListener("input", function () {
    const width = parseInt(widthSlider.value)
    widthSliderValueLabel.textContent = "%" + width
    updateSetting("width", width)
  })

  extendUserMessage.addEventListener("change", function () {
    updateSetting("extendUserMessage", extendUserMessage.checked)
  })

  Array.from(alignmentBtns).forEach((btn) => {
    btn.addEventListener("click", function () {
      Array.from(alignmentBtns).forEach((b) => b.classList.remove("checked"))
      btn.classList.add("checked")
      updateSetting("alignment", btn.id)
    })
  })

  includePromptBar.addEventListener("change", function () {
    updateSetting("includePromptBar", includePromptBar.checked)
  })

  promptBarHeight.addEventListener("change", function () {
    updateSetting("promptBarHeight", promptBarHeight.value)
  })

  resetBtn.addEventListener("click", function () {
    initializeUI({
      isActive : defaultIsActive,
      width: defaultThicknessValue,
      extendUserMessage: defaultExtendUserMessageValue,
      alignment: defaultAlignmentValue,
      includePromptBar: defaultIncludePromptBarValue,
      promptBarHeight: defaultPromptBarHeightValue
    })
    updateSetting("isActive", defaultIsActive)
    updateSetting("width", defaultThicknessValue)
    updateSetting("extendUserMessage", defaultExtendUserMessageValue)
    updateSetting("alignment", defaultAlignmentValue)
    updateSetting("includePromptBar", defaultIncludePromptBarValue)
    updateSetting("promptBarHeight", defaultPromptBarHeightValue)
  })
})
