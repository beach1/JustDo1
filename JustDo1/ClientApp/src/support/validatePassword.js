export function validatePassword(value){
    if (value.length==0) {
        return '';
    } else if (!value.match(/^[A-Za-z\d@$!%*?&]{8,}/i)){
        return 'The password must be at least 8 characters';
    } else if (!value.match(/^(?=.*[a-z])/i)){
        return 'The password must contain lowercase letters';
    } else if (!value.match(/^(?=.*[A-Z])/i)){
        return 'The password must contain capital letters';
    } else if (!value.match(/^(?=.*\d)/i)){
        return 'The password must contain digits';
    } else if (!value.match(/^(?=.*[@$!%*?&])/i)){
        return 'The password must contain special characters';
    } else {
        return '';
    }
}