import { useState } from "react";
import { useNavigate } from "react-router";
const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('Mario')
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        setIsPending(true)
        e.preventDefault()
        const newBlog = {title, body, author }
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            Headers: {'content-type': 'application/json'},
            body: JSON.stringify(newBlog)
        }).then(() => {
            console.log('Added New Blog')
            setIsPending(false)
            navigate('/')
        })
    } 
    return ( 
        <div className="create">
            <h2>Add A New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <label>Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <label>Blog Author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Add Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;