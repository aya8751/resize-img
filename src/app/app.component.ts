import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resize-image';
  imageloded : boolean = false;
  viewImgUrl : any ;
  image: any;
  ImgWidth: any;
  ImgHeight: any;
  imageRatio: any;

constructor(private sanitizer:DomSanitizer){}
  // click in loaded box === click in file input
  uploadImg(fileInput :any){
    fileInput.click();
    console.log("fileInput");
  }

  onLoading(e:any){
    // access files that selected by user
    console.log();
    const file = e.target.files[0]; //getting first user selected file
    if(!file) return; //if user doesn't select any file
    this.imageloded = true;
    // get selected file url to image
    this.viewImgUrl = this.sanitizer.bypassSecurityTrustUrl( URL.createObjectURL(file)); //to avoid adding prefix “unsafe” to a link
  }

  // once image loaded
  imgLoad(image : any){
    this.image = image;
    this.ImgWidth = image.naturalWidth;
    this.ImgHeight = image.naturalHeight;
    this.imageRatio = image.naturalWidth / image.naturalHeight;
    console.log(this.imageRatio);
  }
  gettingHeight(ratioInput: any){
    // this.ImgWidth = Width;
    this.ImgHeight = Math.floor(ratioInput.checked ? this.ImgWidth / this.imageRatio :  this.ImgHeight);
  }
  gettingWidth(ratioInput: any){
    // this.ImgHeight = Height;
    this.ImgWidth = Math.floor(ratioInput.checked ? this.ImgHeight * this.imageRatio :  this.ImgWidth);
  }

  resizeAndDownload(myCanvas: any, qualityInput: any){
    // creat canvas from image
    const ctx = myCanvas.getContext("2d");
    // if qulity checkbox is checked pass .7 to imgQuality else pass 1.0
    const imgQuality = qualityInput.checked ? 0.7 : 1.0 ;
    // set width and height accroding inputs
    myCanvas.width = this.ImgWidth;
    myCanvas.height = this.ImgHeight;
    // drawing canvas
    ctx.drawImage(this.image, 0, 0, myCanvas.width, myCanvas.height);
    // creat a to download this.image
    const a: any = document.createElement("a");
    // passing canvas data url as href value to a
    a.href = myCanvas.toDataURL("image/jpeg", imgQuality)
    a.download = new Date().getTime();
    a.click();
  }
}
