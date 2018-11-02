import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import query from '../queries/fetchSong'
import { Link } from 'react-router'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
    constructor(props) {
        //this.props.params.id
        super(props)
        this.state = {}
    }

    render() {
        const { song } = this.props.data
        if (!song) { return <div>Loading...</div> }
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}
//export default SongDetail
//inject song ID to query
export default graphql(query, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)