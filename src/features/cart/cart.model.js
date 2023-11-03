


//productID, userID , quantity 
export default class  cartModel{
    constructor(productID,userID,quantity,id){
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productID,userID,quantity){
        const existingCartItem = cartItems.find((item) => item.productID == productID && item.userID == userID);
        if (existingCartItem) {
        // If it exists, update the quantity
         existingCartItem.quantity = quantity;
         return existingCartItem;
        }
        else{
            const cartItem = new cartModel(productID,userID,quantity);
            cartItem.id = cartItems.length+1;
            cartItems.push(cartItem);
            return cartItem;
        }
    }

    static get(userID){
        return cartItems.filter((i)=> i.userID == userID);
    }

    static update(productID,userID,quantity){
        const existingCartItem = cartItems.find((item) => item.productID === productID && item.userID === userID);
        if(existingCartItem){
            existingCartItem.quantity =parseInt(quantity, 10);
        }
        return existingCartItem;
    }

    static delete(cartItemID,userID){
        const cartItemIndex = cartItems.findIndex((c)=> c.id == cartItemID && c.userID == userID);
        if(cartItemIndex == -1){
            return 'Item not Found';
        }else{
            cartItems.splice(cartItemIndex,1);
        }

    }
}

var cartItems = [
    new cartModel(1,2,1,1),
    new cartModel(1,1,2,2),
];
