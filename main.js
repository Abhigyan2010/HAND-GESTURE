Webcam.set({
    height:360,
    width:360,
    img_format:'png',
    png_quality:100
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML='<img id="image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version is"+ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ibSBNPs89/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model Loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=hand_gesture;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}
function Identify_image(){
    img=document.getElementById('image');
    classifier.classify(img, gotResult)
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("result_name").innerHTML=results[0].label;
        hand_gesture=results[0].label;
        speak();
        if(results[0].label=="All the best"){
            document.getElementById("result").innerHTML="&#128077;";
        }else if(results[0].label=="Nice"){
            document.getElementById("result").innerHTML="&#128076;";
        }else if(results[0].label=="Victory"){
            document.getElementById("result").innerHTML="&#9996;";
    }
  }
}