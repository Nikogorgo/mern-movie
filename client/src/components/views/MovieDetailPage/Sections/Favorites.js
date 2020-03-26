import React, { useEffect, useState } from 'react'
import { Typography,Button, Row} from 'antd';
import axios from 'axios';



export default function Favorites({
    userForm,
    movieId,
    movieInfo:{original_title, backdrop_path, runtime}}){

    const [favoriteNumber, setFavoriteNumber] = useState(0)
    const [favorited, setFavorited] = useState(false)

    const variables = {
        userForm,
        movieId,
        movieTitle: original_title,
        movieImage: backdrop_path,
        movieRunTime:runtime
    }

    useEffect(() => {  
        
        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('failed');
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get Info');
                }
            })
    },[])

    const onClickFavorite = () => {
        if(favorited) {
            // When already added
            axios.post('/api/favorite/removeFromFavorite', variables )
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(favoriteNumber + 1)
                        setFavorited(!favorited)
                    } else {
                        alert('failed to removed')
                    }
                })
                
        } else {
            // When not adding yet
            axios.post('/api/favorite/addToFavorite', variables )
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(favoriteNumber + 1)
                        setFavorited(!favorited)
                    } else {
                        alert('failed to add')
                    }
                })
        }
    }

    return (        
        <Button onClick={onClickFavorite}>
            {favorited ? "Remove from Favorite" : "Add to Favorites" }
            {" "}({favoriteNumber})
        </Button>
    )
}
