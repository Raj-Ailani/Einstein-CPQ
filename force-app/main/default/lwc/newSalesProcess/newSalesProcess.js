import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
import { CurrentPageReference } from 'lightning/navigation';
import createChat from '@salesforce/apex/createChatTranscript.createChat'

export default class NewSalesProcess extends NavigationMixin(LightningElement) {

  @api recordId;

  @wire(CurrentPageReference)
  getPageReferenceParameters(currentPageReference) {
    if (currentPageReference) {
      this.recordId = currentPageReference.attributes.recordId || null;
    }
  }
  navigateToComponent() {
    createChat({ accountId: this.recordId }).then(result => {
      if (result) {
        console.log(result);
        if (this.recordId) {
          this[NavigationMixin.Navigate]({
            type: "standard__navItemPage",
            attributes: {
              apiName: 'Sales_Process'
            },
            state: {
              c__accountId: this.recordId
            }
          });
        }
      }
    })


  }
}