import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const LikesComments = ({ recipe, user, updateUserLikes, fetchRecipes}) => {
    
    const [comment, setComment] = useState('')

    const handleComChange = (e) => {
        if (e.target.value.length <= 140){
            setComment(e.target.value)
        }
    }

    const addComment = () => {
        if (comment !== ''){
            fetch(`${process.env.REACT_APP_BASE_URL}/comments`,{
                method: 'POST',
                headers: {
                    'content-type':'application/json', 
                    Authorization: `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({new_comment: { body: comment, user_id: user.user_id, recipe_id: recipe.id }})
            })
            .then(res => res.json())
            .then(fetchRecipes())
            .then(setComment(''))
        }
    }
    
    const toggleLike = () => {
        const like = user.likes.find(like => like.recipe_id === recipe.id)
        if (!!like) {
            fetch(`${process.env.REACT_APP_BASE_URL}/likes/${like.id}`,{
                method: 'DELETE',
                headers: {Authorization: `Bearer ${localStorage.token}`}
            })
            .then(res => res.json())
            .then(() => {
                updateUserLikes(like, 'rmv')
                let span = document.querySelector('#like-count')
                let count = parseInt(document.querySelector('#like-count').textContent)
                span.textContent = count - 1
            })
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/likes`,{
                method: 'POST',
                headers: {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`},
                body: JSON.stringify({like: {user_id: user.user_id, recipe_id: recipe.id }})
            })
            .then(res => res.json())
            .then(like => {
                updateUserLikes(like, 'add')
                let span = document.querySelector('#like-count')
                let count = parseInt(document.querySelector('#like-count').textContent)
                span.textContent = count + 1
            })
        }
    }

    return (
        <div id="lc-div">
            <div className='like-div'>
                <span onClick={toggleLike} className={'like'}>❤️ </span><span id='like-count'>{recipe.likes}</span>
            </div>
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label><span className='comment'>Leave a comment </span></Form.Label>
                        <Form.Control onChange={handleComChange} type="text" value={comment}/>
                        <Button onClick={addComment}>Submit</Button>
                    </Form.Group>
                </Form>
                <p>{140-comment.length} chars remaining</p>
            </div>
            <div >
                <span className='comment'>Comments</span>
                <ul className='comment-list'>
                   {recipe.comments.map(c => <li><b>{c.username} </b>says "{c.body}"</li>)}        
                </ul>
            </div>
        </div>
    )
}

export default LikesComments