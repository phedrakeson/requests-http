import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public files: Set<File>;
  private subscriptions = [];

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.files = new Set();
    for(let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

    console.log(selectedFiles.item)
  }

  onUpload() {
    if(this.files && this.files.size > 0) {
      const sub = this.service.upload(this.files, 'http://localhost:8000/upload').subscribe(
        res => console.log('upload concluido', res)
      )
      this.subscriptions.push(sub) 
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
