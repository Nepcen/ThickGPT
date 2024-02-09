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

console.log("ThickGPT is working")

function refreshElements() {
  chrome.storage.local.get(
    {
      width: 46,
      includePromptBar: false,
      alignment: "center",
      promptBarHeight: 0,
    },
    function (result) {
      var width = result.width
      var includePromptBar = result.includePromptBar
      var alignment = result.alignment

      var elements = document.querySelectorAll(
        "main > div:nth-child(2) > div:first-child > div > div > div > div:not(.sticky) > div:not(.group) > div"
      )

      if (elements?.length) {
        Array.from(elements).forEach((element) => {
          if (
            element.className != "flex gap-4 text-base md:gap-6 md:py-6 group"
          ) {
            element.className = "flex gap-4 text-base md:gap-6 md:py-6 group"
            element.style.paddingRight = "35px"
            element.style.paddingLeft = "10px"

            var innerElement = element.querySelector("div:nth-child(2)")
            if (innerElement) innerElement.style.width = "100%"
          }
          element.style.width = width + "%"

          element.parentNode.style.display = "flex"
          element.parentNode.style.justifyContent = alignment
        })
      }

      const promptBar = document.querySelector("main form")
      const insidePromptBar = document.querySelector("main form > div")

      if (includePromptBar == true) {
        promptBar.className =
          "stretch flex flex-row gap-3 last:mb-2 md:last:mb-6"
        promptBar.style.width = "100%"
        promptBar.style.justifyContent = alignment

        insidePromptBar.className =
          "relative flex h-full items-stretch md:flex-col"
        insidePromptBar.style.width = width + "%"
        insidePromptBar.style.marginLeft = "8px"
        insidePromptBar.style.marginRight = "8px"
      } else if (includePromptBar == false) {
        promptBar.style.width = ""
        promptBar.style.justifyContent = ""
        promptBar.className =
          "stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"

        insidePromptBar.style.width = ""
        insidePromptBar.style.marginLeft = ""
        insidePromptBar.style.marginRight = ""
        insidePromptBar.className =
          "relative flex h-full flex-1 items-stretch md:flex-col"
      }

      const textarea = promptBar.querySelector("textarea")
      console.log(textarea, result.promptBarHeight)
      const promptBarHeightLib = ["200px", "45vh", "90vh"]
      textarea.style.maxHeight = promptBarHeightLib[result.promptBarHeight]
    }
  )
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.set(request)
  refreshElements()
})

const chatObserver = new MutationObserver((mutationsList, observer) => {
  refreshElements()
})

chatObserver.observe(document.body, { childList: true, subtree: true })

refreshElements()
