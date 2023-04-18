import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"

import styles from './App.module.css'

import './global.css'

const posts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      avatar_url: "https://github.com/guihendias.png",
      role: "Desenvolvedor Front-end"
    },
    content: [
      {type: "paragraph", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti praesentium qui id voluptatem est excepturi rem eum non, blanditiis incidunt ut, quidem nobis, necessitatibus iusto vitae nihil esse possimus officia."},
      {type: "paragraph", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aliquam ratione modi quisquam sequi fuga voluptates ex unde, amet asperiores, officia quis accusantium impedit voluptatem perferendis eius totam voluptatum odit."},
      {type: "link", content: "teste.design/teste" }, 
    ],
    tags: ["#novoprojecto", "#nlw", "#rocketseat"],
    publishedAt: new Date(2023, 1, 6, 15, 59, 0)
  },
  {
    id: 2,
    author: {
      name: "Jane Doe",
      avatar_url: "https://avatars.githubusercontent.com/u/6184465?v=4",
      role: "Desenvolvedor Front-end"
    },
    content: [
      {type: "paragraph", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti praesentium qui id voluptatem est excepturi rem eum non, blanditiis incidunt ut, quidem nobis, necessitatibus iusto vitae nihil esse possimus officia."},
      {type: "paragraph", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aliquam ratione modi quisquam sequi fuga voluptates ex unde, amet asperiores, officia quis accusantium impedit voluptatem perferendis eius totam voluptatum odit."},
      {type: "link", content: "teste.design/teste" }, 
    ],
    tags: ["#novoprojecto", "#nlw", "#rocketseat"],
    publishedAt: new Date(2023, 1, 8, 15, 59, 0)
  }
]

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(post => (
              <Post key={post.id} post={post} />  
          ))}
      </main>
      </div>
    </>
  )
}

export default App
