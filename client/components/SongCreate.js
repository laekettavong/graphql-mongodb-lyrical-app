import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'
import mutation from '../mutations/addSong'

class SongCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '' }
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query }] //ensure the SongList component gets the newly added song (query is used in some other component)
        })
            .then(() => hashHistory.push('/'))
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Song Title:</label>
                    <input
                        value={this.state.title}
                        onChange={({ target }) => this.setState({ title: target.value })} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default graphql(mutation)(SongCreate)