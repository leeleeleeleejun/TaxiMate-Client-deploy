const reactNativePostMessage = (message: string) => {
  const isAndroid = /Android/.test(navigator.userAgent);
  const isiOS = /(iPhone|iPad|iPod)/.test(navigator.userAgent);
  if (isAndroid || isiOS) {
    window.ReactNativeWebView.postMessage(message);
  }
};

export default reactNativePostMessage;
