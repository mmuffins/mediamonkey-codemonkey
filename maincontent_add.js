thisWindow.frameColor = 0xcf6d34;

// Attach progress bar to bottom of window with a slight offset
var progressContainerDiv = document.createElement('div');
progressContainerDiv.setAttribute('data-id','progressContainer');
progressContainerDiv.setAttribute('data-hideInFullWindowMode','');
progressContainerDiv.classList.add("content");
progressContainerDiv.style.position = 'absolute';
progressContainerDiv.style.position = 'fixed';
progressContainerDiv.style.bottom = 0;
progressContainerDiv.style.left = "11%";
progressContainerDiv.style.right = 0;
document.body.appendChild(progressContainerDiv);


//var middlePanel = document.querySelector('[data-id="viewControl_MiddlePanel"]');
// var middlePanel = qid('viewControl_MiddlePanel');
var middlePanel = qid('mainview');
middlePanel.body.appendChild(progressContainerDiv);
