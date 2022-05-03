
export const initialState = {
    product_sn: [],
    products:[]
}

export const LOAD_PRODUCTS_DATA_REQUEST = "LOAD_PRODUCTS_DATA_REQUEST";
export const LOAD_PRODUCTS_DATA_SUCCESS = "LOAD_PRODUCTS_DATA_SUCCESS";
export const LOAD_PRODUCTS_DATA_FAILURE = "LOAD_PRODUCTS_DATA_FAILURE";
export const PRODUCT_SN_CHANGE = "PRODUCT_SN_CHANGE";
export const MAKE_LOT = "MAKE_LOT";
export const MAKE_AUTO_LOT = "MAKE_AUTO_LOT";

// 리듀서 함수 만들기 
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case PRODUCT_SN_CHANGE:  
            console.log("action", action) 
            const product_sn = action.product_sn;   
            return {
                ...state, 
                product_sn
            };
        case LOAD_PRODUCTS_DATA_REQUEST:
            return {...state};
        case LOAD_PRODUCTS_DATA_SUCCESS:
            console.log(action.data.data);
            const products = action.data.data;
            return {...state, products};
        case LOAD_PRODUCTS_DATA_FAILURE:
            return {...state};
        case MAKE_LOT:
            return {...state};
        case MAKE_AUTO_LOT:
            return {...state};
        default:
            return state;
    }
}


export default reducer;