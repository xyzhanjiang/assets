import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let ignore = false
    async function fetchData() {
      const { data } = await axios.get(`/api/posts`)
      if (!ignore) setPosts(data)
    }

    fetchData()
    return () => ignore = true
  }, [])

  return (
    <section className="container">
      <div className="column is-8 is-offset-2">
        <div className="content">
          {posts.map((post) => (
            <article className="box" key={post.id}>
              <h4><Link to={`/posts/${post.id}`}>{post.title}</Link></h4>
              <div className="media">
                <div className="media-left">
                  <p className="image is-32x32">
                    <img alt="avatar" src="http://bulma.io/images/placeholders/128x128.png"/>
                  </p>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <a href="#">@{post.author}</a> replied 34 minutes ago &nbsp;
                      <span className="tag">Question</span>
                    </p>
                  </div>
                </div>
                <div className="media-right">
                  <span className="has-text-grey-light">1</span>
                </div>
              </div>
            </article>
          ))} 
        </div>
      </div>
    </section>
  )
}

