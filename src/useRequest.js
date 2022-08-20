import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";


const graphqlAPI = process.env.REACT_APP_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GRAPHCMS_TOKEN}`
  }
});

export function useGetPosts() {
    const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            createdAt
            slug
            title
            excerpt
            visitedOn
            location
            featuredPost
            postPics {
              url
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;
    return useQuery("get-posts", async () => {
      const result = await graphQLClient.request(query);
      return result.postsConnection.edges;
    });
  }

  export function useGetPostsOneFeaturedPost() {
    const query = gql`
    query GetAdjacentPosts() {
        featured:posts(
          first: 1
          where: {featuredPost: true}
        ) {
                slug
              title
              excerpt
              visitedOn
              location
              featuredPost
              featuredImage {
                url
              }
        }
        normal:posts(
          first: 4
          where: {featuredPost: false}
        ) {
          slug
              title
              excerpt
              visitedOn
              location
              featuredPost
              featuredImage {
                url
              }
        }
      }
  `;
    return useQuery("get-posts-onefeaturedpost", async () => {
      const result = await graphQLClient.request(query);
      return result;
    });
  }

  export function useGetPostsDetails(slug) {
    const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        visitedOn
        location
        postPics {
          url
        }
        featuredImage {
          url
        }
        slug
        content {
          raw
        }
      }
    }
  `;
    return useQuery("get-posts-details", async () => {
      const result = await graphQLClient.request(query, { slug });
      return result.post;
    });
  }

  export function useGetOtherPosts(slug) {
    const query = gql`
    query GetPostDetails($slug: String!) {
        posts(
          where: {slug_not: $slug}
        ) {
            title
            excerpt
            visitedOn
            location
          featuredImage {
            url
          }
          slug
        }
      }
  `;
    return useQuery("get-other-posts", async () => {
      const result = await graphQLClient.request(query, { slug });
      return result.posts;
    });
  }

  export function useGetPostsTwoFeaturedPost() {
    const query = gql`
    query GetAdjacentPosts() {
        featured:posts(
          first: 1
          where: {featuredPost: true}
        ) {
                slug
              title
              excerpt
              visitedOn
              location
              featuredPost
              featuredImage {
                url
              }
        }
        normal:posts(
          first: 5
          where: {featuredPost: false}
        ) {
          slug
              title
              excerpt
              visitedOn
              location
              featuredPost
              featuredImage {
                url
              }
        }
      }
  `;
    return useQuery("get-posts-twofeaturedpost", async () => {
      const result = await graphQLClient.request(query);
      return result;
    });
  }

  export function usePostComments(commentObj) {
    const query = gql`
mutation CreateComment($name: String!, $email: String!, $comment: String!) {
  createComment(data: {name: $name, email: $email, comment: $comment) { id }
}
`;
    return useQuery("post-comment", async () => {
      const result = await graphQLClient.request(query,{
        name: commentObj.name,
        email: commentObj.email,
        comment: commentObj.comment,
      });
      return result;
    });
  }