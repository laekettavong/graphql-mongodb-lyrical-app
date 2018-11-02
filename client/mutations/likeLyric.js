
import gql from 'graphql-tag'

export default gql`
    mutation LikeLyrcs($id: ID){
        likeLyric(id: $id){
        id
        likes
        }
    }
`

