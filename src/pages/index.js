import React from "react"
import { graphql } from 'gatsby'

export default function Home({data}) {

  return <>
  {data.allMarkdownRemark.edges.map(blogPost => (
    <h1 className="station" key={blogPost.node.frontmatter.date}>{blogPost.node.frontmatter.title}</h1>
  ))}
  </>
}


export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date
            title
            path
          }
        }
      }
    }
  }
`