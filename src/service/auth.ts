import axios from 'axios';
import { Inputs } from 'src/componants/login/login';
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

export async function login(data: Inputs) {
    try {
        const { email, password } = data;
        const response = await axios.post('/login', {
            email,
            password
        });
        console.log(response)

        if(response.data.token) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            
        }
 
        return response.data;
    } catch (error) {
        throw error;
}}