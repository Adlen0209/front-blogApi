import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';


export async function signup(firstName: string, lastName: string, email: string, password: string) {
    try {
        const response = await axios.post('/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password

        })
        console.log(response.data)

        return response.data;
    } catch (error) {
        throw error;
    }
}