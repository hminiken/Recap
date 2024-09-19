
localStorage.clear()
// console.log("Loaded page");
// document.getElementById("get_storygraph").addEventListener('click', async () => {
//     console.log("Click!");
//     const year = document.getElementById('yearDropdown').value;
//     const month = document.getElementById('monthDropdown').value;
//     // Check if year and month are selected
//     if (!year || !month) {
//         document.getElementById('result').textContent = 'Please select both year and month.';
//         return;
//     }
//     setTimeout(3000);
// });

refreshCSS = () => { 
    let links = document.getElementsByTagName('link'); 
    for (let i = 0; i < links.length; i++) { 
        if (links[i].getAttribute('rel') == 'stylesheet') { 
            let href = links[i].getAttribute('href') 
                                    .split('?')[0]; 
              
            let newHref = href + '?version='  
                        + new Date().getMilliseconds(); 
              
            links[i].setAttribute('href', newHref); 
        } 
    } 
} 

function handleSomeDiv(someDiv) {
    console.log("div was handled");
    console.log(someDiv.textContent);
    read_books = someDiv.textContent
    if (read_books != "") {
        const response = fetch('/get-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ read_books })
        }).then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const booksList = doc.getElementById('books-list');
                document.getElementById('books-list').innerHTML = "";
                document.getElementById('books-list').innerHTML = booksList.innerHTML;
                reapplyStyles();
                refreshCSS()
            })
            .catch(error => console.error('Error:', error));
    }
}



// Function to start observing
function startObserving() {
    const observer = new MutationObserver(function (mutations, mutationInstance) {
        const someDiv = document.getElementById('tsg_book_data_success');
        if (someDiv) {
            handleSomeDiv(someDiv);
            mutationInstance.disconnect();

            // Wait for a while before reconnecting
            setTimeout(() => {
                console.log('Reconnecting observer...');
                startObserving(); // Restart observing
            }, 1000); // Wait for 1 second before reconnecting
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
}

// Initial call to start observing
startObserving();




document.getElementById('get_books').addEventListener('click', async () => {
    const year = document.getElementById('yearDropdown').value;
    const month = 1 // document.getElementById('monthDropdown').value;

    var checkedBoxes = document.querySelectorAll('input[name=monthCheckbox]:checked')
    checkedBoxes[0].value //=1, since first checkbox is january
    // Check if year and month are selected
    if (!year || !month) {
        document.getElementById('result').textContent = 'Please select both year and month.';
        return;
    }
    try {
        console.log(year)
        const response = await fetch('/get-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ year, month })
        });
        console.log(response)

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
});


// ===============================================================================================
//   Save the container as a png
document.getElementById('save_image').addEventListener('click', async () => {
    console.log("Get Image");
    div = document.getElementById("books-list");


    content = document.getElementById("image_container").outerHTML;
    const response = fetch('/send-content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        });
});


// ===============================================================================================
// Change the layout

// layout = document.getElementsByClassName("cards")[0]
// layout.style.setProperty('grid-template-columns', 'repeat(' + 2 + ', 1fr)')

function applyStyle(className, property, propValue) {
    elements =  document.getElementsByClassName(className);
    for( var i = 0; i < elements.length; i++) { 
        elements[i].style.setProperty(property, propValue)
    }
}



cards =  document.getElementsByClassName("card");
coverinput = document.getElementById('coverSize')
document.getElementById('coverSize').addEventListener('input', async () => {      
    applyStyle("cover_image", 'max-width', coverinput.value * 4 + '%')
    applyStyle("thumbnail", 'max-height', coverinput.value * 4 + '%')
    
});


fontSizeinput = document.getElementById('fontSize')
document.getElementById('fontSize').addEventListener('input', async () => {    
    applyStyle("card-text", 'font-size', fontSizeinput.value * 4 + '%')
});


titleinput = document.getElementById('titleSize')
document.getElementById('titleSize').addEventListener('input', async () => {   
    applyStyle("title", 'font-size', titleinput.value * 20 + '%')
});

subtitleinput = document.getElementById('subtitleSize')
document.getElementById('subtitleSize').addEventListener('input', async () => {   
    applyStyle("subtitle", 'font-size', subtitleinput.value * 10 + '%')
});


columnNuminput = document.getElementById('columnNumber')
document.getElementById('columnNumber').addEventListener('input', async () => {   
    applyStyle("cards", 'grid-template-columns', 'repeat(' + columnNuminput.value + ', 1fr)')  
});


// Storygraph and Goodreads Username Subtitle
showStorygraph = document.getElementById('storygraphUID');
storygraphSubtitle = document.getElementById('storygraphUsername');
showStorygraph.addEventListener('change', async () => { 
    checkSubtitle();
});

showGoodreads = document.getElementById('goodreadsUID');
goodreadsSubtitle = document.getElementById('goodreadsUsername');
showGoodreads.addEventListener('change', async () => { 
    checkSubtitle();
});

isStorygraphID = document.getElementById('isStorygraphID');
isStorygraphID.addEventListener('input', async () => { 
    storygraphSubtitle.children[1].innerText = isStorygraphID.value
});

isGoodreadsID = document.getElementById('isGoodreadsID');
isGoodreadsID.addEventListener('input', async () => { 
    goodreadsSubtitle.children[1].innerText = isGoodreadsID.value
});

function checkSubtitle() {
    if (showStorygraph.checked && showGoodreads.checked) {
        goodreadsSubtitle.style.setProperty('display', 'flex')
        storygraphSubtitle.style.setProperty('display', 'flex')
        goodreadsSubtitle.style.setProperty('justify-content', 'flex-start')
        storygraphSubtitle.style.setProperty('justify-content', 'flex-end')
    } else if (showStorygraph.checked) {
        goodreadsSubtitle.style.setProperty('display', 'none')
        storygraphSubtitle.style.setProperty('display', 'flex')
        storygraphSubtitle.style.setProperty('justify-content', 'center')
    } else if (showGoodreads.checked) {
        storygraphSubtitle.style.setProperty('display', 'none')
        goodreadsSubtitle.style.setProperty('display', 'flex')
        goodreadsSubtitle.style.setProperty('justify-content', 'center')
    } else {
        goodreadsSubtitle.style.setProperty('display', 'none')
        storygraphSubtitle.style.setProperty('display', 'none')
    }
}




// storygraphIDinput = document.getElementById('isStorygraphID')
// document.getElementById('isStorygraphID').addEventListener('input', async () => {    
//     applyStyle("cards", 'grid-template-columns', 'repeat(' + storygraphIDinput.value + ', 1fr)')  

//     elements =  document.getElementsByClassName("subtitle");
//     for( var i = 0; i < elements.length; i++) { 
//         elements[i].style.setProperty('grid-template-columns', 'repeat(' + storygraphIDinput.value + ', 1fr)')
//     }
// });


function reapplyStyles() {

    applyStyle("cover_image", 'max-width', coverinput.value * 4 + '%')
    applyStyle("thumbnail", 'max-height', coverinput.value * 4 + '%')
    applyStyle("card-text", 'font-size', fontSizeinput.value * 4 + '%')
    applyStyle("title", 'font-size', titleinput.value * 20 + '%')
    applyStyle("subtitle", 'font-size', subtitleinput.value * 10 + '%')
    applyStyle("cards", 'grid-template-columns', 'repeat(' + columnNuminput.value + ', 1fr)')  
}
