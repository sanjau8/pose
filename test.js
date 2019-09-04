const similarity = require('compute-cosine-similarity');
poseVector1=[1,2,3,4,5,6];
poseVector2=[1,2,3,4,5,6];
// Cosine similarity as a distance function. The lower the number, the closer // the match
// poseVector1 and poseVector2 are a L2 normalized 34-float vectors (17 keypoints each  
// with an x and y. 17 * 2 = 32)
function cosineDistanceMatching(poseVector1, poseVector2) {
  let cosineSimilarity = similarity(poseVector1, poseVector2);
  let distance = 2 * (1 - cosineSimilarity);
  return Math.sqrt(distance);
}

console.log(cosineDistanceMatching(poseVector1, poseVector2));