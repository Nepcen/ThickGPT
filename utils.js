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
/*  utils.js                                                                              */
/*                                                                                        */
/*  By: Nepcen yusufabacik@gmail.com                                                      */
/*  Created: 28/06/2023 14:18:22                                                          */
/*                                                                                        */
/******************************************************************************************/

export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}

export const defaultSliderWidthValue = 46;

