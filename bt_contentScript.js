const loadScript = (() => {
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', chrome.extension.getURL('bt_inPage.js'));
    body.appendChild(script);
})()

let wait_for_load = setInterval(()=>{

    if(document.querySelector('body').classList.length){
        clearInterval(wait_for_load)

        document.getElementById('footer_links').insertAdjacentHTML('afterbegin', `

            <li><a class="alternate_link" target="_blank" href="https://chrome.google.com/webstore/detail/boomi-tools/dmdcjdejggikfpfkgknpmcdbcdgalnoj/">BoomiTools v${chrome.runtime.getManifest().version} loaded</a></li>

        `);
    }

},250)