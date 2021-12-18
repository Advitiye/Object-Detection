objects = []
status = ""

function preload() {
    video = createVideo("video.mp4")
}

function setup() {
    canvas = createCanvas(480,380)
    canvas.center()
    video.hide()
}

function start() {
    model = ml5.objectDetector("cocossd",modelLoaded())
    document.getElementById("status").innerHTML = "Objects are being detected"
}

function modelLoaded() {
    console.log("Model has now been loaded")
    status = true
    video.loop()
    video.volume(0)
    video.speed(1)
}

function draw() {
        image(video,0,0,480,380)
        if(status != "") {
            model.detect(video,gotResults)
        for(i=0 ; i<objects.length ; i++) {
            document.getElementById("status").innerHTML = "Objects have been detected"
            document.getElementById("objects_detected").innerHTML = "The number of objects detected are : " + objects.length;
            percent = floor(objects[i].confidence * 100)

            noFill()
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15)
            stroke("#f57542")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }   
    }
}

function gotResults(error,results) {
    if(error) {
        console.log(error)
    }
        console.log(results)
        objects = results
}