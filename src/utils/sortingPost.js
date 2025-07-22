import LikesModel from "../resources/likes/likes.model.js";
import PostModel from "../resources/posts/posts.model.js";

export default class Sorting {
  // user engagement implemented on likes ; can be implemented on comment as well.
  static userEngagementBasis(all_post){
    let all_likes = LikesModel.getAllLikes();

    const likeCounts = {};
    all_likes.forEach(({ postId }) => {
      likeCounts[postId] = (likeCounts[postId] || 0) + 1;
    });

    // Step 2: Merge like counts into each post
    const mergedPosts = all_post.map(post => ({
      ...post,
      likes: likeCounts[post.id] || 0 // default to 0 likes if none found
    }));

    // Step 3: Sort posts by like count descending
    const sortedByLikes = mergedPosts.sort((a, b) => b.likes - a.likes);
    return sortedByLikes;

  }
  
  static dateBasis(all_posts){
    return all_posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}