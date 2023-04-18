import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
    content: string
    onDelete: (comment: string) => void
}

export function Comment({ content, onDelete }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {
        console.log('Deletar comentário')

        onDelete(content)
    }


    function handleLikeComment() {
       setLikeCount(state => state + 1)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/guihendias.png" alt="Author" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>John Doe</strong>
                            <time title="06 de Fevereiro às 15:59" dateTime='2023-02-06 15:59:00' className={styles.date}>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash  size={24} />
                        </button>

                    </header>

                    <p>{content}</p>
                    
                </div>

                <footer>
                    <button onClick={handleLikeComment} >
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}