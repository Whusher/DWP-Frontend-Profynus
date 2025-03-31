import { api } from "../APIBase";
export const requestRestorePassword = async(email) => {
    try{
        const response = await api.post('/account-recovery/request-password-reset', {email})
        if(response.status == 200){
            return {...response.data, success: true}
        }else{
            return {...response.data, success: false}
        }
    }catch(error){
        return {...error.response.data, success: false}
    }

}
export const resetPasswordAccount = async(tokenU, newPasswordU) => {
    try{
       const response = await api.post('/account-recovery-initial/reset-password', {token: tokenU, newPassword: newPasswordU})
       if(response.status == 200){
        return {...response.data, success: true}
       }else{
            return {...response.data, success: false}
       }
    }catch(error){
        console.log(error)
        return {...error.response.data, success: false}

    }
}