import UserService from "./services/UserService";

export async function getUserIdFromToken(token)
{
    try{
       const res  = await UserService.checkToken({token: token})
       if (res.data.status === 'OK')
        {
            return {email: res.data.userId, fullname: res.data.fullname}
        }
       else
        {
            return null
        }
    }
    catch(err)
    {
        return null
    }
  
}