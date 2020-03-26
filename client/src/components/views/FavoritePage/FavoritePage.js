import React, { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../Config';
import axios from 'axios'
import { Popover } from 'antd'


function FavoritePage() {

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const variables = { 
        userForm: localStorage.getItem('userId')
    }

    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const fetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavoritedMovie', variables)
        .then(response => {
            if(response.data.success){
                setFavoriteMovies(response.data.favorites)
            } else {
                alert('failed to get favorite videos')
            }
        })
    }

    const onClickRemove = (movieId) => {
        const variables = {
            movieId: movieId,
            userForm: localStorage.getItem('userId')
        }
        axios.post('/api/favorite/removeFromFavorite', variables )
        .then(res => {
            if(res.data.success) {
                fetchFavoritedMovies();
            } else {  
                alert('failed to removed')
            }
        });
    }

 

    const renderTableBody = favoriteMovies.map( favoriteMovie => {
        const content = (
            <div>
                {favoriteMovie.moviePost
                    ?
                    <img src={
                        `${IMAGE_URL}w500${favoriteMovie.moviePost}`}
                        alt="moviePost"/>
                    :
                    "no Image"
                }
            </div>
        )

       
        
        return <tr>
            <Popover
                content={content}
                title={`${favoriteMovie.movieTitle}`}
            >
                <td> {favoriteMovie.movieTitle} </td>
            </Popover>
            <td> {favoriteMovie.movieRunTime} mins </td>
            <td><button onClick={ () => onClickRemove(favoriteMovie.movieId)}> Remove from the Favorites </button></td>
        </tr>
    })

    return (
        <div>
            Favorite Page
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Reemovee from Favorite</th>
                    </tr>
                </thead>

                <tbody>

                    { renderTableBody }

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
