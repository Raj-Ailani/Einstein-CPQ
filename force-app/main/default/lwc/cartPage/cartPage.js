import { LightningElement, api } from 'lwc';
import addSelectedProducts from '@salesforce/apex/addProduct.addSelectedProducts';

export default class CartPage extends LightningElement {

    productIds = ['01t2w00000GeEpWAAV', '01t2w00000GeEpyAAF',
        '01t2w00000GeEpYAAV', '01t2w00000GeEpeAAF', '01t2w00000GeEq8AAF'];
    @api productId;

    addToQuote() {
        addSelectedProducts({ productId: this.productId })
            .then(result => {
                console.log('Product Added to Quote');
            })
            .catch(error => {
                console.error('Error Message:', error);
            });
    }
}