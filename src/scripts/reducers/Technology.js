const technologyData = {
    technologyArray: [
        {name: 'js', imgUrl: '/src/assets/img/js.jpeg'},
        {name: 'react', imgUrl: '/src/assets/img/React_JS.png'},
        {name: 'redux', imgUrl: '/src/assets/img/redux.jpeg'},
        {name: 'node', imgUrl: '/src/assets/img/node.png'},
        {name: 'php', imgUrl: '/src/assets/img/php.jpg'},
        {name: 'laravel', imgUrl: '/src/assets/img/laravel.jpg'},
        {name: 'wordpress', imgUrl: '/src/assets/img/wordpress.jpg'},
        {name: 'opencart', imgUrl: '/src/assets/img/opencart.jpg'},
    ],
    technologyChoosen: '',
}

export default function TechnologyReducer(state = technologyData, action) {
    if (action.type === 'chooseTechnology') {
        return {
            ...state,
        	technologyChoosen: action.payload.technologyChoosen
        }
    }
    return state;
}