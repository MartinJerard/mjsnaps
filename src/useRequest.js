import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";


const graphqlAPI = process.env.REACT_APP_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GRAPHCMS_TOKEN}`
  }
});


export function useGetBlogDP() {
  const query = gql`
  query MyQuery {
    asset(where: {id: "clboio6o716o50bpffqeh6r55"}) {
      url
    }
  }
`;
  return useQuery("get-Blog-DP", async () => {
    const result = await graphQLClient.request(query);
    return result.asset.url;
  });
}
export function useGetAssets() {
  const query = gql`
  query MyQuery {
    assets(first: 200, where:{id_not: "clboio6o716o50bpffqeh6r55"}) {
      url
    }
  }
`;
  return useQuery("get-assets", async () => {
    const result = await graphQLClient.request(query);
    return result.assets;
  });
}

export function useGetPosts() {
    const query = gql`
    query MyQuery {
      postsConnection(first: 100, orderBy: publishedAt_DESC) {
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
        postPics(first:100, orderBy:createdAt_DESC) {
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
          first: 2
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

  export function useGetComments() {
    const query = gql`
    query GetCommentsCopy() {
        commentsCopy(){
          name
          createdAt
          comment
        }
      }
  `;
    return useQuery("get-comments", async () => {
      const result = await graphQLClient.request(query);
      return result.commentsCopy;
    });
  }

  export function useGetGallery() {
    const query = gql`
    query MyQuery {
        galleriesConnection(first: 100, orderBy: publishedAt_DESC) {
          edges {
            cursor
            node {
              slug
              title
              excerpt
              featuredImage {
                url
              }
              postPics(first:100) {
                url
              }
            }
          }
        }
      }
  `;
    return useQuery("get-gallery", async () => {
      const result = await graphQLClient.request(query);
      return result.galleriesConnection.edges;
    });
  }

  export function useGetGalleryDetails(slug) {
    const query = gql`
    query GetGalleryDetails($slug : String!) {
        gallery(where: {slug: $slug}) {
          title
          excerpt
          postPics(first:100) {
            url
          }
          featuredImage {
            url
          }
          slug
        }
      }
  `;
    return useQuery("get-gallery-details", async () => {
      const result = await graphQLClient.request(query, { slug });
      return result.gallery;
    });
  }

  export function useGetOtherGallery(slug) {
    const query = gql`
    query GetGalleryDetails($slug: String!) {
        galleries(
          where: {slug_not: $slug}
        ) {
            title
          excerpt
          featuredImage {
            url
          }
          slug
        }
      }
  `;
    return useQuery("get-other-gallery", async () => {
      const result = await graphQLClient.request(query, { slug });
      return result.galleries;
    });
}
