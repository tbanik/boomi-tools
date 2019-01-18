const process_tree_update = (xml) => {

    let root = xml.getElementsByTagName('Folders')[0];
    let connections = root.querySelectorAll('Category[name=Connections]');

    let parentFolders = [];
    connections.forEach(conn => {
        let folder = conn.closest('Folder');
        if(!parentFolders.includes(folder)) parentFolders.push(folder)
    })

    if(parentFolders.length > 1){
        //connection parent folder mismatch

        parentFolders = parentFolders.map(folder => `<li>${folder.attributes.name.value}</li>`).join('')

        let alert_html = `
        <div class="BoomiToolsOverlay" style="position:fixed;z-index:9999;display:grid;place-items:center;min-height:100vh;min-width:100vw;background: rgba(0,0,0,0.25);">
            <div class="alert_label_content error_label_content" style="max-height: 600px; max-width: 600px; overflow: auto; padding: 10px; border-radius:4px; box-shadow:0 0 20px 0 rgba(0,0,0,0.25)">
                <span class="alert_icon" style="padding-top:0;vertical-align: middle;"><img style="width:24px; height:24px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8ZGVmcz48c3R5bGU+LmQge2ZpbGw6I2ZmZmZmZn08L3N0eWxlPjwvZGVmcz4KPHBhdGggY2xhc3M9ImQiIGQ9Ik04LjksMS42bDYuNCwxMS44YzAuMiwwLjMsMC4yLDAuNywwLDFjLTAuMSwwLjItMC4yLDAuMy0wLjQsMC40Yy0wLjIsMC4xLTAuMywwLjEtMC41LDAuMUgxLjZjLTAuMiwwLTAuNC0wLjEtMC41LTAuMQoJYy0wLjItMC4xLTAuMy0wLjItMC40LTAuNGMtMC4yLTAuMy0wLjItMC43LDAtMUw3LjEsMS42YzAuMS0wLjIsMC4yLTAuMywwLjQtMC40UzcuOCwxLDgsMXMwLjQsMCwwLjUsMC4xQzguNywxLjMsOC44LDEuNCw4LjksMS42egoJIE05LDkuNGwwLjEtMy44YzAtMC4xLDAtMC4xLTAuMS0wLjJDOS4xLDUuNCw5LDUuMyw4LjksNS4zSDcuMWMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAtMC4xLDAuMS0wLjEsMC4ybDAuMSwzLjgKCWMwLDAuMSwwLDAuMSwwLjEsMC4xYzAuMSwwLDAuMSwwLjEsMC4yLDBoMS41YzAuMSwwLDAuMSwwLDAuMiwwQzksOS41LDksOS41LDksOS40eiBNOS4xLDEyLjV2LTEuNmMwLTAuMSwwLTAuMS0wLjEtMC4yCgljLTAuMS0wLjEtMC4xLTAuMS0wLjItMC4xSDcuMmMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAuMS0wLjEsMC4xLTAuMSwwLjJ2MS42YzAsMC4xLDAsMC4xLDAuMSwwLjJjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjFoMS42CgljMC4xLDAsMC4xLDAsMC4yLTAuMUM5LDEyLjcsOS4xLDEyLjYsOS4xLDEyLjV6Ii8+Cjwvc3ZnPgo=" alt="Warning"></span>
                <div class="alert_text">
                    <b>BoomiTools:</b> Found Connections in multiple folders! Best practice is to keep ALL Connections in the same parent folder.
                    <br>
                    <br>
                    Folders with 1 or more Connections:<br>
                    ${parentFolders}
                </div>
                <span class="alert_dismiss">
                    <a class="gwt-Anchor" data-locator="link-cancel" href="javascript:document.querySelector('.BoomiToolsOverlay').remove();">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" style="width: 12px; height: 12px;"><title>Cancel</title><path class="svg-foreground" d="M14.284,12.546c0.348,0.348,0.521,0.764,0.521,1.246s-0.174,0.888-0.521,1.216c-0.348,0.328-0.763,0.493-1.245,0.493 c-0.483,0-0.898-0.155-1.245-0.463l-3.822-4.402l-3.822,4.402C3.801,15.345,3.386,15.5,2.904,15.5c-0.483,0-0.898-0.155-1.245-0.463 c-0.309-0.348-0.463-0.763-0.463-1.245s0.154-0.898,0.463-1.246l3.996-4.517L1.659,3.453C1.35,3.106,1.195,2.692,1.195,2.208 c0-0.482,0.154-0.898,0.463-1.245C2.006,0.655,2.421,0.5,2.904,0.5c0.482,0,0.898,0.155,1.245,0.463l3.822,4.401l3.822-4.401 C12.141,0.655,12.556,0.5,13.039,0.5c0.482,0,0.897,0.164,1.245,0.493s0.521,0.734,0.521,1.216c0,0.483-0.174,0.898-0.521,1.245 l-3.996,4.576L14.284,12.546z"></path></svg>
                    </a>
                </span>
            </div>
        </div>`

        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)

    }
}

