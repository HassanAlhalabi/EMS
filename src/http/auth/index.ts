import { post } from ".."


export const signIn = async (name: string, password: string) => {
    return post('Authenticate',{
        name,
        password
    })
}