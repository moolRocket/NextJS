
export const initialState = {
    products_sn: [],
    products:[]
}

export const LOAD_PRODUCTS_DATA_REQUEST = "LOAD_PRODUCTS_DATA_REQUEST";
export const LOAD_PRODUCTS_DATA_SUCCESS = "LOAD_PRODUCTS_DATA_SUCCESS";
export const LOAD_PRODUCTS_DATA_FAILURE = "LOAD_PRODUCTS_DATA_FAILURE";
export const PRODUCT_SN_CHANGE = "PRODUCT_SN_CHANGE";

export const MAKE_LOT_REQUEST = "MAKE_LOT_REQUEST";
export const MAKE_LOT_SUCCESS = "MAKE_LOT_SUCCESS";
export const MAKE_LOT_FAILURE = "MAKE_LOT_FAILURE";

export const MAKE_AUTO_LOT_REQUEST = "MAKE_AUTO_LOT_REQUEST";
export const MAKE_AUTO_LOT_SUCCESS = "MAKE_AUTO_LOT_SUCCESS";
export const MAKE_AUTO_LOT_FAILURE = "MAKE_AUTO_LOT_FAILURE";



// 리듀서 함수 만들기 
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case PRODUCT_SN_CHANGE:
            const products_sn = action.products_sn;   
            return {
                ...state, 
                products_sn
            };
        case LOAD_PRODUCTS_DATA_REQUEST:
            return {...state};
        case LOAD_PRODUCTS_DATA_SUCCESS:
            const products = action.data.data;
            return {...state, products};
        case LOAD_PRODUCTS_DATA_FAILURE:
            return {...state};

        case MAKE_LOT_REQUEST:
            return { ...state };
        case MAKE_LOT_SUCCESS:
            // state.products_sn = [];
            return { ...state, products_sn:[]  };
        case MAKE_LOT_FAILURE:
            return { ...state };
            
        case MAKE_AUTO_LOT_REQUEST:
            return { ...state };
        case MAKE_AUTO_LOT_SUCCESS:
            return { ...state };
        case MAKE_AUTO_LOT_FAILURE:
            return { ...state };
            
        default:
            return state;
    }
}


export default reducer;