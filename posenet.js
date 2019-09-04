let video;
let poseNet;
let poses = [];
let chk=0;
function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('videoContainer');

  // Video capture
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    if(chk==0){
    poses = results;
    
    }
    
    setTimeout(function(){ if(chk==0){console.log(actpose.keypoints);
      console.log(poses[0].pose.keypoints);

    var vect1=new Array();
    var vect2=new Array();
      var no_of_keypoint=17;
    for(var i=0;i<no_of_keypoint;i++){
      vect1.push(poses[0].pose.keypoints[i].position.x);
      vect1.push(poses[0].pose.keypoints[i].position.y);
      
      vect2.push(actpose.keypoints[i].position.x);
      vect2.push(actpose.keypoints[i].position.y);

    }

    
    console.log(vect1);
    console.log(vect2);
    var match=window['func'](vect1,vect2);
    console.log(match);   
    
    }  chk++;}, 5000);
    
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

function modelReady(){
  select('#status').html('model Loaded')
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}