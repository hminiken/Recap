

console.log("Loaded page");
document.getElementById("get_storygraph").addEventListener('click', async () => {
    console.log("Click!");
    const year = document.getElementById('yearDropdown').value;
    const month = document.getElementById('monthDropdown').value;

    // Check if year and month are selected
    if (!year || !month) {
        document.getElementById('result').textContent = 'Please select both year and month.';
        return;
    }

    setTimeout(3000);
    
    // do {
    // book_data =  document.getElementById("storygraph_return_content").textContent;
    // console.log("Book_data: " + book_data);
    // } while (book_data === "")


});


function handleSomeDiv(someDiv) { 
    console.log("div was handled");
    console.log(someDiv.textContent);
    read_books = someDiv.textContent
    if (read_books != "" ) {
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
        })
        .catch(error => console.error('Error:', error));



        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const data = await response.json();
    }
}

// const observer = new MutationObserver(function (mutations, mutationInstance) {
//     const someDiv = document.getElementById('tsg_book_data_success');
//     if (someDiv) {
//         handleSomeDiv(someDiv);
//         mutationInstance.disconnect();
//     }
// });


// observer.observe(document, {
//     childList: true,
//     subtree:   true
// });


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
    const month = document.getElementById('monthDropdown').value;

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
        // document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        console.log(data);
    } catch (error) {
        // document.getElementById('result').textContent = `Error: ${error.message}`;
        console.log(error)
    }
});

// function download(canvas, filename) {
//     const data = canvas.toDataURL("image/png;base64");
//     const donwloadLink = document.querySelector("#download");
//     donwloadLink.download = filename;
//     donwloadLink.href = data;
//   }
  function download(url){
    var a = $("<a style='display:none' id='js-downloder'>")
    .attr("href", url)
    .attr("download", "test.png")
    .appendTo("body");
  
    a[0].click();
  
    a.remove();
  }
document.getElementById('save_image').addEventListener('click', async () => {
    console.log("Get Image");
    div = document.getElementById("books-list");
    // try {
    //     const response = await fetch('/screenshot');
    //     if (response.ok) {
    //         console.log("OK")
    //       const blob = await response.blob();
    //       const url = window.URL.createObjectURL(blob);
    //       const a = document.createElement('a');
    //       a.style.display = 'none';
    //       a.href = url;
    //       a.download = 'main-content.png';
    //       document.body.appendChild(a);
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //     } else {
    //       console.error('Failed to fetch screenshot');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }

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



        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const data = await response.json();
    });

// html2canvas(div, {allowTaint : true,
//     useCORS: true}).then(canvas => {
//     // document.body.appendChild(canvas)
//     download(canvas.toDataURL("image/png"));
// });

// domtoimage.toPng(div, {allowTaint : true,
//     //     useCORS: true})
//     .then(function (dataUrl) {
//         var img = new Image();
//         img.src = dataUrl;
//         document.body.appendChild(img);
//     })
//     .catch(function (error) {
//         console.error('oops, something went wrong!', error);
//     });

      
// modernScreenshot.domToPng(div, {
//     fetch: {
//       // see https://developer.mozilla.org/en-US/docs/Web/API/fetch
//       requestInit: {
//         mode: 'cors',
//       }
//     }
//   }).then(dataURL => {
//     open().document.write(`<img src="${ dataURL }" />`)
//   })



// // var url = "https://app.thestorygraph.com/"
// get_read.addEventListener('click', async () => {
//     get_read.style.backgroundColor = "green";
//     // console.log(url)
//     // response = fetchNumReviews(url);
//     console.log("HEre")

//     // console.log(response);




//     const year = document.getElementById('yearDropdown').value;
//     const month = document.getElementById('monthDropdown').value;

//     console.log(year);
//     console.log(month);
    

//     console.log("Year" + year)
//     try {
//         const response = await fetch('/get-data', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ year, month })
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         document.getElementById('result').textContent = JSON.stringify(data, null, 2);
//     } catch (error) {
//         document.getElementById('result').textContent = `Error: ${error.message}`;
//     }

// })