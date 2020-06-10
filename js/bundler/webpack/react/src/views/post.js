import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default () => {
  const { id } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    let ignore = false
    async function fetchData() {
      const { data } = await axios.get(`/api/posts/${id}`)
      if (!ignore) setPost(data)
    }

    fetchData()
    return () => ignore = true
  }, [id])

  return (
    <div className="container">
      <div className="column is-8 is-offset-2">
        <div className="card article">
          <div className="card-content">
            <div className="media">
              <div className="media-content has-text-centered">
                <p className="title article-title">{post.title}</p>
                <div className="tags has-addons level-item">
                  <span className="tag is-rounded is-info">@{post.author}</span>
                  <span className="tag is-rounded">May 10, 2018</span>
                </div>
              </div>
            </div>
            <div className="content article-body">
              <p>{post.content}</p>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="media">
            <div className="media-left">
              <p className="image is-32x32">
                <img src="http://bulma.io/images/placeholders/128x128.png"/>
              </p>
            </div>
            <div className="media-content">
              <div className="content">
                <p>Accumsan lacus vel facilisis volutpat est velit egestas?</p>
                <p>
                  <a href="#">@jsmith</a> replied 34 minutes ago
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
