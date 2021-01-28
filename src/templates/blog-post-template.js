import React from "react"
import { graphql } from "gatsby"


export default function blogPostTemplate({ data }) {
    const {
        date,
        title,
        path
    } = data.markdownRemark.frontmatter

    const { html } = data.markdownRemark

    return <h1>{title}, {date}, {path}, {html}</h1>
}

export const blogPostTemplateQuery = graphql`
  query blogPostTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date
        title
        path
      }
      html
    }
  }
`;