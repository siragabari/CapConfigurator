"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false
};
const selectedList = document.getElementById("selectedList");

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"

  // If feature is (now) turned on:
  // - mark target as chosen (add class "chosen")
  // - un-hide the feature-layer(s) in the #product-preview;
  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen
  // - hide the feature-layer(s) in the #product-preview
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM
  
  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // TODO: More code
    features[feature] = false;
    document.getElementById("cap_"+feature).classList.add("hide");
    animationOut(feature);
    setTimeout(function() {
      selectedList.removeChild(document.getElementById("selected_"+feature));
    }, 1000);
    
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    
    // TODO: More code
    features[feature] = true;
    document.getElementById("cap_"+feature).classList.remove("hide");
    const element = createFeatureElement(feature);
    element.id = "selected_"+feature;
    selectedList.appendChild(element);
    animationIn(feature);
  }
}

function animationIn(feature) {
  const firstFrame = document.getElementById("feature_"+feature).getBoundingClientRect();
  const lastFrame = document.getElementById("selected_"+feature).getBoundingClientRect();
  const deltaX = firstFrame.left - lastFrame.left;
  const deltaY = firstFrame.top - lastFrame.top;
  const deltaWidth = firstFrame.width / lastFrame.width;
  const deltaHeight = firstFrame.height / lastFrame.height;
  document.getElementById("selected_"+feature).animate(
    [
      {transformOrigin: "top left",
        transform: `translate(${deltaX}px, ${deltaY}px)
        scale(${deltaWidth}, ${deltaHeight})`
      },
      {transformOrigin: "top left",
        transform: 'none'
      }
    ],
    {duration:1000, easing: "ease-in", fill:"forwards"}
  );
}

function animationOut(feature) {
  const firstFrame = document.getElementById("selected_"+feature).getBoundingClientRect();
  const lastFrame = document.getElementById("feature_"+feature).getBoundingClientRect();
  const deltaX = lastFrame.left - firstFrame.left;
  const deltaY = lastFrame.top - firstFrame.top;
  const deltaWidth = lastFrame.width / firstFrame.width;
  const deltaHeight =  lastFrame.height  / firstFrame.height;
  document.getElementById("selected_"+feature).animate(
    [
      {transformOrigin: "top left",
        transform: 'none'
      },
      {transformOrigin: "top left",
        transform: `translate(${deltaX}px, ${deltaY}px)
        scale(${deltaWidth}, ${deltaHeight})`
      }
    ],
    {duration:1000, easing: "ease-out", fill:"forwards"}
  );
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}



