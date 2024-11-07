//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded , Please wait'
    },
    success : {
        title: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure : {
        title : 'error',
        message : 'An error occured while fetching response from the server. please try again '
    },
    requestFailure : {
        title : 'error',
        message : 'An error occured while parsing request data '
    },
    networkError : {
        title : 'error',
        message : 'Unable to connect with the server. Please check the internet connectivity and try again later'
    }
}

export const SERVICE_URLS = {
    userSignup: {url: '/signup', method: 'POST' },
    userLogin: {url: '/login', method: 'POST' },
    uploadFile: {url: '/file/upload', method: 'POST' }  
}