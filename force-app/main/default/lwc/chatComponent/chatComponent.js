import { LightningElement } from 'lwc';

export default class ChatComponent extends LightningElement {

    messageAssistant = "Hello, how can I help you today?";
    messageUser = "Create a new Opportunity";
    eventMessage = "New Opportunity has been created";
    // userOrOther = 0;

    handleClick(event) {
        console.log("Button Works");
        this.createAssistantElements(this.messageAssistant);
        this.createUserElements(this.messageUser,0);
        this.createUserElements(this.messageUser,1);
        this.createEventElements(this.eventMessage);
        
    }


    // test(){
    //     console.log("Works inside");
    //     const pelement = document.createElement("p");
    //     const pelementText = document.createTextNode("This is a text");
        
    //     pelement.appendChild(pelementText);
    //     const ulElement = this.template.querySelector("ul");
    //     console.log(ulElement);
    //     ulElement.appendChild(pelement);
    // }

    createAssistantElements(message){

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

        const responseMetadataText = "Einstein GPT • 4:59 PM";
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

    createUserElements(message,userOrOther){
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

        const responseMetadataText = "Amber Cann • 5:23 PM";
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
}