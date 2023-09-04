/**
 * Aquire user agent
 * @returns User Agent
 */
export function getUA() {
  return navigator.userAgent
}

/**
 * Aquire browser information
 * @returns Browser type and version
 */
export function getBrowser() {
  const check360 = function() {
    var result = false
    for (var mt in navigator.mimeTypes) {
      //检测是否是360浏览器(测试只有pc端的360才起作用)
      if (navigator.mimeTypes[mt]["type"] === "application/360softmgrplugin") {
        return !result
      }
    }
    return result
  }

  const browser = (() => {
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("opera") > -1 || userAgent.indexOf("opr") > -1) {
      return {
        browser: "Opera",
        browser_version: userAgent.match(/ope?ra?\/([\d.]+)/)?.[1],
      }
    } else if (
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("msie") > -1
    ) {
      return {
        browser: "IE",
        browser_version:
          userAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)?.[2] || "IE",
      }
    } else if (userAgent.indexOf("edg") > -1) {
      return {
        browser: "Edge",
        browser_version: userAgent.match(/edge?\/([\d.]+)/)?.[1],
      }
    } else if (userAgent.indexOf("firefox") > -1) {
      return {
        browser: "Firefox",
        browser_version: userAgent.match(/firefox\/([\d.]+)/)?.[1],
      }
    } else if (check360() && userAgent.indexOf("safari") > -1) {
      return {
        browser: "360",
        browser_version: "Chromium browser",
      }
    } else if (userAgent.includes("2345explorer")) {
      return {
        browser: "2345",
        browser_version:
          userAgent.match(/2345explorer\/([\d.]+)/)?.[1] || "Chromium browser",
      };
    } else if (userAgent.indexOf("bidubrowser") > -1) {
      return {
        browser: "Baidu",
        browser_version:
          userAgent.match(/bidubrowser\/([\d.]+)/)?.[1] || "Chromium browser",
      }
    } else if (userAgent.indexOf("se 2.x") > -1) {
      return { browser: "Sougou", browser_version: "Chromium browser" };
    } else if (
      userAgent.indexOf("safari") > -1 &&
      userAgent.indexOf("chrome") === -1
    ) {
      return {
        browser: "Safari",
        browser_version: userAgent.match(/version\/([\d.]+)/)?.[1],
      }
    } else if (/qqbrowser/.test(userAgent)) {
      return {
        browser: "QQ",
        browser_version: userAgent.match(/qqbrowser\/([\d.]+)/)?.[1],
      }
    } else if (/micromessenger/i.test(userAgent)) {
      return {
        browser: "WeChat",
        browser_version: userAgent.match(/micromessenger\/([\d.]+)/)?.[1],
      };
    } else if (
      userAgent.indexOf("chrome") > -1 &&
      userAgent.indexOf("safari") > -1
    ) {
      return {
        browser: "Chrome",
        browser_version: userAgent.match(/chrome\/([\d.]+)/)?.[1],
      }
    } else {
      return {
        browser: "Unknown",
        browser_version: undefined,
      };
    }
  })()
  getBrowser = () => browser
  return browser
}

/**
 * Aquire os information
 * @returns os information
 */
export function getOS() {
  return (navigator.userAgent.match(/[(](.*?)[)]/)?.[0] || '').replace(/[()]/g, "")
}

/**
 * Aquire device ratio
 * @returns device ratio
 */
export function getRatio() {
  let ratio = 0;
  let screen = window.screen;
  let ua = navigator.userAgent.toLowerCase()
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf("msie")) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth;
  }
  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
}

/**
 * Aquire screen information
 * @returns screen information
 */
export function getScreen() {
  return {
    width: window.screen.width,
    height: window.screen.height,
  }
}