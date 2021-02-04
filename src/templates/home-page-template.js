import React from "react"
import { graphql } from "gatsby"


export default function pageTemplate({ data }) {
    const page = data.markdownRemark

    return (
          <div>
            <h1>{page.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
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