const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  })
}

// exports.onCreateNode = ({ node, getNode, actions }) => {
//     let parentNode = getNode(node.parent)
//     console.log('-----------: ', parentNode)
//     if (node.internal.type === "MarkdownRemark") {
//       if (parentNode.sourceInstanceName === "blog") {
//       let slug = createFilePath({ node, getNode })
//       slug = slug.replace(/\//g, '');
//       actions.createNodeField({ node, name: "slug", value: slug })
//       }
//     }
//   }

// exports.createPages = async ({graphql, actions}) => {
  
//   const { data } = await getPageData(graphql)

//   data.blogPosts.edges.forEach(({ node }) => {
//     const { slug } = node.fields;
//     actions.createPage({
//       path: `/blog/${slug}`,
//       component: path.resolve("./src/templates/blog-post-template.js"),
//       context: {slug}
//     })
//   })
  
// }

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/home-page-template.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

async function getPageData(graphql) {
  return await graphql(`
    {
      blogPosts: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
`)}