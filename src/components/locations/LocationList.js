import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { getAllLocations } from "../ApiManager"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            getAllLocations()
                .then(data => setLocations(data))
        },
        []
    )

    return <>
        <h2>List of Locations</h2>

        <article className="locations">
            {
                locations.map(location => {
                    return <section className="location">
                        <header>{location.address}</header>
                        <footer>Square feet: {location.sqFeet}</footer>
                    </section>
                })
            }
        </article>
    </>
}