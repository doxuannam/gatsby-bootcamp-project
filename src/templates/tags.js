import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import blogstyles from '../components/blog.module.scss'
import { Link,graphql } from 'gatsby'

const tagPage = ({data,pageContext})=>{
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
      } tagged with ${tag}`
return(
    <Layout>
        <Helmet title={tagHeader}></Helmet>
        <h2 className={blogstyles.title}>{tagHeader}</h2>
        <ul className={blogstyles.posts}>
            {edges.map(({node}) => {
                const {frontmatter,fields,id} = node
                const { title,date} = frontmatter
                const { slug } = fields
                return(
                    <li key={id} className={blogstyles.post}><Link to ={`/blog/${slug}`} >
                        <h3>{title}</h3></Link>
                        <p><span>{date}</span></p>
                    </li>
                )
            })}
        </ul>
    </Layout>
)
}
export default tagPage
export const query = graphql`
query($tag : String){
    allMarkdownRemark(
        filter:{ frontmatter:{ tags: { in: [$tag] } } }
    ){
        totalCount
        edges{
            node{
                id,
                fields{
                    slug
                }
                frontmatter{
                    title,date
                }
            }
        }
    }
}
`