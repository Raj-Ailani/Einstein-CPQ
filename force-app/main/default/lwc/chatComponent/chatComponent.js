import { LightningElement } from 'lwc';

export default class ChatComponent extends LightningElement {

    jsonString = '{"transcript":[{"timestamp":1680983134517, "owner":"GPT", "userName":"Einstein GPT", "message":"Hello, how can I help you today?"},{"timestamp":1680983222866, "owner":"otherUser", "userName":"Alex Garcia", "message":"Create a new Opportunity"},{"timestamp":1680983222900, "owner":"event", "message":"New Opportunity has been created"},{"timestamp":1680983302565, "owner":"user", "userName":"Jeet Bhardiya", "message":"Great"}]}';

    // messageAssistant = "Hello, how can I help you today?";
    // messageUser = "Create a new Opportunity";
    // eventMessage = "New Opportunity has been created";
    // userName = "Jeet Bhardiya";
    // otherUserName = "Alex Garcia";
    loadedFirstTime = false;



    // userOrOther = 0;
    renderedCallback(){
        if(this.loadedFirstTime == false){
            console.log("Button Works");

            const jsonArray = JSON.parse(this.jsonString).transcript;

            for(var i = 0; i < jsonArray.length; i++){ 
                var entity = jsonArray[i];

                console.log(entity.owner);

                if(entity.owner == 'GPT'){
                    this.createAssistantElements(entity.message,entity.timestamp);
                }
                else if(entity.owner == 'otherUser'){
                    this.createUserElements(entity.message,1,entity.userName,entity.timestamp);
                }
                else if(entity.owner == 'user'){
                    this.createUserElements(entity.message,0,entity.userName,entity.timestamp);
                }
                else if(entity.owner == 'event'){
                    this.createEventElements(entity.message);
                }
            }
            this.loadedFirstTime = true;
        }
    }

    
    handleClick(event) {
        console.log("Click");
        var input = this.template.querySelector(".input");
        var inputValue = input.value.replace(/\s+/g, ' ').trim();
        console.log(inputValue);
        this.createUserElements(input.value, 0, "Jeet Bhardiya", 0);
        const currJSON = {"timestamp":Date.now(),"owner":"user","userName":"Jeet Bhardiya","message":inputValue};
        console.log(JSON.stringify(currJSON));
        
        input.value = "";
    }


    createAssistantElements(message,time){ // if time != 0, old, time = 0, current time
        console.log("Inside");
        const liElement = document.createElement("li");
        
        liElement.classList.add("slds-chat-listitem");
        liElement.classList.add("slds-chat-listitem_inbound");

        const parentDiv = document.createElement("div");
        parentDiv.className = "slds-chat-message";

        const avatarSpan = document.createElement("span");
        avatarSpan.ariaHidden = true;
        avatarSpan.classList.add("slds-avatar");
        avatarSpan.classList.add("slds-avatar_circle");
        avatarSpan.classList.add("slds-chat-avatar");

        const avatarAbbr = document.createElement("abbr");
        avatarAbbr.classList.add("slds-avatar__initials");
        avatarAbbr.classList.add("slds-avatar__initials_inverse");
        avatarAbbr.title = "Einstein GPT";

        const avatarAbbrText = document.createTextNode("GPT");
        avatarAbbr.appendChild(avatarAbbrText);

        const childDiv = document.createElement("div");
        childDiv.className = "slds-chat-message__body";

        const grandChildDiv1 = document.createElement("div");
        grandChildDiv1.classList.add("slds-chat-message__text");
        grandChildDiv1.classList.add("slds-chat-message__text_inbound");

        const messageSpan = document.createElement("span");
        const messageSpanText = document.createTextNode(message);

        messageSpan.appendChild(messageSpanText);

        grandChildDiv1.appendChild(messageSpan);

        const grandChildDiv2 = document.createElement("div");
        grandChildDiv2.className = "slds-chat-message__meta";

        
        // console.log(this.getCurrentTime());
        var responseMetadataText = "Einstein GPT";

        if(time != 0){
            responseMetadataText = "Einstein GPT • " + this.timestampToLocalTime(time);
        }
        else{
            responseMetadataText = "Einstein GPT • " + this.getCurrentTime();
        }

        const grandChildDiv2Text = document.createTextNode(responseMetadataText);

        grandChildDiv2.appendChild(grandChildDiv2Text);

        childDiv.appendChild(grandChildDiv1);
        childDiv.appendChild(grandChildDiv2);

        parentDiv.appendChild(avatarSpan);
        parentDiv.appendChild(childDiv);

        liElement.appendChild(parentDiv);

        
        const ulElement = this.template.querySelector("ul");

        ulElement.appendChild(liElement);

    }

    createUserElements(message,userOrOther,userName,time){
        const liElement = document.createElement("li");
        
        liElement.classList.add("slds-chat-listitem");
        liElement.classList.add("slds-chat-listitem_outbound");

        const parentDiv = document.createElement("div");
        parentDiv.className = "slds-chat-message";

        const childDiv = document.createElement("div");
        childDiv.className = "slds-chat-message__body";

        const grandChildDiv1 = document.createElement("div");
        grandChildDiv1.classList.add("slds-chat-message__text");

        if(userOrOther == 0){
            grandChildDiv1.classList.add("slds-chat-message__text_outbound");
        }
        else{
            grandChildDiv1.classList.add("slds-chat-message__text_outbound-agent");
        }
        

        const messageSpan = document.createElement("span");
        const messageSpanText = document.createTextNode(message);

        messageSpan.appendChild(messageSpanText);

        grandChildDiv1.appendChild(messageSpan);

        const grandChildDiv2 = document.createElement("div");
        grandChildDiv2.className = "slds-chat-message__meta";

        var responseMetadataText = userName;

        if(time != 0){
            responseMetadataText = userName + " • " + this.timestampToLocalTime(time);
        }
        else{
            responseMetadataText = userName + " • " + this.getCurrentTime();
        }
        
        const grandChildDiv2Text = document.createTextNode(responseMetadataText);

        grandChildDiv2.appendChild(grandChildDiv2Text);

        childDiv.appendChild(grandChildDiv1);
        childDiv.appendChild(grandChildDiv2);

        parentDiv.appendChild(childDiv);

        liElement.appendChild(parentDiv);

        
        const ulElement = this.template.querySelector("ul");

        ulElement.appendChild(liElement);

    }

    createEventElements(eventMessage){
        const liElement = document.createElement("li");
        
        liElement.classList.add("slds-chat-listitem");
        liElement.classList.add("slds-chat-listitem_event");

        const parentDiv = document.createElement("div");
        parentDiv.className = "slds-chat-event";

        const childDiv = document.createElement("div");
        childDiv.className = "slds-chat-event__body";

        const pTag = document.createElement("p");
        // const bTag = document.createElement("b");
        // const bTagText = document.createTextNode("New Opportunity ");
        const pTagText = document.createTextNode(eventMessage);

        // bTag.appendChild(bTagText);
        // pTag.appendChild(bTag);
        pTag.appendChild(pTagText);

        childDiv.appendChild(pTag);

        parentDiv.appendChild(childDiv);

        liElement.appendChild(parentDiv);

        const ulElement = this.template.querySelector("ul");

        ulElement.appendChild(liElement);
    }

    getCurrentTime(){
        return new Date().toLocaleTimeString('en-US', {
            hour: 'numeric', minute: 'numeric', hour12: true
            })
    }

    timestampToLocalTime(timestamp){
        return new Date(timestamp).toLocaleString("en-US", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
}