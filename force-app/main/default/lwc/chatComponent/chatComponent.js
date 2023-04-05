import { LightningElement } from 'lwc';

export default class ChatComponent extends LightningElement {

    message = "Hello, how can I help you today?";

    handleClick(event) {
        console.log("Button Works");
        this.createAssistantElements(this.message);
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
}