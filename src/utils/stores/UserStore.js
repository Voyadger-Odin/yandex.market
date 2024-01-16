import {defineStore} from "pinia";
import API, {SERVER_URL} from "@/utils/api.js";
import axios from "axios";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        favorites: [],
        basket: {},
    }),

    actions: {
        getUserInfo(){
            const accessToken = localStorage.getItem('access_token')
            if (!accessToken){return}

            API.get(`${SERVER_URL}/api/auth/me`)
                .then(res => {
                    this.user = res.data.user
                    const favorites = []
                    res.data.favorites.forEach((favorite) => {
                        favorites.push(favorite.item_id)
                    })
                    this.favorites = favorites

                    res.data.basket.forEach((item) => {
                        this.basket[item.item_id] = item
                    })
                })
        },

        login(login, password, callback){
            axios.post(`${SERVER_URL}/api/auth/login`, {email: login, password: password})
                .then(res => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.getUserInfo()
                    callback('OK', '')
                })
                .catch(error => {
                    callback('ERROR', error.response.data.error)
                })
        },

        logout(callback) {
            API.post(`${SERVER_URL}/api/auth/logout`)
                .then(res => {
                    localStorage.removeItem('access_token')
                    this.user = null
                    this.favorites = []
                    this.basket = {}
                    callback()
                })
        },

        removeItemFromBasket(item_id, callback){
            API.delete(`${SERVER_URL}/api/auth/basket/${item_id}`)
                .then(res => {
                    delete this.basket[item_id]
                    if (callback){
                        callback()
                    }
                })
        },

        setFavorite(item_id){
            // Add favorite
            if (!this.favorites.includes(item_id)){
                this.addToFavorite(item_id)
            }
            // Remove Favorite
            else{
                this.removeFromFavorites(item_id)
            }
        },

        addToFavorite(item_id){
            API.post(`${SERVER_URL}/api/auth/favorites/${item_id}`)
                .then(res => {
                    if (res.status === 200){
                        this.favorites.push(item_id)
                    }
                })
        },

        removeFromFavorites(item_id){
            API.delete(`${SERVER_URL}/api/auth/favorites/${item_id}`)
                .then(res => {
                    if (res.status === 200){
                        this.favorites.splice(this.favorites.indexOf(item_id), 1)
                    }
                })
        },
    },
})