let currentColor = 0;
let windowMouseMover = false;
let dragObj = null;
const create_note_group = (el) => {

    let noteForm = el.closest('.note-form');
    
    try {
        if(!noteForm){
            var node = el.closest('.note-preview').parentElement.parentElement;
            noteForm = [...el.closest('.gwt-ProcessPanel').querySelectorAll(':not([data-notegroup]')].reverse().find(child => {
                try {
                    if(parseInt(child.style.top) == parseInt(node.style.top) && parseInt(child.style.left) == parseInt(node.style.left) && child.querySelector('.note-form')) return true;
                } catch (error) {}
            }).querySelector('.note-form');
            node = noteForm.parentElement;
        }else{
            var node = noteForm.parentElement;
        }
    } catch (error) {
        return false
    }
    

    let nodeParent = noteForm.closest('.gwt-ProcessPanel');

    let colors = {
        'blue'  : '0  , 100 , 255',
        'red'   : '255, 0   , 50',
        'green' : '0  , 255 , 100',
        'purple': '100, 50  , 200',
        'orange': '230, 130 , 30'
    }

    if(!node.hasAttribute('data-notegroup')){
        noteForm.querySelector('.NoteGroupButton').innerText = "Resize";
        
        setTimeout(()=>{

            let matched_node = [...nodeParent.querySelectorAll(':not([data-notegroup]')].reverse().find(child => {
                try {
                    if(parseInt(child.style.top) == parseInt(node.style.top) && parseInt(child.style.left) == parseInt(node.style.left) && child.querySelector('.note-content')) return true;
                } catch (error) {}
            })
    
            let matched_icon = [...nodeParent.querySelectorAll(':not([data-notegroup]')].reverse().find(child => {
                try {
                    if(parseInt(child.style.top) == parseInt(node.style.top)-23 && parseInt(child.style.left) == parseInt(node.style.left) && child.querySelector('.gwt-Image')) return true;
                } catch (error) {}
            })

        
            let group_id = [...Array(8)].map(i=>(~~(Math.random()*10))).join('');

            let color_use = Object.keys(colors)[currentColor];

            let notegroup_html = `
            <div class="BoomiToolsNoteGroup" data-notegroup="${group_id}" style="position:absolute;z-index:0;top:${matched_icon.style.top};left:${matched_icon.style.left};width:60px;height:40px;background:rgba(${colors[color_use]},0.1);border:1px solid rgba(${colors[color_use]},0.5);border-radius:2px;">
                <div class="NoteResize" style="display:none;position:absolute;bottom:0;right:0;width:10px;height:10px;cursor:nwse-resize;background: linear-gradient(-45deg,rgba(0,0,0,0.5) 10%, transparent 10%,transparent 20%, rgba(0,0,0,0.5) 20%,rgba(0,0,0,0.5) 30%, transparent 30%,transparent 40%, rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.5) 50%, transparent 50%);"></div>
            </div>
            `

            let selectgroup_html = `
            <div tabindex="0" class="gwt-IconButton floatLeft buttonSpacer" role="button" title="Select Group" onclick="select_group(this)">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEVHcEwAU5xCQkIAU5zB5tVZAAAAAnRSTlMA8MsuPyQAAAAySURBVAjXY2CAA61Vq1YwKDAwcGAQPEBCq59rBQMD/wGgQv4PIOIPiPgPIkCaWaCGAABP2Qhg63w3vwAAAABJRU5ErkJggg==" width="16" height="16" class="gwt-Image">
            </div>
            `

            matched_node.insertAdjacentHTML('afterend', notegroup_html);
            matched_node.setAttribute('data-notegroup', group_id);
            matched_node.querySelector('.note-content').style.whiteSpace = 'pre';
            matched_node.classList.add('note-hover');
            matched_node.querySelector('.note-preview-buttons').insertAdjacentHTML('beforeend', selectgroup_html);
            
            node.setAttribute('data-notegroup', group_id);
            node.classList.add('note-editor');

            matched_icon.style.zIndex = '999';
            matched_icon.setAttribute('data-notegroup', group_id);
            matched_icon.classList.add('note-icon');

            
            let note_group = document.querySelector(`.BoomiToolsNoteGroup[data-notegroup="${group_id}"]`);
            
            function rerender_note(){
                let match = /\n{0,2}---\n\#BoomiTools: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.exec(noteForm.querySelector('textarea').value)
                
                note_group.style.background = `rgba(${colors[match[3]]},0.1)`;
                note_group.style.border = `1px solid rgba(${colors[match[3]]},0.5)`;
                note_group.style.width = match[1];
                note_group.style.height = match[2];
            }
            
            if(!/\n{0,2}---\n\#BoomiTools: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.test(noteForm.querySelector('textarea').value)){
                noteForm.querySelector('textarea').value += `\n\n---\n#BoomiTools: ["60px","40px","${color_use}"]`
            }else{
                rerender_note()
            }

            matched_icon.addEventListener('mouseup',function(){
                note_group.style.top = matched_icon.style.top;
                note_group.style.left = matched_icon.style.left;
            }, false);

            note_group.querySelector('.NoteResize').addEventListener('mousedown',function(e){
                dragObj = {
                    el: note_group,
                    x: e.pageX,
                    y: e.pageY,
                    w: parseInt(note_group.style.width),
                    h: parseInt(note_group.style.height)
                };
            }, false);

            let check_if_note_exists = setInterval(()=>{
                if(!nodeParent.querySelector(`.note-icon[data-notegroup="${group_id}"]`)){
                    clearInterval(check_if_note_exists)
                    nodeParent.querySelector(`.BoomiToolsNoteGroup[data-notegroup="${group_id}"]`).remove()
                }
            },1000)

            if(!windowMouseMover){
                windowMouseMover = true;

                window.addEventListener('mouseup',function(){
                    if(dragObj){

                        let form_to_use = dragObj.el.closest('.gwt-ProcessPanel').querySelector(`.note-editor[data-notegroup="${dragObj.el.getAttribute('data-notegroup')}"]`)
                        let match = /\n{0,2}---\n\#BoomiTools: \[.*(\"[a-z]*\")\]/g.exec(form_to_use.querySelector('textarea').value)
                        form_to_use.querySelector('textarea').value = form_to_use.querySelector('textarea').value.replace(/\n{0,2}---\n\#BoomiTools: \[.*\]/g,`\n\n---\n#BoomiTools: ["${dragObj.el.style.width}","${dragObj.el.style.height}",${match[1]}]`)

                        dragObj.el.querySelector('.NoteResize').style.display = 'none';
                        form_to_use.style.display = 'block';

                        dragObj = null;
                    }
                }, false);

                window.addEventListener('mousemove',function(e){
                    let x = e.pageX, y = e.pageY;
                
                    if(dragObj == null) return;


                    try {
                        document.querySelector('.multiSelectPanel').style.cssText = 'display:none;top:0;left:0:width:0;height:0;';
                    } catch (error) {}

                    dragObj.el.style.width = Math.max(60,dragObj.w + ((dragObj.x - x)*-1)) + 'px';
                    dragObj.el.style.height = Math.max(40,dragObj.h + ((dragObj.y - y)*-1)) + 'px';

                });
            }
    
            currentColor++
            if(currentColor >= Object.values(colors).length) currentColor = 0;

            noteForm.querySelector('button[data-locator="button-save"]').addEventListener('mouseup', rerender_note, false);
    
        },10)

    }else{

        setTimeout(()=>{

            let note_group = document.querySelector(`.BoomiToolsNoteGroup[data-notegroup="${node.getAttribute('data-notegroup')}"]`);
            note_group.querySelector('.NoteResize').style.display = 'block';
            node.style.display = 'none';

        },10)

    }


}

const render_note_groups = () => {

    let notes_to_render = [...document.querySelectorAll('.note-content')].filter(note => note.innerText.includes('#BoomiTools:') && !note.closest('.gwt-ProcessPanel').classList.contains('BT-notes-rendered'));
    if(!notes_to_render.length) return setTimeout(render_note_groups, 250) //wait for nodes to render

    setTimeout(()=>{
        notes_to_render.forEach(note => {create_note_group(note)})
        notes_to_render[0].closest('.gwt-ProcessPanel').classList.add('BT-notes-rendered')
    },10)

}

const select_group = (group) => {

    let node = group.closest('[data-notegroup]');
    let notegroup = group.closest(`.gwt-ProcessPanel`).querySelector(`.BoomiToolsNoteGroup[data-notegroup="${node.getAttribute('data-notegroup')}"]`);

    var rect = notegroup.getBoundingClientRect();

    var down = new MouseEvent('mousedown', {
        "clientX": rect.x,
        "clientY": rect.y
    });

    var move = new MouseEvent('mousemove', {
        "clientX": rect.x+rect.width,
        "clientY": rect.y+rect.height
    });

    var up = new MouseEvent('mouseup', {
        "clientX": rect.x+rect.width,
        "clientY": rect.y+rect.height
    });

    notegroup.closest('.gwt-ProcessPanel').dispatchEvent(down)
    notegroup.closest('.gwt-ProcessPanel').dispatchEvent(move)
    notegroup.closest('.gwt-ProcessPanel').dispatchEvent(up)

}

let quick_component_listener = false;
const quick_component_select = (panel) => {

    panel.addEventListener('dblclick', function(e){

        if(document.querySelector('.copy_paste_panel').classList.contains('no_display')){
            if(e.target == panel.firstChild){

                let org_event = e;

                [...document.querySelectorAll('.BoomiToolsQuickComponent')].forEach(item=>item.remove())

                let shapes_list = [...document.querySelectorAll('.shape_palette_results .shape_palette_widget_container')].map(shape => `<option>${shape.querySelector('.gwt-Label').innerText}</option>`)

                let quickinput_html = `
                    <div class="BoomiToolsQuickComponent" style="position:absolute;top:${e.clientY}px;left:${e.clientX}px;">
                        <form>
                            <input type="text" list="shapes_list" tabindex="-1" placeholder="Component name...">

                            <datalist id="shapes_list">
                                ${shapes_list}
                            </datalist>
                        </form>
                    </div>
                `

                document.querySelector('body').insertAdjacentHTML('beforeend', quickinput_html);
                
                setTimeout(()=>{
                    document.querySelector('.BoomiToolsQuickComponent input').focus()

                    document.querySelector('.BoomiToolsQuickComponent input').addEventListener('change', function(e){
                        document.querySelector('filter_search_input')
                    });

                    document.querySelector('.BoomiToolsQuickComponent form').addEventListener('submit', function(e){
                        e.preventDefault();
                        
                        let first = [...document.querySelectorAll('.shape_palette_results .shape_palette_widget_container')].find(shape => shape.querySelector('.gwt-Label').innerText.toLowerCase() == document.querySelector('.BoomiToolsQuickComponent input').value.toLowerCase());

                        if(!first) return false;

                        var down = new MouseEvent('mousedown');

                        var up = new MouseEvent('mouseup',{
                            "clientX": org_event.clientX,
                            "clientY": org_event.clientY
                        });

                        first.dispatchEvent(down)
                        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

                        setTimeout(()=>{
                            [...document.querySelectorAll('.BoomiToolsQuickComponent')].forEach(item=>item.remove())
                        },0)
                    });
                },0)

            }
        }

    });

    panel.addEventListener('mouseup', function(e){
        if(e.target != document.querySelector('.BoomiToolsQuickComponent')){
            [...document.querySelectorAll('.BoomiToolsQuickComponent')].forEach(item=>item.remove())
        }
    });



}

const BoomiTools_Init = () => {

    const get_XML_responses = (()=>{
        let oldXHROpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function () {
            this.addEventListener('load', function () {
                if (this.responseText.includes('//OK[') && this.responseText.includes('xml')) {
                    try {
                        let parsedRes = eval(`(${this.responseText.replace('//OK','')})`);
                        if (!Array.isArray(parsedRes)) return false;
                        parsedRes = parsedRes.flat();
                        
                        let parser = new DOMParser();
                        parsedRes.forEach(element => {
                            if (!element.toString().includes('xml')) return false;
                            var dom = parser.parseFromString(`${element}`, 'text/xml');

                            if (dom.getElementsByTagName('Folders').length) process_tree_update(dom)
                            // else console.log(dom);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                if(this.responseText.includes('#BoomiTools:')){
                    render_note_groups()
                }
            });

            return oldXHROpen.apply(this, arguments);
        }
    })()

    const note_watcher = (()=>{
        document.addEventListener('DOMNodeInserted', function (e) {
            try {
                let noteForm = e.target.querySelector('.note-form');
                if(!noteForm) return false;

                notegroupbutton_html = `
                <button type="button" class="NoteGroupButton" onclick="create_note_group(this)">Group</button>
                `
                noteForm.querySelector('.button_row').insertAdjacentHTML('beforeend', notegroupbutton_html);

                if(/\n{0,2}---\n\#BoomiTools: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.test(noteForm.querySelector('textarea').value)){
                    setTimeout(()=>{
                        create_note_group(noteForm)
                    },100)
                }

            } catch (error) {}
        }, false);
    })()

    const process_flow_load = setInterval(()=>{

        let process_panels = document.querySelectorAll('.gwt-ProcessPanel:not(.bt-load-done)');

        if(process_panels.length){
            [...process_panels].forEach(panel => {

                panel.classList.add('bt-load-done')

                quick_component_select(panel);

            })
        }

    },1000)
    
    const insert_global_css = (()=>{

        document.querySelector('body').insertAdjacentHTML('afterbegin', `
        
        <style>
        
            .greenGlow{
                background: rgba(107, 193, 6, 0.65) !important;
                border-radius: 50%;
                padding: 1px;
                box-shadow: 0 0 0 2px rgba(107, 193, 6, 1);
            }

            .redGlow{
                background: rgba(255, 66, 34, 0.65) !important;
                border-radius: 50%;
                padding: 1px;
                box-shadow: 0 0 0 0 rgba(255, 66, 34, 1);
                animation: redPulse 1s linear infinite;
            }

            @keyframes redPulse {
                from {box-shadow: 0 0 0 0 rgba(255, 66, 34, 1);}
                to {box-shadow: 0 0 0 10px rgba(255, 66, 34, 0.0);}
            }

            .yellowGlow{
                background: rgba(255, 235, 59, 0.65) !important;
                border-radius: 50%;
                padding: 1px;
                box-shadow: 0 0 0 0 rgba(255, 235, 59, 1);
                animation: yellowPulse 1s linear infinite;
            }

            @keyframes yellowPulse {
                from {box-shadow: 0 0 0 0 rgba(255, 235, 59, 1);}
                to {box-shadow: 0 0 0 10px rgba(255, 235, 59, 0.0);}
            }

            .yellowGlow img:not([title]){
                display:none;
            }

            .gwt-TestFocused{
                border:none;
            }

            .gwt-TestFocused::after{
                content:'';
                position:absolute;
                width:100%;
                height:100%;
                top:-2px;left:-2px;
                display:block;
                border-radius: 50%;
                transform: scale(1.2);
                border: 2px dotted black;
                animation: selectionrotate 1s steps(10, end) infinite reverse;
            }

            @keyframes selectionrotate {
                from {transform: scale(1.2) rotate(0deg);}
                to {transform: scale(1.2) rotate(360deg);}
            }
        
        </style>

        `);

    })()

}

BoomiTools_Init()
