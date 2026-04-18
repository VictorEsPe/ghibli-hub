import { useParams } from "react-router-dom";

export function MovieDetails() {
    const { id } = useParams();

    return (
        <section>
            <h2>{id}</h2>
        </section>
    )
}