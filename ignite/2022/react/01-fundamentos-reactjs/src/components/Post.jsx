import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

export function Post({ post: { author, content, tags, publishedAt } }) {
    const [comments, setComments] = useState(['Post muito bacana'])

    const [newComment, setNewComment] = useState('')

    const publishedAtFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publisedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        addSuffix: true,
        locale: ptBR
    })

    function handleCommentSubmit(event) {
        event.preventDefault()
        
        setComments([...comments, newComment])
        setNewComment('')
    }

    function handleCommentChange(event) {
        event.target.setCustomValidity('')
        setNewComment(event.target.value)
    }

    function handleNewCommentInvalid(event) {
        event.target.setCustomValidity('O comentário não pode ser vazio')
    }

    function deleteComment(comment) {
        setComments(comments.filter(c => c !== comment))
    }

    const isNewCommentEmpty = newComment.length === 0

    return (
       <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatar_url} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()} className={styles.date}>
                    {publisedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((item) => {
                    if (item.type === 'paragraph') {
                        return <p key={item.content}>{item.content}</p>
                    } else if (item.type === 'link') {
                        return <p key={item.content}><a href="#">{item.content}</a></p>
                    }
                })}
                <p>
                   {tags.map((tag, index) => (
                       <a key={index} href="#">{`${tag} `}</a>
                     ))}
                </p>
            </div>

            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment"
                    placeholder="Deixe seu comentário"
                    value={newComment}
                    onChange={handleCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => (
                    <Comment key={comment} content={comment} onDelete={deleteComment} />
                ))}
            </div>
       </article>
    )
}