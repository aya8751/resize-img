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
  href: any;
  download: any;

constructor(private sanitizer:DomSanitizer){}

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
    console.log(this.viewImgUrl,"nn");
    // console.log(e.target.files[0]);
  }

  // once image loaded
  imgLoad(image : any){
    this.image = image;
    this.ImgWidth = image.naturalWidth;
    this.ImgHeight = image.naturalHeight;
    this.imageRatio = image.naturalWidth / image.naturalHeight;
    console.log(this.imageRatio);
  }
  gettingHeight(ratioInput: any, Width: any){
    this.ImgWidth = Width;
    this.ImgHeight = Math.floor(ratioInput.checked ? Width / this.imageRatio :  this.ImgHeight);
  }
  gettingWidth(ratioInput: any, Height: any){
    this.ImgHeight = Height;
    this.ImgWidth = Math.floor(ratioInput.checked ? Height * this.imageRatio :  this.ImgWidth);
  }

  resizeAndDownload(myCanvas: any, qualityInput: any){
    const ctx = myCanvas.getContext("2d");
    const imgQuality = qualityInput.checked ? 0.7 : 1.0 ;
    myCanvas.width = this.ImgWidth;
    myCanvas.height = this.ImgHeight;
    ctx.drawImage(this.image, 0, 0, myCanvas.width, myCanvas.height);
    const a: any = document.createElement("a");
    a.href = myCanvas.toDataURL("image/jpeg", imgQuality)
    a.download = new Date().getTime();
    a.click()
    // console.log(this.href, this.download);
  }
}
