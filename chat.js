const chatContainer = document.querySelector(".body");
    const smartEndpoint = "https://nabalosserver.000webhostapp.com/your_php_file.php";
    const loadingIndicator = document.createElement("div");
    loadingIndicator.innerHTML="loading...";
    loadingIndicator.style="margin: 15px;";
    let newText=false;
    let susi;
    let conversation =[
        {
            "role": "system",
            "content": "You are an assistant answering student's questions for our scholarship website. The name of the school is Cebu Technological University, or CTU for short. It is the main campus. For the scholarship office, the team leader is Jane, and her contact can be found in the contacts page. If someone is asking anything relating to a specific program, please refer them to the specific person in charge. Here are the people in charge: Miss Shaina is in charge of TDP-TES and Student Labor, miss Grace is in charge of TES and Document Custodian, sir Grey is in charge of answering questions relating to Cebu City Scholarship Program, and sir Clint is in charge of answering questions about CHED-STUFAP and DOST and Non government scholarships. Their contact info can also be found in the contact page of the website, which can be found in the page of our same website as team.html. You may provide them the link <a href='team.html'> to bring them to that page. Moving on, if anyone asks how to apply for a scholarship please tell them that they should keep updated and look out at the facebook group page for any announcements that a scholarship program is going to accept new applicants. There are recently posted application openings. Here is the link https://www.facebook.com/groups/353855911379546. in your reply, format the link using an 'a' html tag to shorten the link's text.  your reply will be inserted in an html div. Please let the link open in a new tab. You can rename the link whatever you like. Also, the hours of opening for the office are Monday to Friday, 8am to 5pm. Now, if they want to visit the office, they can visit at Corner M.J. Cuenco Ave., and R. Palma St., Cebu City, Phillipines Admin Bldg. 2nd Floor (Scholarship Office). Anyways, Please greet the students with a welcome of maayong adlaw"
        },
        {
            "role": "user",
            "content": "Hello. I am a student wanting to inquire."    
        }
        ];

    window.addEventListener("message", reciveMessage)

    function reciveMessage(event){
        if(event.data==="#chatStartTrue"){
            sendMessage();
        }
        else{
            const userMessage= document.createElement("div")
            userMessage.textContent=event.data;
            userMessage.classList.add("userMessage");
            chatContainer.append(userMessage);
            newText=true;
            sendMessage(userMessage.textContent);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
    }

    async function getSusi(){
        const response = await fetch('https://give-401109.wm.r.appspot.com');
        const reply = await response.text();
        return reply;
        
    }

    async function startProcess(){
        susi = await getSusi();
        sendMessage();
    }

    function sendMessage(UserMessage){
        chatContainer.append(loadingIndicator);
        if(newText){
            let newMessage={
                "role": "user",
                "content": UserMessage
            };
            conversation.push(newMessage);
        } 

        message = {
        "model": "gpt-3.5-turbo",
        "messages": conversation       
        
        }
        
        console.log(conversation);
        console.log(JSON.stringify(message));
        console.log(JSON.parse(JSON.stringify(message)))

        fetch(smartEndpoint, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${susi}`
            },
            body: JSON.stringify(conversation)
        })
        .then((response)=> {return response.text()})
        .then((data)=>{
            loadingIndicator.remove();
            const botMessage = document.createElement("div");
            botMessage.innerHTML=data
            botMessage.classList.add("message");
            chatContainer.append(botMessage);

            let newBotMessage={
            "role": "assistant",
            "content": botMessage.innerHTML
            };
            conversation.push(newBotMessage);
            chatContainer.scrollTop=chatContainer.scrollHeight;
            console.log(conversation);
        })
        .catch((error)=>{
            loadingIndicator.remove();
            const errorMessage = document.createElement("div");
            errorMessage.style="margin: 15px;";
            errorMessage.innerHTML="Sorry. Unable to connect to server"
            chatContainer.append(errorMessage);
        })
    }
