document.addEventListener("DOMContentLoaded", function(){
const hamburger = document.querySelector(".hamburger");
const homeBackground = document.querySelector(".body");
const navMobile = document.querySelector(".navBar");
const dateDisplay = document.querySelector(".date");
const dropDownButton = document.querySelectorAll(".dropDownButton");
const rightArrow = document.querySelectorAll(".arrow");
const announcementDivBox = document.querySelector(".announcementContentBox");
const accessToken = "EAAXqFT6ABREBO2s3kUr7VBExyRviRDEYKfibSIET8hBkaISnNGvY0YFvbZClrNTSizLTeDwHZBlcDjoXsRJRqsS3gDpQ7gRruRjgZAJOrxcD0POolRDAg2zAZCJHuygAWHJtL9zWAwRfj5aD4gzjR9lD9QrF0qV7suOGbrv4ArYUDXJCTNlgGJSy";
const pageID="353855911379546";
const endPoint = `https://graph.facebook.com/v18.0/353855911379546/feed?limit=5&access_token=${accessToken}`;
let date = new Date();   
let updatesCollection=[];
let updateImages=["update3.jpg", "update4.jpg", "update7.jpg", "ctuScholarshipbg2.jpg", "ctuBuildingbg3.jpg", "ctuMainbg.jpeg","office2.jpg", "ctuGym.jpg"] ;


hamburger.addEventListener("click",(event)=>{
    hamburger.classList.toggle("active");
    navMobile.classList.toggle("active");
});

window.onload=function(){
    let hours = date.getHours();
    let min = date.getMinutes();
    let dayOfMonth = date.getDate();
    let year = date.getFullYear();
    let month;

    if((date.getMonth()+1)<10){
        month = checkMonth(`0${String(date.getMonth()+1)}`);
    }
    else{
        month = checkMonth(`${String(date.getMonth()+1)}`);
    }
    
    fetchPost(endPoint);
    dateDisplay.textContent=`As of ${month} ${dayOfMonth}, ${year}, here are our latest updates`;
    
    
    let i =0;  
    
    for(let i = 0; i<dropDownButton.length; i++){
        dropDownButton[i].addEventListener("click",(event) =>{
        dropDownButton[i].nextElementSibling.firstElementChild.classList.toggle("disappear");
        //dropDownButton[i].nextElementSibling.classList.toggle("disappear2");
        setTimeout(()=>dropDownButton[i].nextElementSibling.classList.toggle("disappear2"), 250);
        
        dropDownButton[i].classList.toggle("rotate");
    });
    dropDownButton[i].nextElementSibling.firstElementChild.classList.toggle("disappear");
    dropDownButton[i].nextElementSibling.classList.toggle("disappear2");
    
    dropDownButton[i].classList.toggle("rotate");
    };
    
}


function fetchPost(url){

    const loadingIndicator = document.createElement("div");
    loadingIndicator.innerHTML="loading...";
    announcementDivBox.append(loadingIndicator);

    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
     
        const posts =data.data;
        console.log(posts);
        const body5Box = document.querySelector(".body5Box");
        
        console.log(data);

        posts.forEach((post) => {
            const updateDiv=document.createElement("div");
            updateDiv.style="margin-bottom: 60px; border-bottom: 2px solid grey; padding-bottom: 15px;";
            //updateDiv.innerHTML= post.message;
            let postContent;
            if(post.message){
            
            postContent = post.message;
                
            function shortenURLs(text) {
                // Regular expression to match URLs
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                return text.replace(urlRegex, '<a href="$1" target="_blank">Link</a>');
            }
              
            // Function to remove all asterisks
            function removeAsterisks(text) {
                return text.replace(/\*/g, '');
            }
            //function to remove hastags
            function removeHashtag(text) {
                return text.replace(/\#/g, '');
            }
            // Split the content into paragraphs based on double line breaks
            const paragraphs = postContent.split(/\n\s*\n/);

            // Create a formatted HTML representation 
            let formattedContent = "";
            paragraphs.forEach((paragraph) => {
                // Check if the paragraph starts with an asterisk (*) to create a list
                if (paragraph.startsWith("*")) {
                    formattedContent += `<ul><li>${paragraph.substring(1)}</li></ul>`;
                } 
                else {
                    // If not a list, use <p> tags for paragraphs
                    formattedContent += `<p>${paragraph}</p>`;
                }
            });
            
            // Replace double asterisks (**) with empty string to remove them
            formattedContent = removeAsterisks(formattedContent);
            
            // Shorten URLs to text links
            formattedContent = shortenURLs(formattedContent);

            //Remove Hashtag
             formattedContent = removeHashtag(formattedContent);
            
            // Display the formatted content on your HTML page
            let pic = updateImages[Math.floor(Math.random()*updateImages.length)];
            updateDiv.innerHTML = `<p style="font-size: 13px;">${checkMonth(post.updated_time.slice(5,7))} ${post.updated_time.slice(8,10)}, ${post.updated_time.slice(0,4)}</p><img style="float: left; margin-right: 15px; height: 300px; width: 350px;" src="${pic}">${formattedContent}<br><br> <a target="_blank" href="https://facebook.com/groups/${pageID}/permalink/${post.id.substring(16,post.id.length)}">See This Announcement</a>`;
            
            updatesCollection.push(`<p style="font-size: 13px;">${checkMonth(post.updated_time.slice(5,7))} ${post.updated_time.slice(8,10)}, ${post.updated_time.slice(0,4)}</p><img style="float: left; margin-right: 15px; height: 300px; width: 350px;" src="${pic}"><p style="font-size: 15px;">${post.message} </p><br><br> <a target="_blank" href="https://facebook.com/groups/${pageID}/permalink/${post.id.substring(17,post.id.length)}">See This Announcement</a>`);
            announcementDivBox.append(updateDiv);
            loadingIndicator.remove();
            }
        });
        const nextPageButton = document.createElement("button");
        nextPageButton.innerHTML="Load More";
        nextPageButton.style="background: none; cursor: pointer; border: none;"
        announcementDivBox.append(nextPageButton);
        
        nextPageButton.addEventListener("click", ()=>{
        if(data.paging.next){
            fetchPost(data.paging.next);
            nextPageButton.remove();
        }
        });
    })
    .catch(()=>{
        loadingIndicator.innerHTML="Sorry. Unable to load";
    });
}

function checkMonth(number){
    switch(number){

        case "01": return "January";
        break;
        case "02": return "February";
        break;
        case "03": return "March";
        break;
        case "04": return "April";
        break;
        case "05": return "May";
        break;
        case "06": return "June";
        break;
        case "07": return "July";
        break;
        case "08": return "August";
        break;
        case "09": return "September";
        break;
        case "10": return "October";
        break;
        case "11": return "November";
        break;
        case "12": return "December";
        break;

    }
}

});
