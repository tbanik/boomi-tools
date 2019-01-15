const loadScript = (()=>{
  let body = document.getElementsByTagName('body')[0];
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.extension.getURL('bt_inPage.js'));
  body.appendChild(script);
})()