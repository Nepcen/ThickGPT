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

console.log(`JBB5    7BBJ   JBBBBBBBBB   GBBBBBBBP?        JG###B5!     JBBBBBBBBB   JBB5    7BBJ
5@@@B!  J@@5   5@@GJJJJJJ   &@@YYYYP@@B     J&@#5JJG@@G    5@@GJJJJJJ   5@@@B!  J@@5
5@@&@@J J@@5   5@@5         &@&     #@@!   ?@@B     5##7   5@@5         5@@&@@J J@@5
5@@YJ@@5Y@@5   5@@&####&P   &@@####&@&Y    5@@!            5@@&####&P   5@@YJ@@5Y@@5
5@@J 7#@@@@5   5@@J         &@&J????!      7@@B     5@@5   5@@J         5@@J 7#@@@@5
5@@Y   G@@@5   5@@B55555P   &@&             ?#@&PY5B@@G    5@@B55555P   5@@Y   G@@@5
?GG7    YPG?   ?GPGGGGGGG   PP5               75GBBGY!     ?GPGGGGGGG   ?GG7    YPG?`)

console.log("ThickGPT is working")

const defaultThicknessValue = 90
const defaultExtendUserMessageValue = false
const defaultAlignmentValue = "center"
const defaultIncludePromptBarValue = false
const defaultPromptBarHeightValue = 0

function refreshElements() {
  chrome.storage.local.get(
    {
      width: defaultThicknessValue,
      extendUserMessage: defaultExtendUserMessageValue,
      alignment: defaultAlignmentValue,
      includePromptBar: defaultIncludePromptBarValue,
      promptBarHeight: defaultPromptBarHeightValue
    },
    function (result) {
      var width = result.width
      var extMsgBox = result.extendUserMessage
      var alignment = result.alignment
      var includePromptBar = result.includePromptBar

      var elements = document.querySelectorAll("div[data-message-author-role]")

      if (elements?.length) {
        Array.from(elements).forEach((e) => {
          var element = e.parentNode.parentNode.parentNode.parentNode
          if (
            element.className !=
            "flex gap-4 text-base md:gap-6 md:py-6 group ThickGPT"
          ) {
            element.className =
              "flex gap-4 text-base md:gap-6 md:py-6 group ThickGPT"
            element.style.paddingRight = "35px"
            element.style.paddingLeft = "10px"
          }
          element.style.width = width + "%"

          if (e.getAttribute("data-message-author-role") == "user") {
            if (extMsgBox) {
              var msgBox = e?.getElementsByClassName("max-w-[70%]")[0]
              if (msgBox) {
                msgBox.className =
                  "relative rounded-3xl bg-[#f4f4f4] px-5 py-2.5 dark:bg-token-main-surface-secondary ThickGPT"
                msgBox.style.maxWidth = "calc(100% - 48px)"
              }
            } else {
              e.getElementsByTagName("div")[1].className =
                "relative max-w-[70%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5 dark:bg-token-main-surface-secondary ThickGPT"
                e.getElementsByTagName("div")[1].style.maxWidth = ""
            }
          }
          element.parentNode.style.display = "flex"
          element.parentNode.style.justifyContent = alignment
        })

        const promptBar = document.querySelector("main form")
        const promptBarParent = promptBar?.parentNode
        const insidePromptBar = document.querySelector("main form > div")

        if (includePromptBar == true && promptBar && promptBarParent) {
          promptBarParent.className =
            "mx-auto w-full flex flex-1 gap-3 text-base juice:gap-4 juice:md:gap-6 ThickGPT"
          promptBar.className =
            "stretch flex flex-row gap-3 last:mb-2 md:last:mb-6 ThickGPT"
          promptBar.style.width = "100%"
          promptBar.style.justifyContent = alignment

          insidePromptBar.className =
            "relative flex h-full items-stretch md:flex-col ThickGPT"
          insidePromptBar.style.width = width + "%"
          insidePromptBar.style.marginLeft = "8px"
          insidePromptBar.style.marginRight = "8px"
        } else if (includePromptBar == false && promptBar && promptBarParent) {
          promptBarParent.className =
            "mx-auto w-full flex flex-1 gap-3 text-base juice:gap-4 juice:md:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]"
          promptBar.style.width = ""
          promptBar.style.justifyContent = ""
          promptBar.className = "w-full flex items-center ThickGPT"

          insidePromptBar.style.width = ""
          insidePromptBar.style.marginLeft = ""
          insidePromptBar.style.marginRight = ""
          insidePromptBar.className =
            "relative flex max-w-full flex-1 flex-col ThickGPT"
        }

        
        const promptBarHeightLib = ["200px", "45vh", "80vh"]
        const textareaParent = promptBar.querySelector("textarea").parentNode
        textareaParent.className = "_prosemirror-parent_cy42l_1 text-token-text-primary overflow-auto default-browser"
        textareaParent.style.maxHeight = promptBarHeightLib[result.promptBarHeight ] 
        promptBarParent.style.maxHeight = promptBarHeightLib[result.promptBarHeight ] 
      }
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
