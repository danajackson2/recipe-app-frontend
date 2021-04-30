import React, {useState} from 'react'
import { Form } from 'react-bootstrap'

const LikesComments = ({ likes, comments, addLike }) => {

    const [comment, setComment] = useState('')

    const handleComChange = (e) => {
        if (e.target.value.length <= 140){
            setComment(e.target.value)
        }
    }

    return (
        <div id="likes-comments-div">
            <div className={'like-div'}>
                <span onClick={addLike} className={'like'}>❤️ </span><span>{likes}</span>
            </div>
            <div className={'leave-comment'}>
                <Form>
                    <Form.Group>
                        <Form.Label>Leave a comment: </Form.Label>
                        <Form.Control onChange={handleComChange} type="text" value={comment}/>
                    </Form.Group>
                </Form>
                <p>{140-comment.length} chars remaining</p>
            </div>
            <div>
                Comments
                <ul className='comment-list'>
                   {comments.map(c => <li><b>{c.username} </b>says "{c.body}"</li>)}        
                </ul>
            </div>
        </div>
    )
}

export default LikesComments