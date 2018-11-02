import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/fetchSongs'
import mutation from '../mutations/deleteSong'

class SongList extends Component {

    renderSongs = () => {
        return this.props.data.songs.map(({ title, id }) => {
            return (
                <li className="collection-item" key={id}>
                    <Link to={`songs/${id}`}>
                        {title}
                    </Link>
                    <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            )
        })
    }

    onSongDelete = (id) => {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch()) //reload data within this component
    }

    render() {
        if (this.props.data.loading) { return <div>Loading...</div> }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>

        )
    }
}

export default graphql(mutation)(
    graphql(query)(SongList)
)
