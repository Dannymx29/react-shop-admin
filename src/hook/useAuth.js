import React, {useState, useContext, createContext} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "@services/api";

const AuthContext = createContext();

export function ProviderAuth({ children }) {

    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>;

};

export const useAuth = () => {

    return useContext(AuthContext);

};

function useProvideAuth(){

    const [user, setUser] = useState(null);

    const singIn = async (email, password) => {

        const options = {
            headers:{
                accept: '*/*',
                'Content-Type': 'application/json',
            },
        };

        const { data: access_token } = await axios.post(endPoints.auth.login, {email, password}, options);

        if (access_token) {
            const token = access_token.access_token;
            Cookies.set('token', token, { expires: 5 });

            axios.defaults.headers.Authorization = `Bearer ${token}`;
            const { data: user } = await axios.get(endPoints.auth.profile);
            setUser(user);
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        delete axios.defaults.headers.Authorization;
        window.location.href = '/login';
    }

    return{
        user,
        singIn,
        logout,
    };

};