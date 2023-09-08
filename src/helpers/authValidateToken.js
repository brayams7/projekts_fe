import { getToken } from "./authLocalStorage"


export const getRestDateExpiredToken = () =>{
    try {
        const token = getToken()
        if(token){
            const expiredToken = new Date(token.expires)
            const now = new Date()
            
            const difMilisegundos = now.getTime() - expiredToken.getTime();

            const segundos = Math.floor(difMilisegundos / 1000);
            const minutos = Math.floor(segundos / 60);
            const horas = Math.floor(minutos / 60);
            const dias = Math.floor(horas / 24);

            // Obtener los segundos, minutos y horas restantes
            const segundosRestantes = segundos % 60;
            const minutosRestantes = minutos % 60;
            const horasRestantes = horas % 24;

            console.log({
                dias,
                horasRestantes,
                minutosRestantes,
                segundosRestantes
            })
        }
    } catch (error) {
        console.log({
            error
        })
    }
}

export const validateExpiredToken = (token)=>{
    try {
        const expiredToken = new Date(token.expires)
        const now = new Date()

        if(expiredToken <= now) return false
        return true
    } catch (error) {
        return false        
    }
    
}