import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import mutation from '../mutations/likeLyric'
class LyricList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onLike = (id, likes) => {
        //invoke mutation
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyrics = () => {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i className="material-icons" onClick={() => { this.onLike(id, likes) }}>thumb_up</i>
                        {likes}
                    </div>
                </li >
            )
        })
    }
    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default graphql(mutation)(LyricList)