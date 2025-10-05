export interface USER_SLICE_TYPE{
    
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: 'admin' | 'user'  | 'superadmin';
    userProfileImage?: string;
}
export interface PROFILE_LOGIN_SIGNUP_TYPE{
    success:boolean,
    data:{

        _id: string;
        name: string;
        email: string;
        phoneNumber?: string;
        role: 'admin' | 'user'  | 'superadmin';
        userProfileImage?: string;
    }
}
