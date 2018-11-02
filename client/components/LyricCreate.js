import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../mutations/addLyric'

class LyricCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { content: '' }
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content
            }
        })
            .then(() => this.setState({ content: '' }))
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Add a Lyric</label>
                <input
                    value={this.state.content}
                    onChange={({ target }) => this.setState({ content: target.value })} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default graphql(mutation)(LyricCreate)