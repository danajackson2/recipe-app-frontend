import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const LikesComments = ({ recipe, user_id}) => {

    const [comment, setComment] = useState('')

    const handleComChange = (e) => {
        if (e.target.value.length <= 140){
            setComment(e.target.value)
        }
    }

    const addComment = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/comments`,{
            method: 'POST',
            headers: {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`},
            body: JSON.stringify({new_comment: { comment, user_id, recipe_id: recipe.id }})
        })
        .then(res => res.json())
        .then(console.log)

        setComment('')
    }

    const addLike = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/likes`,{
            method: 'POST',
            headers: {'content-type':'application/json', Authorization: `Bearer ${localStorage.token}`},
            body: JSON.stringify({like: {user_id, recipe_id: recipe.id }})
        })
        .then(res => res.json())
        .then(console.log)
    }

    return (
        <div id="lc-div">
            <div className='like-div'>
                <span onClick={addLike} className={'like'}>❤️ </span><span>{recipe.likes}</span>
            </div>
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label><span className='comment'>Leave a comment </span></Form.Label>
                        <Form.Control onChange={handleComChange} type="text" value={comment}/>
                        <Button onSubmit={addComment}>Submit</Button>
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