const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    let parentNode = getNode(node.parent)
    if (node.internal.type === "MarkdownRemark") {
      if (parentNode.sourceInstanceName === "blog") {
      let slug = createFilePath({ node, getNode })
      slug = slug.replace(/\//g, '');
      actions.createNodeField({ node, name: "slug", value: slug })
      }
    }
  }

exports.createPages = async ({graphql, actions}) => {
  
  const { data } = await getPageData(graphql)

  data.blogPosts.edges.forEach(({ node }) => {
    const { slug } = node.fields;
    actions.createPage({
      path: `/blog/${slug}`,
      component: path.resolve("./src/templates/blog-post-template.js"),
      context: {slug}
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