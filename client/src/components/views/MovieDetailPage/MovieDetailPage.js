import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Typography,Button, Row} from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';
import Favorites from './Sections/Favorites';

function MovieDetailPage(props) {
    
    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        
        console.log(movieId);
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then(response => response.json())
                    .then(response => {
                        setCrews(response.cast);
                    })
                })
        }, [])

    const handleClick = () =>  {
        setActorToggle(!ActorToggle);
    }
    
    return (
        <>
            {Movie && 
                <MainImage
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}/>
            }

            <Button onClick={handleClick}>Toggle Actor</Button>
            
            
            <Favorites 
                userForm={localStorage.getItem('userId')}
                movieId={movieId}
                movieInfo={Movie}
            />


            {ActorToggle &&
            <Row gutter={[16,16]}>
                {Crews && Crews.map((crew, index) =>(
                    <>
                    {crew.profile_path &&
                        <GridCard 
                            actor
                            image={crew.profile_path && `${IMAGE_URL}w500${crew.profile_path}`}
                        />
                    }
                        
                    </>
                ))}
            </Row>
            }


        </>
    )
}

export default MovieDetailPage
