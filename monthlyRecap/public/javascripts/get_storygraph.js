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
        });
        console.log(response)

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const data = await response.json();
    }
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const someDiv = document.getElementById('tsg_book_data_success');
    if (someDiv) {
        handleSomeDiv(someDiv);
        mutationInstance.disconnect();
    }
});


observer.observe(document, {
    childList: true,
    subtree:   true
});


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