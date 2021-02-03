import React from "react"
import { graphql } from "gatsby"


export default function blogPostTemplate({ data }) {
    const post = data.markdownRemark

    return (
          <div>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
      )
}

export const pageTemplateQuery = graphql`
  query pageTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        path
      }
      html
    }
  }
`;